import React, { Component } from 'react';
import Select from 'react-select';

const activeLabelStyle = {
  position: 'absolute',
  lineHeight: '22px',
  bottom:'11px',
  left:'0px',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  zIndex: '1',
  cursor: 'text',
  transform: 'perspective(1px) scale(0.75) translate3d(2px, -28px, 0)',
  transformOrigin: 'left top',
  pointerEvents: 'none',
  userSelect: 'none',
  color: 'rgba(33,33,33,0.5)'
};

const inactiveLabelStyle = {
  position: 'absolute',
  lineHeight: '22px',
  bottom:'11px',
  left:'0px',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  zIndex: '1',
  cursor: 'text',
  transform: 'scale(1) translate3d(0px, 0px, 0px)',
  transformOrigin: 'left top 0px',
  pointerEvents: 'auto',
  color: 'rgba(0, 0, 0, 0.298039)'
};

export default class FormSelect extends Component {
  state = {};

  focus = () => {
    this._field && this._field.focus();
  };

  onFocus = () => {
    const { input } = this.props;
    if (!this.state.focused) {
      this.setState({
        focused: true
      });
    }
    input.onFocus && input.onFocus();
  };

  onBlur = (e) => {
    const { input } = this.props;
    if (this.state.focused) {
      this.setState({
        focused: false
      });
    }
    //input.onBlur && input.onBlur(e);
  };

  render() {
    const { style, input, meta, label, hideLine, placeholder, ...props } = this.props;
    const { focused } = this.state;
    let newStyle = Object.assign({
      position: 'relative',
      width: '256px',
      margin: '10px 10px 0 10px',
      paddingBottom:'5px'
    }, style);
    if (props.disabled) {
      newStyle.color = 'rgba(0,0,0,0.3)';
    }
    if (props.multiple) {
      newStyle.width = '80%';
    }
    let hasValue = true;
    if (input.value === '' || input.value === null || typeof input.value === 'undefined' || input.value === []) {
      hasValue = false;
    }
    let styles = {
      control: (base) => ({
        ...base,
        color:'transparent',
        border:'none',
        borderWidth:'0',
        background:'none',
        boxShadow:'none'
      }),
      container: (base) => ({
        ...base
      }),
      indicatorSeparator: (base) => ({}),
      valueContainer: (base) => ({
        ...base,
        paddingLeft:'0'
      })
    };
    return (
      <div style={newStyle}>
        {label &&
          <div style={(hasValue || focused) ? activeLabelStyle : inactiveLabelStyle} onClick={this.focus}>{label}</div>
        }
        <Select ref={k => this._field = k}
                value={input.value}
                styles={styles} onFocus={this.onFocus} onBlur={this.onBlur} onChange={input.onChange}
                placeholder={placeholder || ''} {...props} />
        {!hideLine &&
          <hr style={{border:'none', borderBottom:'solid 1px', borderColor:'#b6b6b6', bottom:'8px',
                      boxSizing:'content-box', margin:'0px', position:'absolute', width:'100%'}}/>
        }
        {!hideLine &&
          <hr style={{borderStyle:'none none solid', borderBottomWidth:'2px', borderColor:'rgb(158, 158, 158)',
                      bottom:'8px', boxSizing:'content-box', margin:'0px', position:'absolute', width:'100%',
                      transform:focused ? 'scaleX(1)' : 'scaleX(0)', transition:'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'}}/>
        }
      </div>
    );
  }
}