import React, { Component } from "react";
import SVG from "react-inlinesvg";
//const user = require("../User");

export default class SkillList extends Component {
  constructor(props) {
    super(props);
    const field = props.field;

    this.setListItems();

    this.state = {
      field: field,
      labelText: props.labelText,
      placeholderText: props.placeholderText,
      listText: props.listText,
      listItems: []
    };
  }

  setListItems = () => {
    return fetch("/api/ddr/" + this.props.field + "/", { method: "post" })
      .then(response => {
        if (!response.ok) {
          console.log(response.status + " " + response.statusText);
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (data) {
          this.setState({ listItems: data[this.state.field] });
        }
      });
  };

  validateItem = (toAdd) => {
    console.log(toAdd.length)
    return this.state.listItems.find(item => item.toLowerCase() === toAdd.toLowerCase()) || toAdd.length === 0;
  }

  addItem = event => {
    const toAdd = document.getElementById(this.state.field).value.trim();
    if (this.validateItem(toAdd)) {
      console.log("Duplicated item attempted to be added");
    } else {
      let listItems = this.state.listItems;
      listItems.push(toAdd);

      let requestBody = {
        newSkill: toAdd
      };
      requestBody[this.state.field] = listItems;

      //Request to add item to the list in the database
      fetch("/api/ddr/skills", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (!response.ok) {
            return console.error(response.status + " " + response.statusText);
          } else {
            return response.json();
          }
        })
        .then(data => {
          console.log(data);
          if (data.success) {
            this.setState(listItems);
            document.getElementById(this.state.field).value = "";
          }
        });
    }
  };

  deleteItem = event => {
    const options = document.getElementById(this.state.field + "list").selectedOptions;
    let listItems = this.state.listItems;

    console.log(options);
    console.log(options[1]);
    for (let option of options) {
      const index = listItems.indexOf(option.value);
      listItems.splice(index, 1);
    }

    let requestBody = {};

    requestBody[this.state.field] = listItems;

    fetch("/api/ddr", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(response.status + " " + response.statusText);
        }
      })
      .then(data => {
        console.log(data);
        if (data.success) {
          this.setState({
            listItems: listItems
          });
        }
      });

    console.log(options);
  };

  addItemKeyPress = event => {
    if (event.key === "Enter") {
      this.addItem(event);
    }
  };

  render() {
    return (
      <>
        <div className="form-group d-flex m-3 justify-content-center align-items-center">
          <label htmlFor="lastName">{this.state.labelText}: </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={this.state.placeholderText}
              id={this.state.field}
              onKeyPress={this.addItemKeyPress}
            />
            <div className="input-group-append">
              <button className="btn btn-primary add-btn m-0 p-0" type="button" onClick={this.addItem}>
                <SVG className="icon" src="/icons/add.svg" />
              </button>
            </div>
          </div>
        </div>
        <div className="m-3 list">
          <label>{this.state.listText}</label>
          <select multiple className="form-control list-selection" size="12" id={this.state.field + "list"}>
            {this.state.listItems.map(item => {
              return <option key={Math.random()}>{item}</option>;
            })}
          </select>
        </div>
        <div className="m-3">
          <button className="btn btn-danger" onClick={this.deleteItem}>
            Remove
          </button>
        </div>
      </>
    );
  }
}
