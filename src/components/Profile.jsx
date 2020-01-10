import React, { Component } from "react";
import "../css/Profile.css";
import Alert from "./Alert";
import Title from "./Title";
const config = require("../ReactConfig");


const alertClasses = "mt-3"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: ""
    };
  }

  saveDetails = event => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const employeeId = document.getElementById("employeeId").value;
    const assignmentArea = document.getElementById("assignmentArea").value;
    const ITXLevel = document.getElementById("ITXLevel").value;

    const employee = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      employeeId: employeeId,
      assignmentArea: assignmentArea,
      ITXLevel: ITXLevel
    };

    //Insert employee into database
    fetch("/api/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    })
      .then(response => {
        if (!response.ok) {
          const date = new Date().toTimeString();
          const message = `An error has occured (${date}): [${response.status}] ${response.statusText}`;
          this.setState({
            alert: <Alert message={message} type="danger" key={Math.random()} className={alertClasses}/>
          });
          this.render();
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (data != null) {
          localStorage.setItemJSON(config.user, data);
          console.log(localStorage.getItemJSON(config.user));
          const date = new Date().toLocaleString();
          const message = `Details saved successfully (${date})`;
          this.setState({
            alert: <Alert message={message} type="success" className={alertClasses}/>
          });
        }
      });
  };

  render() {
    return (
      <div className="profile">
        <Title title="Basic Details"/>
        <form className="m-4">
          <div className="form-group">
            <label htmlFor="firstName">First Name: </label>
            <input type="text" className="form-control" id="firstName" placeholder="Enter your first name" />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name: </label>
            <input type="text" className="form-control" id="lastName" placeholder="Enter your last name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" className="form-control" id="email" placeholder="Enter your work email" />
          </div>

          <div className="form-group">
            <label htmlFor="employeeId">Employee ID: </label>
            <input type="text" className="form-control" id="employeeId" placeholder="Enter your employee ID" />
          </div>

          <div className="form-group">
            <label htmlFor="assignmentArea">Assignment Area: </label>
            <input type="text" className="form-control" id="assignmentArea" placeholder="Enter your assignment area" />
          </div>

          <div className="form-group">
            <label htmlFor="ITXLevel">ITX Level: </label>
            <select className="form-control" id="ITXLevel" placeholder="Enter your employee ID">
              <option value="1">I</option>
              <option value="2">T</option>
              <option value="3">X</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={this.saveDetails}>
            Save
          </button>

          {this.state.alert}
        </form>
      </div>
    );
  }
}
