import React, { Component } from "react";
import "../css/Navbar.css";
import SVG from "react-inlinesvg";
//const user = require("../User");

export default class NavBar extends Component {
  LoggedIn = () => {
    
    if (this.props.user.loggedOn) {
      const user = this.props.user;
      return (
        <>
          <span>
            Logged in as:{" "}
            <b>
              {user.firstName || ""} {user.lastName || ""}
            </b>
          </span>
          <a href="http://localhost:3001/api/auth/logout">Logout</a>
        </>
      );
    } else {
      return <a href="/login">Login</a>;
    }
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            <SVG src="/icons/DXC_Technology_logo.svg" />
          </a>
          <this.LoggedIn />
        </nav>
      </>
    );
  }
}
