import React, { Component } from "react";
import Icon from "components/icon";

export default class FatButton extends Component {
  render() {
    const {
      children,
      icon,
      color,
      disabled,
      onClick,
      style,
      ...props
    } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: disabled ? "default" : "pointer",
          padding: "10px 20px"
        }}
        className={disabled ? "" : "hoverDiv"}
        onClick={disabled ? null : onClick}
      >
        <Icon
          icon={icon}
          style={{
            fontSize: "36px",
            cursor: "pointer",
            color: disabled ? "#bbb" : color
          }}
          {...props}
        />
        <div style={{ color: disabled ? "#bbb" : color }}>{children}</div>
      </div>
    );
  }
}
