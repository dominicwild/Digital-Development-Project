import React, { Component } from 'react';
import "../css/DisplayTextInput.css";

class DisplayTextInput extends Component {
    render() {
        return (
            <div className="display-text-input">
                <label><b>{this.props.labelText}</b></label>
                <input type="text" className="form-control" value={this.props.text} disabled />
            </div>
        );
    }
}

export default DisplayTextInput;