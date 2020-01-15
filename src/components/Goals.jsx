import React, { Component } from "react";
import Title from "./Title";
import Goal from "./Goal";
import "../css/Goals.css";
import Alert from "./Alert";
const user = require("../User");

const requiredGoals = ["IT Professional", "Current Role", "DXC Employee"];

export default class Goals extends Component {
  constructor(props) {
    super(props);
    const initialGoals = requiredGoals.map(goal => {
      return { developmentArea: goal, required: true };
    });
    this.state = { alert: "", goals: initialGoals };
  }

  getGoals = () => {
    console.log("Goals run");
    fetch("/api/ddr/goals/", { method: "post" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(response.status + " " + response.statusText);
        }
      })
      .then(result => {
        if (result.goals) {
          const goals = this.formatGoals(result.goals);
          this.setState({ goals: goals });
        }
      });
  };

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

    goals = this.ensureId(goals);

    return goals;
  }

  ensureId(goals) {
    for (let goal of goals) {
      if (goal._id === undefined && goal.temp_id === undefined) {
        goal.temp_id = Math.random();
      }
    }
    return goals;
  }

  renderGoals = () => {
    if (this.state.goals) {
      const goals = this.ensureId(this.state.goals);
      return goals.map(goal => {
        return <Goal goal={goal} required={goal.required} goalUpdate={this.goalUpdate} deleteGoal={this.deleteGoal} key={goal._id || goal.temp_id} />;
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

  saveAll = event => {
    fetch("/api/ddr/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ employeeId: user.employeeId, goals: this.state.goals })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response.status + " " + response.statusText);
        }
      })
      .then(data => {
        const date = new Date().toLocaleTimeString();
        if (data.success) {
          this.setState({ alert: <Alert message={`[${date}] All goals successfully updated`} type="success" key={Math.random()} /> });
        } else {
          this.setState({ alert: <Alert message={`[${date}] Goals were not successfully updated`} type="danger" key={Math.random()} /> });
        }
      });
  };

  componentDidMount() {
    this.getGoals();
  }

  addGoal = event => {
    const goals = this.state.goals;
    for (let goal of goals) {
      delete goal.expand;
    }
    goals.push({
      developmentArea: "",
      expand: true
    });
    this.setState({ goals });
  };

  deleteGoal = (area, event) => {
    const goal = this.state.goals.filter(goal => goal.developmentArea === area)[0];
    if (!goal.required) {
      fetch("/api/ddr/goal/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ employeeId: user.employeeId, goal: { developmentArea: goal.developmentArea } })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error(response.status + " " + response.statusText);
          }
        })
        .then(data => {
          const date = new Date().toLocaleTimeString();
          if (data.success) {
            const goals = this.state.goals;
            const index = goals.indexOf(goal);
            goals.splice(index, 1);
            this.setState({
              alert: <Alert message={`[${date}] Goal ${goal.developmentArea} successfully deleted`} type="success" key={Math.random()} />,
              goals: goals
            });
          } else {
            this.setState({
              alert: <Alert message={`[${date}] Goal ${goal.developmentArea} wasn't successfully deleted`} type="danger" key={Math.random()} />
            });
          }
        });
    } else {
      const date = new Date().toLocaleTimeString();
      this.setState({
        alert: <Alert message={`[${date}] Goal ${goal.developmentArea} cannot be deleted as it is a required goal.`} type="danger" key={Math.random()} />
      });
    }
  };

  render() {
    return (
      <>
        <div className="goals">
          <div className="save-all-btn-container">
            <button className="btn btn-outline-success save-all-btn" onClick={this.saveAll}>
              Save All
            </button>
          </div>
          <Title title="Goals" />
          {this.state.alert}
          {this.renderGoals()}
        </div>
        <button className="btn btn-primary mt-3" onClick={this.addGoal}>
          Add Goal
        </button>
      </>
    );
  }
}
