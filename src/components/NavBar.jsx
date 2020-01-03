import React, { Component } from 'react'
import "../css/Navbar.css"
const user = require("../User")

export default class NavBar extends Component {
    render() {
        return (
            <>
            <nav className="navbar navbar-dark bg-primary">
                <a className="navbar-brand" href="#">Navbar</a>
                <span>Logged in as: <b>{user.firstName} {user.lastName}</b></span>
            </nav>
            </>
        )
    }
}
