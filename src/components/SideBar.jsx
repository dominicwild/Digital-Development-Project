import React, { Component } from "react";
import DDRList from "./DDRList"

export default class SideBar extends Component {
  render() {
    return (
      <>
        <button className="btn btn-block btn-primary mb-2">Add new DDR</button>
        <DDRList DDRList={this.props.DDRList}/>
      </>
    );
  }
}
