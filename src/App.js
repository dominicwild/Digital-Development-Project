import React, { Component } from "react";
import "./css/App.css";
import "./css/Sidebar.css";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Routines from "./components/Routines";
import Home from "./components/Home";
import Login from "./components/Login";
import $ from "jquery";
require("./LocalStorageJSON");
require("./StringPrototypes");

const whoAmIDelay = 1000 * 60 * 30; //30 minutes

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { user: { loggedOn: false } };
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
        if (user && user.loggedOn) {
          this.setState({ user });
        } else if (window.location.pathname !== "/login") {
          window.location = "/login";
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
        toRender = <Profile user={this.state.user} onChange={this.onChange} />;
        break;
      case "/skills":
        toRender = <Skills />;
        break;
      case "/routines":
        toRender = <Routines />;
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
  };

  onChange = event => {
    const target = event.target;
    const user = this.state.user;
    user[target.name] = target.value;
    this.setState(user);
  };

  componentDidMount(){
    $('[data-toggle="tooltip"]').tooltip()
  }

  render() {
    return (
      <>
        <NavBar user={this.state.user} />
        <div className="container-fluid p-0">
          <div className="d-flex">
            <div className="sidebar-sticky sidebar">
              <SideBar user={this.state.user} />
            </div>
            <div className="main-content m-4">{this.route()}</div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
