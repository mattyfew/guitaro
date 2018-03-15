import React from 'react';
import axios from './axios'
import { Link } from 'react-router-dom'


class Login extends React.Component {
    constructor() {
        super()

        this.state ={
            email: '',
            password: '',
            error: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post('/login', this.state)
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
                <h1>Login!</h1>

                    <form>
                        <input onChange={ this.handleChange } type="text" name="email" placeholder="email" />
                        <input onChange={ this.handleChange } type="password" name="password" placeholder="password" />
                        <button onClick={ this.handleSubmit }>Submit</button>
                    </form>

                <Link to="/">Not registered? Register!</Link>
            </div>
        )
    }
}

export default Login
