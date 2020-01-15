import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <>
        <button className="btn btn-primary btn-block" onClick={() => {window.location = "http://localhost:3001/api/auth/outlook"}}>Login with Outlook</button>
      </>
    );
  }
}

export default Login;
