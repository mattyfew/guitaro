import React from 'react'
import ProfilePic from './ProfilePic'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newBio: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        }, () => console.log(this.state))
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.setBio(this.state.newBio)
    }

    render() {
        const { firstname, lastname, email, id, bio, profilePicUrl, toggleUploader, setBio } = this.props

        return (
            <div>
                <h1>new Profile</h1>

                <div style={{ border: '1px solid red', padding: 15 }}>
                    <h2>Your profile</h2>
                    <p>First Name: { firstname }</p>
                    <p>Last Name: { lastname }</p>
                    <p>Email: { email }</p>
                    <p>Bio: { bio }</p>

                    <div className="bio-container">
                        <form>
                            <textarea onChange={ this.handleChange } name="newBio" defaultValue={ this.props.bio }></textarea>
                            <button onClick={ this.handleSubmit }>Submit</button>
                        </form>
                    </div>
                </div>

                <ProfilePic
                    toggleUploader={ toggleUploader }
                    firstname={ firstname }
                    lastname={ lastname }
                    email={ email }
                    profilePicUrl={ profilePicUrl }
                />
            </div>
        )
    }
}
