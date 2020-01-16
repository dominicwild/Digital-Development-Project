import React, { Component } from "react";
import SVG from "react-inlinesvg";
import "../css/Home.css";
import CheckList from "./CheckList";

class Home extends Component {
  constructor(props) {
    super(props);

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

  // renderCheckLists = () => {
  //   if (this.state.checkLists) {
  //     this.state.checkLists.map(checkList => {

  //     })
  //   } else {
  //     return "";
  //   }
  // };

  render() {
    return (
      <div className="home">
        {/* <SVG src="/icons/DXC_Technology_logo.svg" className="brand mb-5" /> */}
        <CheckList />
      </div>
    );
  }
}

export default Home;
