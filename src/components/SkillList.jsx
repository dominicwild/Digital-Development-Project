import React, { Component } from "react";
import SVG from "react-inlinesvg";
const user = require("../User");

export default class SkillList extends Component {
  constructor(props) {
    super(props);
    const field = props.field;
    let listItems

    fetch("/api/ddr/" + props.field + "/" + user.employeeId)
      .then(response => {
        if (!response.ok) {
          console.log(response.status + " " + response.statusText);
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log(data);
        console.log("/api/ddr/" + props.field + "/" + user.employeeId);
        listItems = data[field];
        this.setState({
            listItems: listItems
        })
      });

    this.state = {
      field: field,
      labelText: props.labelText,
      placeholderText: props.placeholderText,
      listText: props.listText,
      listItems: []
    };

    console.log("ListItems: ", listItems)
  }
  render() {
    return (
      <>
        <div className="form-group d-flex m-3 justify-content-center align-items-center">
          <label htmlFor="lastName">{this.state.labelText}: </label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder={this.state.placeholderText} />
            <div className="input-group-append">
              <button className="btn btn-primary add-btn m-0 p-0" type="button">
                <SVG className="icon" src="/icons/add.svg" />
              </button>
            </div>
          </div>
        </div>
        <div className="m-3 list">
          <label>{this.state.listText}</label>
          <select multiple className="form-control list-selection" size="12" id={this.state.field}>
            {
                this.state.listItems.map(item => {
                    return <option>item</option>
                })
            }
          </select>
        </div>
        <div className="m-3">
            <button className="btn btn-danger">Remove</button>
        </div>
      </>
    );
  }
}
