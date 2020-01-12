import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.message,
      type: "alert-" + props.type
    };
  }

  dismiss(event) {
    const element = document.getElementById("alertDismiss");
    element.style.opacity = 0;
    setTimeout(() => (element.style.display = "none"), 500);
  }

  render() {
    if (this.type === "alert-") {
      return "";
    }
    return (
      <div className={`alert ${this.state.type} ${this.props.className} alert-dismissible fade show`} role="alert" id="alertDismiss">
        {this.state.message}
        <button type="button" className="close" aria-label="Close" onClick={this.dismiss}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default Alert;
