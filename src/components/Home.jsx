import React, { Component } from "react";
import SVG from "react-inlinesvg";
import "../css/Home.css";
import CheckList from "./CheckList";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    fetch("/api/checklist")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(response.status + " " + response.statusText);
        }
      })
      .then(data => {
        this.setState({ checkLists: data });
      });
  }

  renderCheckLists = () => {
    console.log(this.state)
    if (this.state.checkLists) {
      return this.state.checkLists.map(checkList => {
        return <CheckList table={checkList} />
      })
    } else {
      return "a";
    }
  };

  render() {
    return (
      <div className="home">
        {/* <SVG src="/icons/DXC_Technology_logo.svg" className="brand mb-5" /> */}
        {this.renderCheckLists()}
      </div>
    );
  }
}

export default Home;
