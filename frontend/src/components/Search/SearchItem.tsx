import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Props {
    text: string;
    onClick?: () => undefined;
    newIcon?: boolean;
}

export default class SearchItem extends Component<Props> {
    uid_key = uuidv4();
    render() {
        return (
            <div
                key={this.uid_key}
                className="p-3 text-gray-800 dark:text-gray-400 hover:bg-blue-300 dark:hover:bg-blue-800"
                onClick={this.props.onClick}
            >
                { this.props.newIcon && (<i className="bi bi-plus-circle-fill text-white align-top mr-2"></i>) }
                {this.props.text}
            </div>
        );
    }
}
