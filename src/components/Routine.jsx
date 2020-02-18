import React, { Component } from "react";
import { randInt } from "../UtilityFunctions";
import { frequency, status } from "../ModelEnums/DDRModelEnums";
import $ from "jquery";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css";
import Alert from "./Alert";
import SVG from "react-inlinesvg";
import { developmentArea, developmentAreaValues } from "../ModelEnums/DDRModelEnums";
require("bootstrap-datepicker");

export default class Routine extends Component {
  areaId = randInt();
  actionId = randInt();
  frequencyId = randInt();
  statusId = randInt();
  dateId = randInt();

  constructor(props) {
    super(props);

    this.state = {
      alert: "",
      routineId: "routine" + randInt()
    };
  }

  componentDidMount() {
    this.initDate();
    this.expand();
  }

  expand() {
    if (this.props.routine.expand) {
      const collapsable = "#" + this.state.routineId;
      $(collapsable).collapse("show");
      $(collapsable).on("shown.bs.collapse", event => {
        document.getElementById(this.state.routineId).scrollIntoView(true);
        $(collapsable).off();
      });
    }
  }

  initDate() {
    let date;
    if (this.props.routine.startDate) {
      date = new Date(this.props.routine.startDate);
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
      routine: {
        _id: this.props.routine._id,
        developmentArea: area,
        action: action,
        frequency: frequency,
        status: status,
        startDate: new Date(date).getTime()
      }
    };

    fetch("api/ddr/routine", {
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
            alert: <Alert type="success" message={`The routine has been saved successfully (${new Date().toTimeString()})`} key={Math.random()} />
          });
        } else {
          this.setState({
            alert: (
              <Alert
                type="danger"
                message={`An error has occured. The routine has not been saved. (${new Date().toTimeString()})`}
                key={Math.random()}
              />
            )
          });
        }
      });
  };

  delete = event => {
    this.props.deleteRoutine(this.props.routine.developmentArea, event);
  };

  onChange = event => {
    let id;
    const routine = this.props.routine;
    if (routine._id) {
      id = routine._id;
    } else {
      id = routine.temp_id;
    }

    this.props.routineUpdate(id, event);
  };

  render() {
    const areaState = this.props.required || false; //!(this.state.area === undefined);
    const routine = this.props.routine;
    const collapseId = this.state.routineId;
    const area = developmentAreaValues.find(item => {
      return item.area === routine.developmentArea;
    });
    console.log(area);
    const description = area == undefined ? "" : area.description;

    return (
      <div className="card mt-3">
        <a data-toggle="collapse" href={"#" + collapseId} className="collapsed">
          <div className="card-header">
            <SVG className="icon arrow-down" src="./icons/arrow-down.svg" />
            <h5>{routine.developmentArea || "New Routine"}</h5>
          </div>
        </a>
        <div className="collapse" id={collapseId}>
          <div className="card-body">
            <p>{description}</p>
            <div>
              <div className="form-group">
                <label htmlFor={this.areaId} className="mr-2">
                  Development Area:
                </label>
                <select
                  type="text"
                  className="form-control"
                  id={this.areaId}
                  placeholder="Enter your development area"
                  value={routine.developmentArea}
                  disabled={areaState}
                  name="developmentArea"
                  onChange={this.onChange}
                >
                  {developmentArea.map(area => {
                    return (
                      <option value={area} key={Math.random()}>
                        {area}
                      </option>
                    );
                  })}
                </select>
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
                  value={routine.action}
                  name="action"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor={this.frequencyId} className="mr-2">
                  Frequency:
                </label>
                <select
                  type="text"
                  className="form-control"
                  id={this.frequencyId}
                  name="frequency"
                  value={routine.frequency}
                  onChange={this.onChange}
                >
                  {frequency.map(item => {
                    return <option key={Math.random()}>{item}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor={this.statusId} className="mr-2">
                  Status:
                </label>
                <select type="text" className="form-control" id={this.statusId} value={routine.status} name="status" onChange={this.onChange}>
                  {status.map(item => {
                    let selected = item === routine.status ? routine.status : "In Progress";
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
