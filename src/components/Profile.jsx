import React, { Component } from "react";
import "../css/Profile.css";
import Alert from "./Alert";
import Title from "./Title";
const config = require("../ReactConfig");

const alertClasses = "mt-3";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      ITXLevel: this.props.user.ITXLevel
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
    const aspirationShort = document.getElementById("aspirationShort").value;
    const aspirationLong = document.getElementById("aspirationLong").value;

    const employee = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      employeeId: employeeId,
      assignmentArea: assignmentArea,
      ITXLevel: +ITXLevel,
      aspirationShort: aspirationShort,
      aspirationLong: aspirationLong
    };

    //Insert employee into database
    fetch("/api/employee", {
      method: "PUT",
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
            alert: <Alert message={message} type="danger" key={Math.random()} className={alertClasses} />
          });
          this.render();
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (data.success) {
          localStorage.setItemJSON(config.user, data);

          const date = new Date().toLocaleString();
          const message = `Details saved successfully (${date})`;
          this.setState({
            alert: <Alert message={message} type="success" className={alertClasses} key={Math.random()} />
          });
        }
      });
  };

  handleOnChange = event => {
    this.props.onChange(event);
  };

  render() {
    let user;
    if (this.props.user) {
      user = this.props.user;
    } else {
      user = {
        firstName: "",
        lastName: "",
        email: "",
        employeeId: "",
        assignmentArea: "",
        ITXLevel: null
      };
    }

    return (
      <div className="profile">
        <Title title="Basic Details" />
        <form className="m-4">
          <div className="form-group">
            <label htmlFor="firstName">First Name: </label>
            <input type="text" className="form-control" id="firstName" placeholder="Enter your first name" defaultValue={user.firstName} />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name: </label>
            <input type="text" className="form-control" id="lastName" placeholder="Enter your last name" defaultValue={user.lastName} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Work Email: </label>
            <input type="email" className="form-control" id="email" placeholder="Enter your work email" defaultValue={user.email} />
          </div>

          <div className="form-group">
            <label htmlFor="employeeId">Employee ID: </label>
            <input type="text" className="form-control" id="employeeId" placeholder="Enter your employee ID" defaultValue={user.employeeId} />
          </div>

          <div className="form-group">
            <label htmlFor="assignmentArea">Assignment Area: </label>
            <input
              type="text"
              className="form-control"
              id="assignmentArea"
              placeholder="Enter your assignment area"
              defaultValue={user.assignmentArea}
            />
          </div>

          <div className="form-group align-items-start">
            <label htmlFor="aspirationShort">Short-term Aspiration: </label>
            <textarea
              type="text"
              className="form-control"
              id="aspirationShort"
              placeholder="Enter your short-term aspiration"
              value={user.aspirationShort}
              name="aspirationShort"
              onChange={this.handleOnChange}
            />
          </div>

          <div className="form-group align-items-start">
            <label htmlFor="aspirationLong">Long-term Aspiration: </label>
            <textarea
              type="text"
              className="form-control"
              id="aspirationLong"
              placeholder="Enter your long-term aspiration"
              value={user.aspirationLong}
              name="aspirationLong"
              onChange={this.handleOnChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ITXLevel">ITX Level: </label>
            <select
              className="form-control"
              id="ITXLevel"
              name="ITXLevel"
              placeholder="Enter your ITX Level"
              value={user.ITXLevel}
              onChange={this.handleOnChange}
            >
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
