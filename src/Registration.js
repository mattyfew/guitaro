import React from 'react'
import axios from './axios'
import { Link } from 'react-router-dom'

class Registration extends React.Component {
    constructor() {
        super()

        this.state ={
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            error: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post('/register', this.state)
            .then(() => {
                location.replace('/')
            })
    }

    handleChange(e) {
        this.setState({ [ e.target.name ]: e.target.value })
    }

    render() {
        return (
            <div style={{ border: '1px solid red'}}>
                <h1>Registration!</h1>
                <Link to="/login">Already registered? Login!</Link>

                <form>
                    <input onChange={ this.handleChange } type="text" name="firstname" placeholder="firstname" />
                    <input onChange={ this.handleChange } type="text" name="lastname" placeholder="lastname" />
                    <input onChange={ this.handleChange } type="text" name="email" placeholder="email" />
                    <input onChange={ this.handleChange } type="password" name="password" placeholder="password" />
                    <button onClick={ this.handleSubmit }>Submit</button>
                </form>
            </div>
        )
    }
}

export default Registration
