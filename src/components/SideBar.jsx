import React, { Component } from "react";
import DDRList from "./DDRList";
import SVG from "react-inlinesvg";

const navItems = [
  {
    name: "Basic Details",
    icon: "/icons/person.svg",
    pathName: "profile"
  },
  {
    name: "Skills",
    icon: "/icons/skill.svg",
    pathName: "skills"
  },
  {
    name: "Goals",
    icon: "/icons/goal.svg",
    pathName: "goals"
  }
];

const pathRoot = window.location.pathname.split("/")[1]

export default class SideBar extends Component {
  renderNavItems() {
    return navItems.map(item => {
      const highlighted = item.pathName === pathRoot ? "highlight" : ""
      return (
        <li className={`nav-item ${highlighted}`} key={Math.random()}>
          <a className= "nav-link px-0" >
            <SVG className="mr-2 icon" src={item.icon} />
            <span>{item.name}</span>
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <>
        <ul className="nav flex-column p-2 px-3">
          {this.renderNavItems()}
        </ul>
      </>
    );
  }
}
