import React, { Component } from "react";
import "../css/Profile.css";
const config = require("../ReactConfig");

export default class Profile extends Component {
  saveDetails(event) {
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

    localStorage.setItemJSON(config.user,employee)
    console.log(localStorage.getItemJSON(config.user));
  }

  render() {
    return (
      <div className="profile">
        <h2 className="title">Basic Details</h2>
        <form className="m-4">
          <div className="form-group">
            <label for="firstName">First Name: </label>
            <input type="text" className="form-control" id="firstName" placeholder="Enter your first name" />
          </div>

          <div className="form-group">
            <label for="lastName">Last Name: </label>
            <input type="text" className="form-control" id="lastName" placeholder="Enter your last name" />
          </div>

          <div className="form-group">
            <label for="email">Email: </label>
            <input type="email" className="form-control" id="email" placeholder="Enter your work email" />
          </div>

          <div className="form-group">
            <label for="employeeId">Employee ID: </label>
            <input type="text" className="form-control" id="employeeId" placeholder="Enter your employee ID" />
          </div>

          <div className="form-group">
            <label for="assignmentArea">Assignment Area: </label>
            <input type="text" className="form-control" id="assignmentArea" placeholder="Enter your assignment area" />
          </div>

          <div className="form-group">
            <label for="ITXLevel">ITX Level: </label>
            <select className="form-control" id="ITXLevel" placeholder="Enter your employee ID">
              <option selected value="1">
                I
              </option>
              <option value="2">T</option>
              <option value="3">X</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={this.saveDetails}>
            Save
          </button>
        </form>
      </div>
    );
  }
}
