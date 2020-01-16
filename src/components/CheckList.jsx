import React, { Component } from "react";
import "../css/CheckList.css";

class CheckList extends Component {

constructor(props){
  super(props)

  fetch("/api/checklist").then(response => {
    if(response.ok){
      return response.json();
    } else {
      console.error(response.status + " " + response.statusText)
    }
  }).then(data => {
    console.log(data)
  })
}

  render() {
    return (
      <table className="table table-bordered checklist">
        <thead>
          <tr>
            <th scope="col" colSpan="2">
              <h3 className="m-0">Basic Details</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" className="status">
              1
            </td>
            <td>Mark</td>
          </tr>
          <tr>
            <td scope="row" className="status">
              2
            </td>
            <td>Jacob</td>
          </tr>
          <tr>
            <td scope="row" className="status">
              3
            </td>
            <td>Larry the Bird</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default CheckList;
