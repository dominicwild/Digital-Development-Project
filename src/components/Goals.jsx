import React, { Component } from "react";
import Title from "./Title";
import Goal from "./Goal";
import "../css/Goals.css";


export default class Goals extends Component {

constructor(props){
  super(props)

  this.state = {

  }
}


getGoals = () => {
  
}

  render() {
    return (
      <div className="goals">
        <div className="save-all-btn-container">
          <button className="btn btn-outline-success save-all-btn">Save All</button>
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
