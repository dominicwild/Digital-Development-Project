import React, { Component } from 'react';
import SVG from "react-inlinesvg";
import "../css/Guidance.css"

class Guidance extends Component {
    render() {

        const toolTip = this.props.toolTip === undefined ? "Default Tooltip" : this.props.toolTip
        const placement = this.props.placement === undefined ? "top" : this.props.placement

        console.log(toolTip);

        return (
            <div className="guidance" data-toggle="tooltip" data-placement={placement} title={toolTip}>
                <SVG src="/icons/question.svg" />
            </div>
        );
    }
}

export default Guidance;