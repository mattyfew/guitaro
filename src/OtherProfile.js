import React from 'react'
import axios from './axios'

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        axios.get(`/get-user/${this.props.match.params.userId}`)
        .then(res => {
            if (res.data.sameProfile) {
                return this.props.history.push('/');
            }

            this.setState({
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                email: res.data.email,
                bio: res.data.bio
            })
        })
    }

    render() {
        const { firstname, lastname, bio } = this.state
        if(!firstname) {
            return (<div>Loading...</div>)
        }

        return (
            <div>
                <h1>{ `${firstname} ${lastname}` }</h1>
                <p>{ bio }</p>
            </div>
        )
    }
}
