import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.message,
      type: "alert-" + props.type
    };
  }
  render() {
    if (this.type === "alert-") {
      return "";
    }
    return (
      <>
        <div className={`alert ${this.state.type} alert-dismissible fade show mt-3`} role="alert" data-milli={Math.random()}>
          {this.state.message} {Math.random()}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </>
    );
  }
}

export default Alert;
