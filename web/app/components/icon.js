import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import palette from 'shared/palette';

export default class Icon extends Component {
  render() {
    const {
      tooltip,
      style,
      children,
      onClick,
      primary,
      secondary,
      to,
      href,
      target,
      icon,
      className,
      disabled,
      fa,
      ...props
    } = this.props;
    let newStyle = {
      color:palette.LightBlue1,
      padding:'0px',
      width:'unset',
      height:'unset',
      fontSize:'inherit',
      lineHeight:'inherit'
    };
    if (!disabled && (onClick || to || href)) {
      newStyle.cursor = 'pointer';
    } else {
      newStyle.cursor = 'default';
    }
    if (primary) {
      newStyle.color = palette.Submit;
    }
    if (secondary) {
      newStyle.color = palette.Cancel;
    }
    if (disabled && !(style || {}).color) {
      newStyle.color = palette.Disabled;
    }
    Object.assign(newStyle, style);
    let iconClassName = '';
    if (icon) {
      if (fa) {
        iconClassName = `fa fa-${icon}`;
      } else {
        iconClassName = `mdi mdi-${icon}`;
      }
    }
    if (className) {
      iconClassName += ' ' + className;
    }
    let button = (
      <div {...props} onClick={onClick} style={newStyle} className="hoverDiv">
        <i className={iconClassName} />
      </div>
    );
    if (to && !disabled) {
      return (
        <Link to={to} style={{ display: 'flex', alignItems: 'center' }}>
          {button}
        </Link>
      );
    } else if (href && !disabled) {
      return (
        <a href={href} target={target || '_blank'}>
          {button}
        </a>
      );
    } else {
      return button;
    }
  }
}