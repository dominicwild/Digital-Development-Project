import React, { Component } from "react";
import "../css/Navbar.css";
const user = require("../User");

const LoggedIn = () => {
    if (user != null) {
        return <span>
          Logged in as:{" "}
          <b>
            {user.firstName} {user.lastName}
          </b>
        </span>;
    } else {
        return ""
    }
}

export default class NavBar extends Component {
  
  
    render() {

    return (
      <>
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            Navbar
          </a>
          <LoggedIn />
        </nav>
      </>
    );
  }
}



