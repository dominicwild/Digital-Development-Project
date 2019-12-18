import React, { Component } from 'react'

export default class DDRListItem extends Component {
    render() {

        
        let date = this.props.date
        
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
