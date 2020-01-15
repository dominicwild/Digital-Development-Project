import React, { Component } from "react";
import "./css/App.css";
import "./css/Sidebar.css";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Goals from "./components/Goals";
import Home from "./components/Home";
import Login from "./components/Login";
require("./LocalStorageJSON");
require("./StringPrototypes");

const whoAmIDelay = 1000 * 60 * 30; //30 minutes

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.whoami();
  }

  whoami = () => {
    fetch("/api/whoami")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(response.status + " " + response.statusText);
        }
      })
      .then(user => {
        setTimeout(this.whoami, whoAmIDelay);
        if (user) {
          this.setState({ user });
        } else {
          window.location = "/login"
        }
      });
  };

  randDates() {
    let dates = [];
    for (let i = 0; i < 10; i++) {
      dates.push({
        date: new Date(+new Date() - Math.floor(Math.random() * 10000000000))
      });
    }

    return dates;
  }

  route = () => {
    let toRender = null;
    switch (window.location.pathname) {
      case "/profile":
        toRender = <Profile user={this.state.user}/>;
        break;
      case "/skills":
        toRender = <Skills />;
        break;
      case "/goals":
        toRender = <Goals />;
        break;
      case "/":
        toRender = <Home />;
        break;
      case "/login":
        toRender = <Login />;
        break;
      default:
    }
    return toRender;
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="container-fluid p-0">
          <div className="d-flex">
            <div className="sidebar-sticky sidebar">
              <SideBar />
            </div>
            <div className="main-content m-4">{this.route()}</div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
