import React, { Component } from "react";
import SVG from "react-inlinesvg";
import "../css/Login.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <SVG src="/icons/DXC_Technology_logo.svg" className="brand mb-5" />
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary p-4"
            onClick={() => {
              window.location = "http://localhost:3001/api/auth/outlook";
            }}
          >
            <SVG src="/icons/Outlook-icon.svg" className="outlook mr-3" />
            Login with Outlook
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
