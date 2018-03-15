const spicedPg = require('spiced-pg')
const bcrypt = require('bcryptjs')
const { dbUser, dbPass } = require('../secrets.json')
const db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/guitaro`)

exports.hashPassword = function(plainTextPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) {
                return reject(err)
            }
            bcrypt.hash(plainTextPassword, salt, (err, hash) => {
                if (err) {
                    return reject(err)
                }
                resolve(hash)
            })
        })
    })
}
exports.checkPassword = function(enteredPasswordFromLoginForm, hashedPasswordFromDatabase) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(enteredPasswordFromLoginForm, hashedPasswordFromDatabase, (err, doesMatch) => {
            if (err) {
                reject(err)
            } else {
                resolve(doesMatch)
            }
        })
    })
}

exports.insertNewUser = function(first, last, email, password) {
    const q = `INSERT INTO users (firstname, lastname, email, hash) VALUES ($1, $2, $3, $4) RETURNING id`
    const params = [ first, last, email, password ]
    return db.query(q, params).then(results => {
        return results.rows[0].id
    }).catch(err => {
        Promise.reject(err)
    })
}

exports.getUserInfo = function(email) {
    const q = `SELECT * FROM users WHERE email = $1`
    const params = [ email ]
    return db.query(q, params).then(results => {
        return results.rows[0]
    }).catch(err => {
        Promise.reject(err)
    })
}

exports.getOtherUserInfo = function(id) {
    const q = `SELECT firstname, lastname, email, id, bio FROM users WHERE id = $1`
    const params = [ id ]
    return db.query(q, params).then(results => {
        return results.rows[0]
    }).catch(err => {
        Promise.reject(err)
    })
}

exports.updateBio = function(bio, userId) {
    const q = 'UPDATE users SET bio = $1 WHERE id = $2'
    const params = [ bio, userId ]

    console.log(params);

    return db.query(q, params)
}
