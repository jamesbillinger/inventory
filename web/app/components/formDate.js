import omit from 'lodash/omit';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import LabelledText from 'components/labelledText';
import 'react-datepicker/dist/react-datepicker.css';

export default class FormDate extends Component {
  constructor() {
    super();
    this._changeDate = ::this.changeDate;
    this._changeRaw = ::this.changeRaw;
    this._blur = ::this.blur;
  }

  changeRaw(e) {
    const { format, time, input } = this.props;
    let v = e.target.value;
    let f = format || (time ? 'ddd MMM DD [at] h:mm a' : 'MM/DD/YYYY');
    let m = moment(v, format);
    let oldValue = moment(input.value);
    if (!m._isValid && !format && time && v.indexOf('at') > -1) {
      f = 'MMM DD YYYY h:mm a';
      let tmp = v.split('at');
      let tmpD = tmp[0].trim().split(' ');
      m = moment(tmpD[1] + ' ' + tmpD[2] + ' ' + oldValue.year() + ' ' + tmp[1].trim(), f);
    }
    if (m._isValid) {
      input.onChange(m._d);
    }
  }

  changeDate(date) {
    const { input } = this.props;
    if (date && moment(date).isValid()) {
      if (!input.value) {
        //account for but in react-datepicker
        moment(date).subtract(moment(date).utcOffset(), 'minutes');
      }
      input.onChange && input.onChange(date);
    } else {
      input.onChange && input.onChange(null);
    }
  }

  blur() {
    const { input } = this.props;
    input.onBlur && input.onBlur();
  }

  render() {
    const {
      style,
      label,
      input,
      meta = {},
      underline = true,
      format,
      dateFormat,
      time,
      labelledTextMode,
      timeFormat = 'h:mm a',
      shouldCloseOnSelect,
      disabled,
      ...props
    } = this.props;
    const { value, onChange, onBlur, ...newInput } = input;
    const { touched, error } = meta || {};
    let newStyle = {
      fontSize: '16px',
      lineHeight: '24px',
      width: '256px',
      //height: '72px',
      display: 'inline-block',
      position: 'relative',
      backgroundColor: 'transparent',
      fontFamily: 'Roboto, sans-serif',
      transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      margin: '10px 10px 0 10px',
      paddingTop: label ? '17px' : '2px',
      verticalAlign: 'top'
    };
    if (!label) {
      newStyle.height = '48px';
    }
    Object.assign(newStyle, style);
    let dt = value;
    if (labelledTextMode) {
      return (
        <LabelledText label={label} style={omit(style || {}, ['width', 'height'])}>
          {value && dt.format(time ? 'h:mm a M/D/YY' : 'M/D/YY')}
        </LabelledText>
      );
    } else {
      return (
        <div style={newStyle}>
          <label
            style={{
              position: 'absolute',
              lineHeight: '22px',
              top: '20px',
              transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
              zIndex: '1',
              cursor: 'text',
              transform: 'perspective(1px) scale(0.75) translate3d(2px, -28px, 0)',
              transformOrigin: 'left top',
              pointerEvents: 'none',
              userSelect: 'none',
              color: 'rgba(33,33,33,0.5)'
            }}>
            {label}
          </label>
          {(
            <DatePicker
              dateFormat={format || dateFormat || (time ? 'ddd MMM DD [at] h:mm a' : 'MM/DD/YYYY')}
              timeFormat={timeFormat}
              shouldCloseOnSelect={typeof shouldCloseOnSelect === 'undefined' ? !time : shouldCloseOnSelect}
              onChangeRaw={this._changeRaw}
              onBlur={this._blur}
              className={disabled ? 'react-datepicker-disabled' : undefined}
              selected={dt}
              onChange={this._changeDate}
              showTimeSelect={time}
              disabled={disabled}
              {...props}
              {...newInput}
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false
                  //boundariesElement: 'viewport'
                }
              }}
            />
          )}
          {meta.touched && meta.error ? (
            <span
              className="help-block"
              style={{ position: 'absolute', color: 'red', bottom: '-24px', fontSize: '0.8em' }}>
              {meta.error}
            </span>
          ) : (
            ''
          )}
          {underline && (
            <div
              style={{
                position: 'relative'
              }}>
              <hr
                style={{
                  border: 'none',
                  borderBottom: 'solid 1px',
                  borderColor: '#b6b6b6',
                  bottom: '0',
                  boxSizing: 'content-box',
                  margin: '0px',
                  position: 'absolute',
                  width: '100%'
                }}
              />
              <hr
                style={{
                  borderStyle: 'none none solid',
                  borderBottomWidth: '2px',
                  borderColor: 'rgb(158, 158, 158)',
                  bottom: '0',
                  boxSizing: 'content-box',
                  margin: '0px',
                  position: 'absolute',
                  width: '100%',
                  transform: 'scaleX(0)',
                  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
                }}
              />
            </div>
          )}
          {touched &&
          error && (
            <div style={{ color: 'red', fontSize: '13px', whiteSpace: 'nowrap', marginTop: '3px' }}>{error}</div>
          )}
        </div>
      );
    }
  }
}