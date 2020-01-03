import React, { Component } from "react";

export default class Title extends Component {

  render() {
    return <h2 className="title">{this.props.title}</h2>;
  }
}
