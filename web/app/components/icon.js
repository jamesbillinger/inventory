import React, { Component } from 'react';
import IconButton from "material-ui/IconButton";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MaterialTheme from '../materialTheme';
import { Link } from 'react-router-dom';
import omit from 'lodash/omit';

export default class Icon extends Component {
  focus() { }

  render() {
    const {tooltip, style, children, onClick, primary, secondary, to, href, target, iconStyle, className, ...props} = this.props;

    let newIconStyle = {};
    if (style && style.fontSize) {
      newIconStyle.fontSize = style.fontSize;
    }
    if (style && style.color) {
      newIconStyle.color = style.color;
    } else if (primary) {
      newIconStyle.color = getMuiTheme(MaterialTheme).baseTheme.palette.primary1Color;
    } else if (secondary) {
      newIconStyle.color = getMuiTheme(MaterialTheme).baseTheme.palette.accent1Color;
    } else if (!className) {
      newIconStyle.color = '#795548';
    } else {
      newIconStyle.color = undefined;
    }
    if (props.disabled || (!onClick && !to && !href)) {
      newIconStyle.cursor = 'default';
    }
    Object.assign(newIconStyle, iconStyle);

    let iconClassName = 'material-icons';
    if (className) {
      iconClassName += ' ' + className;
    }

    let newStyle = {
      padding:'0px',
      width: 'unset',
      height: 'unset'
    };
    if (props.onClick) {
      newStyle.cursor = 'pointer';
    }
    Object.assign(newStyle, omit(style, 'fontSize'));

    let button = (
      <IconButton {...props} iconClassName={iconClassName} onClick={onClick} style={newStyle}
                  iconStyle={newIconStyle} tooltip={tooltip}>
        {props.icon || props.glyph || children}
      </IconButton>
    );
    if (to) {
      return (
        <Link to={to}>
          {button}
        </Link>
      );
    } else if (href) {
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