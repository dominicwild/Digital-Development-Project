import React, { Component } from 'react'

export default class DDRListItem extends Component {
    render() {

        console.log(this.props.date)
        let date = this.props.date
        let date2 = new Date()

        var a = "a"
        return (

            <div className="list-group-item">
                <div>
                    DDR
                </div>
                <div>
                    {date.toLocaleString('en-GB',{dateStyle: "short"})}
                </div>
            </div>

        )
    }
}
