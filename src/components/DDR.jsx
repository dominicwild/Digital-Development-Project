import React, { Component } from 'react'

export default class DDR extends Component {

    state = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        location: this.props.location,
        employeeId: this.props.employeeId,
        managerName: this.props.managerName,
        managerEmail: this.props.managerEmail,
        businessArea: this.props.businessArea,
        ITXLevel: this.props.ITXLevel,
        date: this.props.date,
        agileExperience: this.props.agileExperience,
        accountName: this.props.accountName,
        aspirationLong: this.props.aspirationLong,
        aspirationShort: this.props.aspirationShort,
        strengths: this.props.strengths,
        developmentOpportunities: this.props.developmentOpportunities,
        training: this.props.training,
        maturityList: this.props.maturityList,
        goals: this.props.goals
    }

    render() {
        return (

            <div className="list-group-item">DDR 1</div>

        )
    }
}
