import React, { Component } from "react";
import "../css/CheckList.css";
import { fieldNameToText } from "../UtilityFunctions";

class CheckList extends Component {
 

  renderTableData = () => {
    const list = this.props.table.list;
    if (Array.isArray(list)) {
      let toRender = [];
      for (let item of list) {
        toRender.push(
          <tr className="table-secondary list-header" key={Math.random()}>
            <th scope="col" colSpan="3">
              <h3 className="m-0">{item.name}</h3>
            </th>
          </tr>
        );
        toRender = this.renderList(item.list, toRender, "table-list-row");
      }
      return toRender;
    } else {
      return this.renderList(list, []);
    }
  };

  renderList = (list, toRender, extraClass) => {
    if (extraClass === undefined) {
      extraClass = "";
    }
    for (let field in list) {
      let className = list[field] === true ? "table-success" : "table-danger";
      toRender.push(
        <tr className={className + " " + extraClass} key={Math.random()}>
          <td scope="row" className="status">
            {list[field] === true ? "✔️" : "❌"}
          </td>
          <td>{fieldNameToText(field)}</td>
        </tr>
      );
    }
    return toRender;
  };

  render() {
    const table = this.props.table;
    const listTable = Array.isArray(table.list) ? "table-list" : "";

    return (
      <table className={`table table-bordered table-primary table-hover table-condensed checklist ${listTable}`}>
        <thead>
          <tr>
            <th scope="col" colSpan="3">
              <h3 className="m-0">{table.name}</h3>
            </th>
          </tr>
        </thead>
        <tbody>{this.renderTableData()}</tbody>
      </table>
    );
  }
}

export default CheckList;
