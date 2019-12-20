import React, { Component } from "react";
import logo from "./logo.svg";
import "./css/App.css";
import "./css/Sidebar.css";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Profile from "./components/Profile";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      greeting: "",
      DDRList: this.randDates()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
      .then(response => response.json())
      .then(state => {
        this.setState(state);
      });
  }

  route() {
    let toRender = null;
    switch (window.location.pathname) {
      case "/profile":
        toRender = <Profile />;
        break;

      default:
        window.location.pathname = "/profile";
    }
    return toRender;
  }

  render() {
    console.log(this.props);
    return (
      <>
        <NavBar />
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-2 p-0 sidebar-sticky sidebar">
              <SideBar />
            </div>
            <div className="main-content col-8">{this.route()}</div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
