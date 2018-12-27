import React, { Component } from 'react';

export default class LabelledText extends Component {
  render() {
    const { label, children, style, labelStyle, input } = this.props;
    return (
      <div style={Object.assign({ minHeight: '32px', margin: '5px 10px' }, style)}>
        <div style={Object.assign({ color: '#bbb', fontSize: '0.8em' }, labelStyle)}>{label}</div>
        {children && <div style={{ whiteSpace: 'pre-wrap' }}>{children}</div>}
        {input && <div style={{ whiteSpace: 'pre-wrap' }}>{input.value}</div>}
      </div>
    );
  }
}
