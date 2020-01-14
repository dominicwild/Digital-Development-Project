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
require("./LocalStorageJSON");
require("./StringPrototypes");

class App extends Component {

  constructor(props){
    super(props);

    
  }


  randDates() {
    let dates = [];
    for (let i = 0; i < 10; i++) {
      dates.push({
        date: new Date(+new Date() - Math.floor(Math.random() * 10000000000))
      });
    }

    return dates;
  }

  route() {
    let toRender = null;
    switch (window.location.pathname) {
      case "/profile":
        toRender = <Profile />;
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
