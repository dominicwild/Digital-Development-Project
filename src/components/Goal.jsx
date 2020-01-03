import React, { Component } from "react";
import { randInt } from "../UtilityFunctions";
import { frequency, status } from "../ModelEnums/DDRModelEnums";
import $ from "jquery";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css";
require("bootstrap-datepicker");

const StartDate = ({ value, onClick, dateId }) => <input type="text" className="form-control" id={dateId} value={value} onClick={onClick} />;

export default class Goal extends Component {
  areaId = randInt();
  actionId = randInt();
  frequencyId = randInt();
  statusId = randInt();
  dateId = randInt();

  constructor(props) {
    super(props);

    this.state = {
      area: props.area
    };
  }

  componentDidMount() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    console.log(document.getElementById(this.dateId + ""));
    $(document.getElementById(this.dateId)).datepicker({
      todayBtn: "linked",
      clearBtn: true,
      todayHighlight: true,
      startDate: date
    });
  }

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
              <input type="text" className="form-control" id={this.areaId} placeholder="Enter your development area" value={this.state.area} disabled={areaState} />
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
                  return <option>{item}</option>;
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
          <button className="btn btn-success save-btn">Save</button>
        </div>
      </div>
    );
  }
}
