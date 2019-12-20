import React, { Component } from "react";
import DDRList from "./DDRList"

export default class SideBar extends Component {
  render() {
    return (
      <>
        <ul className="nav flex-column p-2">
          <li className="nav-item">
            <a className="nav-link">Basic Details</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Skills</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Development Plan</a>
          </li>
        </ul>
      </>
    );
  }
}
