import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import Autosuggest from 'react-autosuggest';
import filter from 'lodash/filter';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

const theme = {
  container: {
    position: 'relative',
    paddingTop: '5px'
  },
  input: {
    width: '100%',
    border: 'none',
    borderBottom: 'none',
    height: '26px',
    padding: '5px 5px',
    borderRadius: '6px',
    fontSize: '16px'
  },
  inputFocused: {
    outline: 'none'
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: '41px',
    width: '380px',
    //border: '1px solid #aaa',
    backgroundColor: '#fff',
    //borderBottomLeftRadius: '4px',
    //borderBottomRightRadius: '4px',
    zIndex: '2',
    left: '0',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0,0,0,.28), 0 4px 8px rgba(0,0,0,.13)',
    borderTop: '1px solid #eee'
  },
  suggestionsList: {
    margin: '0',
    padding: '0',
    listStyleType: 'none'
  },
  suggestion: {
    cursor: 'pointer',
    lineHeight: '22px',
    padding: '2px 16px 2px 10px',
    borderRadius: '6px'
  },
  suggestionHighlighted: {
    backgroundColor: 'rgba(0,181,239,0.1)'
  }
};

class Search extends Component {
  state = {
    suggestions: [],
    value: ''
  };

  componentDidMount() {
    this._input.input.focus();
  }

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const { items, fields } = this.props;
    const { suggestions } = this.state;
    let item = find(items || [], { _id: value });
    if (item) {
      this.pushItem(item);
      this.setState({
        suggestions: [],
        value: ''
      });
    } else if (value) {
      this.setState({
        suggestions: filter(items || [], (it) => {
          if (it.quantity > 0) {
            return (
              (it.make || '').toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              (it.calibre || '').toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              (it.model || '').toLowerCase().indexOf(value.toLowerCase()) > -1
            );
          } else if ((suggestions || []).length > 0) {
            this.setState({
              suggestions: []
            });
          }
        })
      });
    } else if ((suggestions || []).length > 0) {
      this.setState({
        suggestions: []
      });
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestionValue(suggestion) {
    return suggestion._id;
  }

  renderSuggestion(suggestion) {
    return (
      <div style={{ display: 'flex' }}>
        <div>{suggestion.make}</div>
        <div style={{ marginLeft: '10px' }}>{suggestion.model}</div>
        <div style={{ marginLeft: '10px' }}>Qty=({suggestion.quantity})</div>
      </div>
    );
  }

  onSuggestionSelected = (e, { suggestion }) => {
    const { fields } = this.props;
    this.pushItem(suggestion);
    this.setState({
      value: '',
      suggestions: []
    });
  };

  pushItem(item) {
    const { fields, selectItem, change } = this.props;
    let items = fields.getAll();
    let i = findIndex(items, { item: item._id });
    if (i > -1) {
      change(`items.${i}.quantity`, (fieldValue, allValues) => {
        return fieldValue + 1;
      });
    } else {
      fields.push({
        item: item._id,
        price: item.salePrice || 0,
        quantity: 1,
        totalPrice: item.salePrice || 0
      });
    }
    selectItem(item._id);
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search for Item',
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        ref={(k) => (this._input = k)}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
        theme={theme}
        highlightFirstSuggestion={true}
      />
    );
  }
}
export default connect(
  (state) => ({
    items: state.inventory.items
  }),
  undefined
)(Search);
