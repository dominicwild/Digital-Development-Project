import React, { Component } from "react";
import { randInt } from "../UtilityFunctions";
import { frequency, status } from "../ModelEnums/DDRModelEnums";
import $ from "jquery";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css";
import Alert from "./Alert";
import SVG from "react-inlinesvg";
require("bootstrap-datepicker");

//const user = require("../User");
// const emptyGoal = {
//   developmentArea: "",
//   status: "",
//   action: "",
//   startDate: Date.now(),
//   frequency: "Daily"
// };

export default class Goal extends Component {
  areaId = randInt();
  actionId = randInt();
  frequencyId = randInt();
  statusId = randInt();
  dateId = randInt();

  constructor(props) {
    super(props);

    this.state = {
      alert: "",
      goalId: "goal" + randInt()
    };
  }

  componentDidMount() {
    this.initDate();
    this.expand();
  }

  expand() {
    if (this.props.goal.expand) {
      const collapsable = "#" + this.state.goalId;
      $(collapsable).collapse("show");
      $(collapsable).on("shown.bs.collapse", event => {
        document.getElementById(this.state.goalId).scrollIntoView(true);
        $(collapsable).off();
      });
    }
  }

  initDate() {
    let date;
    if (this.props.goal.startDate) {
      date = new Date(this.props.goal.startDate);
    } else {
      date = new Date();
    }

    $(document.getElementById(this.dateId)).datepicker({
      todayBtn: "linked",
      clearBtn: true,
      todayHighlight: true,
      startDate: new Date()
    });

    $(document.getElementById(this.dateId)).datepicker("setDate", date);
  }

  save = event => {
    //Get all input
    const area = document.getElementById(this.areaId).value;
    const action = document.getElementById(this.actionId).value;
    const frequency = document.getElementById(this.frequencyId).value;
    const status = document.getElementById(this.statusId).value;
    const date = document.getElementById(this.dateId).value;

    const requestBody = {
      goal: { developmentArea: area, action: action, frequency: frequency, status: status, startDate: new Date(date).getTime() }
    };

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
        if (data.n === 1) {
          this.setState({
            alert: <Alert type="success" message={`The goal has been saved successfully (${new Date().toTimeString()})`} key={Math.random()} />
          });
        } else {
          this.setState({
            alert: (
              <Alert
                type="danger"
                message={`An error has occured. The goal has not been saved. (${new Date().toTimeString()})`}
                key={Math.random()}
              />
            )
          });
        }
      });
  };

  delete = event => {
    this.props.deleteGoal(this.props.goal.developmentArea, event);
  };

  onChange = event => {
    this.props.goalUpdate(this.props.goal.developmentArea, event);
  };

  render() {
    const areaState = this.props.required || false; //!(this.state.area === undefined);
    const goal = this.props.goal;
    const collapseId = this.state.goalId;

    return (
      <div className="card mt-3">
        <a data-toggle="collapse" href={"#" + collapseId} className="collapsed">
          <div className="card-header">
            <SVG className="icon arrow-down" src="./icons/arrow-down.svg" />
            <h5>{goal.developmentArea || "New Goal"}</h5>
          </div>
        </a>
        <div className="collapse" id={collapseId}>
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
                  defaultValue={goal.developmentArea}
                  disabled={areaState}
                  name="developmentArea"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor={this.actionId} className="mr-2 mb-auto">
                  Action:
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id={this.actionId}
                  placeholder="Enter your actions to develop in this area"
                  value={goal.action}
                  name="action"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor={this.frequencyId} className="mr-2">
                  Frequency:
                </label>
                <select type="text" className="form-control" id={this.frequencyId} name="frequency" value={goal.frequency} onChange={this.onChange}>
                  {frequency.map(item => {
                    return <option key={Math.random()}>{item}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor={this.statusId} className="mr-2">
                  Status:
                </label>
                <select type="text" className="form-control" id={this.statusId} value={goal.status} name="status" onChange={this.onChange}>
                  {status.map(item => {
                    let selected = item === goal.status ? goal.status : "In Progress";
                    return (
                      <option key={Math.random()} defaultValue={selected}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor={this.dateId} className="mr-2">
                  Start Date:
                </label>
                <input type="text" className="form-control" id={this.dateId} onChange={this.onChange} />
              </div>
            </div>

            <div className="button-container">
              <button className="btn btn-success save-btn" onClick={this.save}>
                Save
              </button>

              <button className="btn btn-danger delete-btn mr-3" onClick={this.delete}>
                Delete
              </button>

              {this.state.alert}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
