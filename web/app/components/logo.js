import React, { Component } from "react";

export default class Logo extends Component {
  render() {
    const { text } = this.props;
    return (
      <div style={{ flex: "1 1 auto", width: "100%", fontSize: "24px" }}>
        {text}
      </div>
    );
  }
}
