import React, { Component } from "react";
import Title from "./Title";
import "../css/Skills.css";
import SkillList from "./SkillList";

export default class Skills extends Component {
  render() {
    return (
      <div className="skills">
        <Title title="Mentoring and Opportunities" />
        <div className="d-flex justify-content-between">
          <div className="strengths ">
            <SkillList field="strengths" labelText="Mentor Topic" placeholderText="Enter a topic you'd like to mentor in" listText="Mentor topics you have:"/>
          </div>
          <div className="opportunities ">
            <SkillList field="opportunities" labelText="Opportunity" placeholderText="Enter an opportunity you'd like to pursue" listText="Opportunities you want to pursue:"/>
          </div>
        </div>
      </div>
    );
  }
}
