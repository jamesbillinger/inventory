import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import Async from 'react-select/lib/Async';
import Creatable from 'react-select/lib/Creatable';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';
import LabelledText from 'components/labelledText';
//import api from 'globals/api';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

export default class FormSelect extends Component {
  state = {
    labelCache: {}
  };
  _labelCache = {};
  _mounted = true;

  componentDidMount() {
    const { loadOptions, loadOptionsPath, input, options } = this.props;
    if (loadOptions || loadOptionsPath) {
      this.populateValues();
      this.callLoadOptions('', (ret) => {
        if (this._mounted) {
          this.setState({defaultOptions:ret});
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { input, loadOptions, loadOptionsPath } = this.props;
    if (!isEqual(input.value, prevProps.input.value)) {
      if (this._changed) {
        this._changed = false;
      } else if (loadOptions || loadOptionsPath) {
        this.populateValues();
      }
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleLoadReturn = (ret) => {
    if (this._mounted) {
      (ret || []).map((r) => {
        this._labelCache[r.value] = r.label;
      });
      this.setState({
        labelCache:this._labelCache
      });
    }
  };

  populateValues() {
    const { loadOptions, loadOptionsPath, input, options, multi } = this.props;
    if (multi) {
      if ((input.value || []).length > 0) {
        if (loadOptions) {
          loadOptions(null, input.value, this.handleLoadReturn);
        } else if (loadOptionsPath) {
          this.defaultLoadOptions(null, input.value, this.handleLoadReturn);
        }
      }
    } else if (input.value) {
      if (loadOptions || loadOptionsPath) {
        if (loadOptions) {
          loadOptions(null, [input.value], this.handleLoadReturn);
        } else if (loadOptionsPath) {
          this.defaultLoadOptions(null, [input.value], this.handleLoadReturn);
        }
      }
    }
  }

  callLoadOptions = (input, callback) => {
    const { loadOptions } = this.props;
    if (loadOptions) {
      loadOptions(input, null, (ret) => {
        this.handleLoadReturn(ret);
        callback(ret);
      });
    } else {
      this.defaultLoadOptions(input, null, (ret) => {
        this.handleLoadReturn(ret);
        callback(ret);
      });
    }
  };

  defaultLoadOptions(input, value, callback) {
    const { loadOptionsPath, loadOptionsField, allowCreate, addText = 'Add' } = this.props;
    let body = {
      search: input ? input.toLowerCase() : ''
    };
    if (!input && value) {
      body = {
        values: Array.isArray(value) ? value : [value]
      }
    }
    if (loadOptionsField) {
      body.field = loadOptionsField;
    }
    api.post(loadOptionsPath, body, (err, data) => {
      if (err) {
        console.log(err);
        callback([]);
      } else {
        let newOptions = data || [];
        this._options = newOptions;
        callback(newOptions);
      }
    });
  }

  focus = () => {
    this._field && this._field.focus();
  };

  onFocus = (e) => {
    const { input } = this.props;
    if (!this.state.focused) {
      this.setState({
        focused: true
      });
      if (input.onFocus) {
        input.onFocus(e);
      }
    }
  };

  onBlur = (e, e2, e3) => {
    const { input } = this.props;
    if (this.state.focused) {
      this.setState({
        focused: false,
        highlightedIndex: undefined
      });
      if (input.onBlur) {
        input.onBlur();
      }
    }
  };

  onChange = (val) => {
    const { input, multi } = this.props;
    this._changed = true;
    if (input.onChange) {
      if (multi) {
        input.onChange((val || []).map((v) => typeof v === 'object' ? v.value : v));
      } else {
        input.onChange((val && typeof val === 'object') ? val.value : val);
      }
    }
  };

  onCreateOption = (val) => {
    const { input, multi } = this.props;
    if (!this._labelCache[val]) {
      this._labelCache[val] = val;
    }
    this.setState({
      labelCache: this._labelCache
    });
    if (multi) {
      input.onChange([
        ...(input.value || []).slice(),
        val
      ]);
    } else {
      input.onChange(val);
    }
  };

  getOptionLabel = (option) => {
    return typeof option === 'object' ? option.label : option;
  };

  getOptionValue = (option) => {
    return typeof option === 'object' ? option.value : option;
  };

  render() {
    const {
      options,
      label,
      disabled,
      input,
      meta,
      labelledTextMode,
      style,
      labelStyle,
      optionStyle,
      inputStyle,
      controlStyle,
      placeholder,
      loadOptionsPath,
      loadOptions,
      multi,
      clearable,
      components,
      getOptionLabel,
      getOptionValue,
      singleValueStyle,
      menuPlacement,
      allowCreate,
      placeholderStyle,
      menuStyle,
      dropDownIndicatorStyle,
      short
    } = this.props;
    const { focused, labelCache, defaultOptions } = this.state;
    const { name, value, onFocus, onBlur, onChange, ...inputProps } = input || {};
    const { touched, error } = meta || {};
    if (labelledTextMode) {
      return (
        <LabelledText label={label} style={omit(style || {}, ['width', 'height'])}>
          {input.value}
        </LabelledText>
      );
    } else {
      let myValue = null;
      if (multi) {
        if (loadOptions || loadOptionsPath) {
          myValue = [];
          (value || []).map((v) => {
            if (labelCache.hasOwnProperty(v)) {
              myValue.push({
                value: v,
                label: labelCache[v] || ''
              });
            }
          });
        } else {
          myValue = (value || []).map((v) => ({
            value: v,
            label: (find(options || [], {value:v}) || {}).label || v
          }));
        }
      } else if (typeof value !== 'undefined') {
        if (loadOptions || loadOptionsPath) {
          if (labelCache.hasOwnProperty(value)) {
            myValue = {
              value,
              label:labelCache[value] || value
            };
          }
        } else {
          let opt = find(options || [], {value});
          myValue = {
            value,
            label:opt ? opt.label : value
          };
        }
      }
      let myInputStyle = {
        fontSize: '1rem',
        lineHeight: short ? '1' : '1.25',
        color: '#464a4c'
      };
      if (short) {
        myInputStyle.margin = '0';
        myInputStyle.paddingTop = '0';
        myInputStyle.paddingBottom = '0';
      }
      Object.assign(myInputStyle, inputStyle);
      let styles = {
        control: (base) =>
          Object.assign(
            {},
            base,
            {
              color: '#464a4c',
              backgroundColor: '#fff',
              border: '1px solid rgba(0, 0, 0, 0.15)',
              borderRadius: '3px',
              transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
              boxSizing: 'border-box',
              minHeight: 'unset'
            },
            controlStyle
          ),
        input: (base) =>
          Object.assign(
            {},
            base,
            myInputStyle
          ),
        dropdownIndicator: (base) => ({
          ...base,
          padding: short ? '0 8px' : '2px 8px',
          ...(dropDownIndicatorStyle || {})
        }),
        clearIndicator: (base) => ({
          ...base,
          padding:short ? '0 8px' : '2px 8px'
        }),
        menu: (base) => ({
          ...base,
          zIndex: '5',
          ...(menuStyle || {})
        }),
        placeholder: (base) => Object.assign({}, base, placeholderStyle)
        //list here https://github.com/JedWatson/react-select/blob/v2/src/styles.js
      };
      if (short) {
        styles.valueContainer = (base) => Object.assign({}, base, {
          padding:'0 8px'
        });
      }
      if (optionStyle) {
        styles.option = (base) => ({
          ...base,
          ...optionStyle
        });
      }
      if (singleValueStyle) {
        styles.singleValue = (base) => ({
          ...base,
          ...singleValueStyle
        });
      }
      let newStyle = {
        margin: '15px 0 0 10px',
        fontWeight: 'normal',
        width: multi ? 'calc(100% - 10px)' : '200px'
      };
      Object.assign(newStyle, style);
      let newLabelStyle = {
        display: 'block',
        marginBottom: '0.5em',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        lineHeight: '1rem'
      };
      Object.assign(newLabelStyle, labelStyle);
      let selectControl;
      if (loadOptionsPath || loadOptions) {
        if (allowCreate) {
          selectControl = (
            <AsyncCreatable
              id={name || 'FormSelect'}
              ref={(c) => (this._field = c)}
              loadOptions={this.callLoadOptions}
              components={components || makeAnimated()}
              placeholder={placeholder || label}
              styles={styles}
              cacheOptions={true}
              isClearable={clearable}
              isMulti={multi}
              menuPlacement={menuPlacement}
              getOptionLabel={getOptionLabel || this.getOptionLabel}
              getOptionValue={getOptionValue || this.getOptionValue}
              value={myValue}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onCreateOption={this.onCreateOption}
              defaultOptions={defaultOptions}
              {...inputProps}
            />
          );
        } else {
          selectControl = (
            <Async
              id={name || 'FormSelect'}
              ref={(c) => (this._field = c)}
              loadOptions={this.callLoadOptions}
              components={components || makeAnimated()}
              placeholder={placeholder || label}
              styles={styles}
              cacheOptions={true}
              isClearable={clearable}
              isMulti={multi}
              menuPlacement={menuPlacement}
              getOptionLabel={getOptionLabel || this.getOptionLabel}
              getOptionValue={getOptionValue || this.getOptionValue}
              value={myValue}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              defaultOptions={defaultOptions}
              {...inputProps}
            />
          );
        }
      } else if (allowCreate) {
        selectControl = (
          <Creatable
            id={name || 'FormSelect'}
            style={{ minHeight: 'unset' }}
            ref={(c) => (this._field = c)}
            options={options || []}
            isMulti={multi}
            components={components || makeAnimated()}
            isClearable={clearable}
            placeholder={placeholder || label}
            styles={styles}
            menuPlacement={menuPlacement}
            getOptionLabel={getOptionLabel || this.getOptionLabel}
            getOptionValue={getOptionValue || this.getOptionValue}
            value={myValue}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            {...inputProps}
          />
        );
      } else {
        selectControl = (
          <Select
            id={name || 'FormSelect'}
            style={{ minHeight: 'unset' }}
            ref={(c) => (this._field = c)}
            options={options || []}
            isMulti={multi}
            //components={components || makeAnimated()}
            isClearable={clearable}
            placeholder={placeholder || label}
            styles={styles}
            menuPlacement={menuPlacement}
            getOptionLabel={getOptionLabel || this.getOptionLabel}
            getOptionValue={getOptionValue || this.getOptionValue}
            value={myValue}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            {...inputProps}
          />
        );
      }
      return (
        <div style={newStyle}>
          {label && (
            <label htmlFor={name || 'FormSelect'} style={newLabelStyle} onClick={this.focus}>
              {label}
            </label>
          )}
          {selectControl}
          {touched &&
            error && (
              <div
                style={{ color: 'red', fontSize: '13px', whiteSpace: 'nowrap', marginTop: '3px' }}
                onClick={this.focus}>
                {error}
              </div>
            )}
        </div>
      );
    }
  }
}
