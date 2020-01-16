import React, { Component } from "react";
import SVG from "react-inlinesvg";
import "../css/Home.css";
import CheckList from "./CheckList";
import Title from "./Title";

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
      return "";
    }
  };

  render() {
    return (
      <div className="home">
        <Title title="Summary" />
        <p>Down below is a check list of details that have or have not been filled in yet.</p>
        {this.renderCheckLists()}
      </div>
    );
  }
}

export default Home;
