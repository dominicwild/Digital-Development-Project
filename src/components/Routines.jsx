import React, { Component } from "react";
import Title from "./Title";
import Routine from "./Routine";
import "../css/Routines.css";
import Alert from "./Alert";
const user = require("../User");

const requiredRoutines = ["IT Professional", "Current Role", "Future Role", "DXC Employee"];

export default class Routines extends Component {
  constructor(props) {
    super(props);
    const initialRoutines = requiredRoutines.map(routine => {
      return { developmentArea: routine, required: true };
    });
    this.state = { alert: "", routines: initialRoutines };
  }

  getRoutines = () => {
    fetch("/api/ddr/routines/", { method: "post" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(response.status + " " + response.statusText);
        }
      })
      .then(result => {
        if (result.routines) {
          const routines = this.formatRoutines(result.routines);
          this.setState({ routines: routines });
        }
      });
  };

  formatRoutines(routines) {
    for (let area of requiredRoutines) {
      //If the routine isn't found
      if (routines.find(routine => routine.developmentArea === area) === undefined) {
        routines.push({ developmentArea: area, required: true }); //Then add it
      } else {
        //Adds required boolean to required fields
        const index = routines.findIndex(routine => routine.developmentArea === area);
        routines[index].required = true;
      }
    }

    routines = this.ensureId(routines);

    return routines;
  }

  ensureId(routines) {
    for (let routine of routines) {
      if (routine._id === undefined && routine.temp_id === undefined) {
        routine.temp_id = Math.random();
      }
    }
    return routines;
  }

  renderRoutines = () => {
    if (this.state.routines) {
      const routines = this.ensureId(this.state.routines);
      return routines.map(routine => {
        return (
          <Routine
            routine={routine}
            required={routine.required}
            routineUpdate={this.routineUpdate}
            deleteRoutine={this.deleteRoutine}
            key={routine._id || routine.temp_id}
          />
        );
      });
    } else {
      return "";
    }
  };

  routineUpdate = (id, event) => {
    let index = this.state.routines.findIndex(routine => routine._id === id)
    if(index == -1){
      index = this.state.routines.findIndex(routine => routine.temp_id === id);
    }
    console.log(index)
    const routines = this.state.routines;
    const target = event.target;
    routines[index][target.name] = target.value;
    this.setState({
      routines: routines
    });
  };

  saveAll = event => {
    fetch("/api/ddr/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ employeeId: user.employeeId, routines: this.state.routines })
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
          this.setState({ alert: <Alert message={`[${date}] All routines successfully updated`} type="success" key={Math.random()} /> });
        } else {
          this.setState({ alert: <Alert message={`[${date}] Routines were not successfully updated`} type="danger" key={Math.random()} /> });
        }
      });
  };

  componentDidMount() {
    this.getRoutines();
  }

  addRoutine = event => {
    const routines = this.state.routines;
    for (let routine of routines) {
      delete routine.expand;
    }
    routines.push({
      developmentArea: "",
      expand: true
    });
    this.setState({ routines });
  };

  deleteRoutine = (area, event) => {
    const routine = this.state.routines.filter(routine => routine.developmentArea === area)[0];
    if (!routine.required) {
      fetch("/api/ddr/routine/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ employeeId: user.employeeId, routine: { developmentArea: routine.developmentArea } })
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
            const routines = this.state.routines;
            const index = routines.indexOf(routine);
            routines.splice(index, 1);
            this.setState({
              alert: <Alert message={`[${date}] Routine ${routine.developmentArea} successfully deleted`} type="success" key={Math.random()} />,
              routines: routines
            });
          } else {
            this.setState({
              alert: <Alert message={`[${date}] Routine ${routine.developmentArea} wasn't successfully deleted`} type="danger" key={Math.random()} />
            });
          }
        });
    } else {
      const date = new Date().toLocaleTimeString();
      this.setState({
        alert: (
          <Alert
            message={`[${date}] Routine ${routine.developmentArea} cannot be deleted as it is a required routine.`}
            type="danger"
            key={Math.random()}
          />
        )
      });
    }
  };

  render() {
    return (
      <>
        <div className="routines">
          <div className="save-all-btn-container">
            <button className="btn btn-outline-success save-all-btn" onClick={this.saveAll}>
              Save All
            </button>
          </div>
          <Title title="Routines" />
          {this.state.alert}
          {this.renderRoutines()}
        </div>
        <button className="btn btn-primary mt-3" onClick={this.addRoutine}>
          Add Routine
        </button>
      </>
    );
  }
}
