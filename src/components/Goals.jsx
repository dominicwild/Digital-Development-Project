import React, { Component } from "react";
import Title from "./Title";
import Goal from "./Goal";
import "../css/Goals.css";

export default class Goals extends Component {
  render() {
    return (
      <div className="goals">
        <div className="save-all-btn-container">
          <button className="btn btn-primary save-all-btn">Save All</button>
        </div>
        <Title title="Goals" />
        <Goal area="IT Professional" />
        <Goal area="Current Role" />
        <Goal area="DXC Employee" />
        <Goal />
      </div>
    );
  }
}
