import React, { Component } from "react";
import SVG from "react-inlinesvg";
import "../css/Home.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <SVG src="/icons/DXC_Technology_logo.svg" className="brand mb-5" />
      </div>
    );
  }
}

export default Home;
