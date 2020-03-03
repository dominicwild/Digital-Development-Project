import React, { Component } from "react";
import SVG from "react-inlinesvg";
import { Link } from "@reach/router";

const navItems = [
  {
    name: "Checklist",
    icon: "/icons/list.svg",
    pathName: "/"
  },
  {
    name: "Basic Details",
    icon: "/icons/person.svg",
    pathName: "profile"
  },
  {
    name: "Opportunities",
    icon: "/icons/skill.svg",
    pathName: "skills"
  },
  {
    name: "Routines",
    icon: "/icons/routine.svg",
    pathName: "routines"
  }
];

let pathRoot = window.location.pathname.split("/")[1]

export default class SideBar extends Component {
  renderNavItems() {
    return navItems.map(item => {
      if(pathRoot === ""){
        pathRoot = "/"
      }
      const highlighted = item.pathName === pathRoot ? "highlight" : ""
      console.log("pathName: ", item.pathName, " pathRoot: ", pathRoot)
      const disabled = this.props.user.loggedOn === false ? "disabled" : ""
      return (
        <li className={`nav-item ${highlighted} ${disabled}`} key={Math.random()}>
          <a className= "nav-link px-0" href={item.pathName}>
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
