import React, { Component } from 'react'
import DDRListItem from './DDRListItem';

export default class DDRList extends Component {

    state = {
        DDRList: this.props.DDRList
    };

    render() {
        console.log(this.state.DDRList)
        let DDRList = this.props.DDRList
        
        return (
            <>
                <div className="list-group">
                    <div className="list-group-item">DDR 1</div>
                    <div className="list-group-item">DDR 2</div>
                    <div className="list-group-item">DDR 3</div>
                    <div className="list-group-item">DDR 4</div>
                    
                    {DDRList.map((DDR) => {
                        return <DDRListItem date={DDR.date}/>
                    })}
                    
                </div>
            </>
        )
    }
}
