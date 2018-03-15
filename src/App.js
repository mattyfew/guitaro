import React from 'react'
import axios from './axios'
import Profile from './Profile'
import ProfilePicUpload from './ProfilePicUpload'
import OtherProfile from './OtherProfile'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            bio: '',
            profilePicUrl: 'http://via.placeholder.com/350x150',
            showUploader: false
        }

        this.toggleUploader = this.toggleUploader.bind(this)
        this.setBio = this.setBio.bind(this)
    }

    componentDidMount() {
        axios.get('/get-user')
            .then(res => {
                const { firstname, lastname, email, id, bio } = res.data.userInfo
                this.setState({ id, firstname, lastname, email, bio })
            })
    }

    toggleUploader() {
        console.log("running");
        this.setState({ showUploader: !this.state.showUploader })
    }

    setBio(newBio) {
        axios.post('/update-bio', { bio: newBio })
        .then(res => {
            this.setState({ bio: newBio })
        })
    }

    render() {
        const { id, firstname, lastname, email, profilePicUrl, bio, showUploader } = this.state

        return (
            <div>
                <h1>Guitaro</h1>

                <BrowserRouter>
                    <div>
                        <Link to="/" >Profile</Link> <br/>
                        <Link to="/user/2" >Other Profile</Link>
                        <div>
                            <Route exact
                                path="/"
                                render={() =>
                                    <Profile
                                        firstname={ firstname }
                                        lastname={ lastname }
                                        profilePicUrl={ profilePicUrl }
                                        email={ email }
                                        bio={ bio }
                                        setBio={ this.setBio }
                                        toggleUploader={ this.toggleUploader }
                                    />
                                }
                            />
                        <Route exact path="/user/:userId" component={ OtherProfile } />
                        </div>
                    </div>
                </BrowserRouter>

                { showUploader && <ProfilePicUpload /> }
            </div>
        )
    }
}
