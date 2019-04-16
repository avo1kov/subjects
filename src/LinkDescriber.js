import React, { Component } from 'react';
import './LinkDescriber.css';

class LinkDescriber extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className={"link-describer"}
                style={{
                    left: `${this.props.mouseX}px`,
                    top: `${this.props.mouseY + 50}px`,
                }}
            >
                {this.props.linkValue}
            </div>
        );
    }
}

export default LinkDescriber;