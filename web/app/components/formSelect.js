import React, { Component } from 'react';
import Select from 'react-select';

export default class FormSelect extends Component {
  focus() {
    this._field && this._field.focus();
  }

  render() {
    const { style, input, meta, ...props } = this.props;
    let newStyle = Object.assign({
      margin:'0px 10px'
    }, style);
    if (props.disabled) {
      newStyle.color = 'rgba(0,0,0,0.3)';
    }
    if (props.multiple) {
      newStyle.width = '80%';
    }
    return <Select style={newStyle} {...input} {...props} />
  }
}