import React, { Component } from 'react';
import TextField from "material-ui/TextField";
import omit from 'lodash/omit';
import LabelledText from './labelledText';

export default class FormInput extends Component {
  componentDidMount() {
    const { autoFocus } = this.props;
    if (autoFocus) {
      this._field && this._field.focus();
    }
  }

  focus = () => {
    this._field && this._field.focus();
  };

  phoneOnChange = (e) => {
    const { input } = this.props;
    let val = e.target.value || '';
    val = (val.replace(/\D/g,'') || '').substring(0,10);
    if (val.length === 3) {
      val = val + '-';
    } else if (val.length > 4 && val.length <= 7) {
      val = val.substring(0,3) + '-' + val.substring(3);
    } else if (val.length > 7) {
      val = val.substring(0,3) + '-' + val.substring(3,6) + '-' + val.substring(6);
    }
    input.onChange(e, val);
  };

  numberOnChange = (e) => {
    const { input } = this.props;
    let val = e.target.value || '';
    val = (val.match(/[\d\.]+/g) || []).join();
    input.onChange(e, parseFloat(val || 0));
  };

  currencyOnChange = (e) => {
    const { input } = this.props;
    let val = e.target.value || '';
    val = val.replace(/[^\d\.]/g,'');

    val = val.split('.').slice(0, 2);
    if (val.length > 1) {
      val[1] = (val[1] || '').substring(0, 2);
    }
    //val[0] = (val[0] || '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    val = parseFloat(val.join('.') || 0);
    input.onChange(e, val);
  };


  render() {
    const {style, type, input, meta, label, step, labelledTextMode, ...props} = this.props;
    const { value, onChange, onBlur, onFocus } = input || props;
    const { error, touched } = meta || props;
    let newStyle = Object.assign({
      margin:'0px 10px',
      verticalAlign:'top',
      fontWeight:'normal',
      display:'block'
    }, style);
    if (props.disabled) {
      newStyle.color = 'rgba(0,0,0,0.3)';
    }
    if (newStyle.flex) {
      newStyle.width = 'unset';
    }
    let myOnChange = onChange;
    let inputType;
    let inputStep = step;
    if (type === 'phone') {
      myOnChange = this.phoneOnChange;
    } else if (type === 'number') {
      myOnChange = this.numberOnChange;
      inputType = type;
    } else if (type === 'currency') {
      myOnChange = this.currencyOnChange;
      if (!inputStep) {
        inputStep = '0.01';
      }
      //inputType = 'number';
    }
    if (labelledTextMode) {
      let textValue = value;
      if (type === 'currency' && value) {
        textValue = parseFloat(value).toLocaleString('en-US', {style:'currency', currency:'USD'});
      }
      return <LabelledText label={label} style={omit(style || {}, ['width', 'height'])}>{textValue}</LabelledText>;
    } else {
      return (
        <div style={{position:'relative'}}>
          <TextField ref={(c) => this._field = c} id='unique' style={newStyle} value={value || ''}
                     floatingLabelStyle={{
                       pointerEvents:'none',
                       whiteSpace:'nowrap',
                       left:'0px',
                       color:'rgba(33, 33, 33, 0.5)'
                     }}
                     type={inputType} onChange={myOnChange} floatingLabelText={label}
                     errorText={(touched && error) ? error : null}
                     onBlur={onBlur} onFocus={onFocus} step={inputStep} {...props} />
          {(value && type === 'currency')
            ? <div style={{position:'absolute', left:'0px', bottom:'13px', fontSize:'0.9em'}}>$</div>
            : null
          }
        </div>
      );
    }
  }
}