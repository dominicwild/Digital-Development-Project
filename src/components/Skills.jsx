import React, { Component } from "react";
import Title from "./Title";
import "../css/Skills.css";
import SkillList from "./SkillList";

export default class Skills extends Component {
  render() {
    return (
      <div className="skills">
        <Title title="Mentoring and Opportunities" />
        <p>For the Mentoring list, choose competencies which you have confidence in and are willing to mentor others on.</p>
 
        <p>For the Opportunities list, choose competencies which you currently aim to develop in.</p>

        <p>For both lists, you can choose any kind of competency: e.g. a technology, a methodology, a professional skill</p>

        <p>Examples: Agile Development, Ansible, CI/CD, Data Analytics, People Management, PowerBI, Presentation Skills,  Python, Scrum Master, SQL</p>
        <div className="d-flex justify-content-between">
          <div className="strengths ">
            <SkillList field="strengths" labelText="Mentor Topic" placeholderText="Enter a skill or technology you would like to mentor others in" listText="Topics you want to mentor in:"/>
          </div>
          <div className="opportunities ">
            <SkillList field="opportunities" labelText="Opportunity" placeholderText="Enter a skill or technology you currently need to develop in" listText="Opportunities you want to pursue:"/>
          </div>
        </div>
      </div>
    );
  }
}
