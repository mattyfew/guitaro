import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'

function Welcome() {
    return (
        <div style={{ border: '1px solid blue', padding: 20 }}>
            <h1>Welcome!</h1>

            <HashRouter>
                <div>
                    <Route exact path="/" component={ Registration } />
                    <Route path="/login" component={ Login } />
                </div>
            </HashRouter>
        </div>
    )
}

export default Welcome
