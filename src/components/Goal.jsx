import React, { Component } from "react";
import { randInt } from "../UtilityFunctions";
import { frequency, status } from "../ModelEnums/DDRModelEnums";
import $ from "jquery";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css";
import Alert from "./Alert";
require("bootstrap-datepicker");

const user = require("../User");

export default class Goal extends Component {
  areaId = randInt();
  actionId = randInt();
  frequencyId = randInt();
  statusId = randInt();
  dateId = randInt();

  constructor(props) {
    super(props);

    this.state = {
      area: props.area,
      alert: ""
    };
  }

  componentDidMount() {
    var date = new Date();
    date.setDate(date.getDate() - 1);

    $(document.getElementById(this.dateId)).datepicker({
      todayBtn: "linked",
      clearBtn: true,
      todayHighlight: true,
      startDate: date
    });
  }

  save = event => {
    //Get all input
    const area = document.getElementById(this.areaId).value;
    const action = document.getElementById(this.actionId).value;
    const frequency = document.getElementById(this.frequencyId).value;
    const status = document.getElementById(this.statusId).value;
    const date = document.getElementById(this.dateId).value;

    const requestBody = {
      employeeId: user.employeeId,
      goal: { developmentArea: area, action: action, frequency: frequency, status: status, startDate: new Date(date).getTime() }
    };

    console.log(requestBody);

    fetch("api/ddr/goal", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(response.status + " " + response.statusText);
        }
      })
      .then(data => {
        console.log(data);
        if (data.n === 1) {
          this.setState({ alert: <Alert type="success" message={`The goal has been saved successfully (${new Date().toTimeString()})`} key={Math.random()}/> });
        } else {
          this.setState({
            alert: <Alert type="danger" message={`An error has occured. The goal has not been saved. (${new Date().toTimeString()})`} key={Math.random()}/>
          });
        }
      });
  };

  render() {
    const areaState = !(this.state.area === undefined);
    let areaText;
    if (areaState) {
      areaText = this.state.area;
    } else {
      areaText = "Personal Goal";
    }

    return (
      <div className="card mt-3">
        <div className="card-header">
          <h5>{areaText}</h5>
        </div>
        <div className="card-body">
          <div>
            <div className="form-group">
              <label htmlFor={this.areaId} className="mr-2">
                Development Area:
              </label>
              <input
                type="text"
                className="form-control"
                id={this.areaId}
                placeholder="Enter your development area"
                value={this.state.area}
                disabled={areaState}
              />
            </div>
            <div className="form-group">
              <label htmlFor={this.actionId} className="mr-2 mb-auto">
                Action:
              </label>
              <textarea type="text" className="form-control" id={this.actionId} placeholder="Enter your actions to develop in this area" />
            </div>
            <div className="form-group">
              <label htmlFor={this.frequencyId} className="mr-2">
                Frequency:
              </label>
              <select type="text" className="form-control" id={this.frequencyId}>
                {frequency.map(item => {
                  return <option key={Math.random()}>{item}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={this.statusId} className="mr-2">
                Status:
              </label>
              <select type="text" className="form-control" id={this.statusId}>
                {status.map(item => {
                  return <option key={Math.random()}>{item}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={this.dateId} className="mr-2">
                Start Date:
              </label>
              <input type="text" className="form-control" id={this.dateId} />
            </div>
          </div>

          <div className="save-container">
            <div className="save-btn-container mr-2">
              <button className="btn btn-success save-btn" onClick={this.save}>
                Save
              </button>
            </div>
            {this.state.alert}
          </div>
        </div>
      </div>
    );
  }
}
