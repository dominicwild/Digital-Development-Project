import React, { Component } from "react";
import Title from "./Title";
import Goal from "./Goal";
import "../css/Goals.css";
const user = require("../User");

const requiredGoals = ["IT Professional", "Current Role", "DXC Employee"];

export default class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async getGoals() {
    fetch("/api/ddr/goals/" + user.employeeId)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(response.status + " " + response.statusText);
        }
      })
      .then(result => {
        const goals = this.formatGoals(result.goals);
        this.setState({ goals: goals });
      });
  }

  formatGoals(goals) {
    for (let area of requiredGoals) {
      //If the goal isn't found
      if (goals.find(goal => goal.developmentArea === area) === undefined) {
        goals.push({ developmentArea: area, required: true }); //Then add it
      } else {
        //Adds required boolean to required fields
        const index = goals.findIndex(goal => goal.developmentArea === area);
        goals[index].required = true;
      }
    }
    return goals;
  }

  renderGoal = () => {
    if (this.state.goals) {
      return this.state.goals.map(goal => {
        return <Goal goal={goal} required={goal.required} goalUpdate={this.goalUpdate}/>;
      });
    } else {
      return "";
    }
  };

  goalUpdate = (area, event) => {
    const index = this.state.goals.findIndex(goal => goal.developmentArea === area);
    const goals = this.state.goals;
    const target = event.target;
    goals[index][target.name] = target.value;
    this.setState({
      goals: goals
    });
  };

  componentDidMount() {
    this.getGoals();
  }

  render() {
    return (
      <div className="goals">
        <div className="save-all-btn-container">
          <button className="btn btn-outline-success save-all-btn">Save All</button>
        </div>
        <Title title="Goals" />
        {this.renderGoal()}
      </div>
    );
  }
}
