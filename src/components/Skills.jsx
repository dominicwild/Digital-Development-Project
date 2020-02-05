import React, { Component } from "react";
import Title from "./Title";
import "../css/Skills.css";
import SkillList from "./SkillList";
import Guidance from "./Guidance";

export default class Skills extends Component {
  render() {

    const mentorGuidance = <Guidance toolTip="Choose competencies which you have confidence in and are willing to mentor others on."/>
    const opportunityGuidance = <Guidance toolTip="Choose competencies which you currently aim to develop in."/>

    return (
      <div className="skills">
        <Title title="Mentoring and Opportunities" />
        <p>Here you can enter skills and technologies you wish to mentor in or want to develop in.</p>
        <p>You can choose any kind of competency: e.g. a technology, a methodology, a professional skill</p>

        <p>Some examples may be: Agile Development, Ansible, CI/CD, Data Analytics, People Management, PowerBI, Presentation Skills,  Python, Scrum Master, SQL</p>
        <div className="d-flex justify-content-between">
          <div className="strengths ">
            <SkillList field="strengths" labelText="Mentor Topic" guidance={mentorGuidance} placeholderText="Enter a skill or technology you would like to mentor others in" listText="Topics you want to mentor in:"/>
          </div>
          <div className="opportunities ">
            <SkillList field="opportunities" labelText="Opportunity" guidance={opportunityGuidance} placeholderText="Enter a skill or technology you currently need to develop in" listText="Opportunities you want to pursue:"/>
          </div>
        </div>
      </div>
    );
  }
}
