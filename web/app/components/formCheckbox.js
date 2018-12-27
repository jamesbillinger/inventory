import React, { PureComponent } from 'react';
import Checkbox from 'rc-checkbox';
import LabelledText from 'components/labelledText';
import omit from 'lodash/omit';
import palette from 'globals/palette';
import uniqueId from 'lodash/uniqueId';

const defaultStyle = {
  margin: '15px 0 0 10px',
  fontWeight: 'normal'
};

const defaultLabelStyle = {
  display: 'block',
  //margin: '0 0 1em',
  marginLeft: '0.8em',
  fontWeight: 'bold',
  fontSize: '0.8rem'
};

export default class FormCheckbox extends PureComponent {
  render() {
    const { style, disabled, labelledTextMode, label, input, meta, id, labelStyle, leftLabel, ...props } = this.props;
    const { value, onChange, name } = input || props;
    const { error, touched } = meta || props;
    let newStyle = Object.assign({}, defaultStyle);
    let newLabelStyle = Object.assign({}, defaultLabelStyle);
    if (disabled) {
      newLabelStyle.color = '#999';
    }

    Object.assign(newStyle, style);
    Object.assign(newLabelStyle, labelStyle);

    if (touched && error) {
      newLabelStyle.color = palette.Cancel;
    }
    if (leftLabel) {
      newLabelStyle.marginRight = '0.8em';
    }
    if (!label) {
      delete newLabelStyle.marginLeft;
    }

    if (labelledTextMode) {
      return (
        <LabelledText label={label} style={omit(style || {}, ['width', 'height'])}>
          {value ? 'true' : 'false'}
        </LabelledText>
      );
    } else {
      let myID = id || name || `FormCheckbox_${uniqueId()}`;
      return (
        <div style={newStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {leftLabel && (
              <label htmlFor={myID} style={newLabelStyle}>
                {leftLabel}
              </label>
            )}
            <Checkbox id={myID} checked={!!value} disabled={disabled} onChange={onChange} />
            {label && (
              <label htmlFor={myID} style={newLabelStyle}>
                {label}
              </label>
            )}
          </div>
          {touched &&
            error && (
              <div
                style={{
                  color: 'red',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  marginTop: '3px'
                }}
                onClick={this.focus}>
                {error}
              </div>
            )}
        </div>
      );
    }
  }
}
