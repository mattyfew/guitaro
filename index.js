const express = require('express')
const app = express()
const csurf = require('csurf')
const compression = require('compression')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const db = require('./db/db')

app.use(cookieSession({
    secret: 'i love ice cream'
}))
app.use(express.static('public'))
app.use(compression())
app.use(bodyParser.json());
app.use(csurf());
app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken())
    next()
})

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    )
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`))
}

app.get('/get-user', (req, res) => {
    db.getUserInfo(req.session.user.email)
    .then(userInfo => {
        console.log(userInfo);
        res.json({ userInfo })
    })
    .catch(err => {
        res.json({ err })
    })
})

app.post('/register', (req, res) => {
    const { firstname, lastname, email, password } = req.body
    if ( !firstname || !lastname || !email || !password ) {
        res.json({
            success: false,
            error: "Please complete all fields before submitting."
        })
    } else {
        db.hashPassword(password).then(hash => {
            db.insertNewUser(firstname, lastname, email, hash)
            .then(id => {
                req.session.user = { id, firstname, lastname, email }
                res.json({ success: true })
            })
        })
    }
})

app.post('/login', (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.json({success: false, error: "Please complete all fields."})
    } else {
        db.getUserInfo(email).then(userInfo => {
            db.checkPassword(password, userInfo.hash)
            .then(doesMatch => {
                console.log(doesMatch)
                if (doesMatch) {
                    req.session.user = {
                        id: userInfo.id,
                        firstname: userInfo.firstname,
                        lastname: userInfo.lastname,
                        email: userInfo.email
                    }
                    res.json({ success: true })
                } else {
                    res.json({ success: false, error: "Password did not match."})
                }
            })
            .catch(error => {
                res.json({success: false, error: "Please complete all fields before submitting."})
            })
        })
    }
})

app.get('/welcome', (req, res) => {
    if (req.session.user) {
        return res.redirect('/')
    }
    res.sendFile(__dirname + '/index.html')
})

app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/welcome')
    }
    res.sendFile(__dirname + '/index.html')
})

app.post('/update-bio', (req, res) => {
    db.updateBio(req.body.bio, req.session.user.id)
    .then(() => {
        res.json({ success: true })
    })
    .catch(e => console.log("error in update-bio", e))
})

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.listen(8080, function() {
    console.log("I'm listening.")
})
