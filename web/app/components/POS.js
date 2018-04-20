import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import FormInput from 'components/formInput';
import debounce from 'lodash/debounce';

class POSItem extends Component {
  render() {
    const { input, meta } = this.props;
    return (
      <div style={{display:'flex'}}>
        <Field name={input.name + '.item'} component={FormInput} label='Item' />
        <Field name={input.name + '.quantity'} component={FormInput} type='number' label='Quantity' />
      </div>
    );
  }
}

class POSItems extends Component {
  render() {
    const { fields } = this.props;
    return (
      <div>
        {(fields || []).map((f) =>
          <Field key={f} name={f} component={POSItem} />
        )}
      </div>
    )
  }
}

class Search extends Component {
  state = {};

  searchForItem = (value) => {
    console.log('searching!!', value);
  };

  debouncedSearch = debounce(this.searchForItem, 5000);

  onChange = (e) => {
    const { fields } = this.props;
    let value = e.currentTarget.value;
    this.setState({
      value
    });
    this.debouncedSearch(value);
    //expensive searching against the inventory items db and we found a hit!
    /*fields.push({
      item: value,
      quantity: 1
    })*/
  };

  render() {
    const { value } = this.state;
    return (
      <FormInput input={{value,onChange: this.onChange}} placeholder='Search' />
    )
  }
}

class Inventory extends Component {
  render() {
    return (
      <div style={{flex:'0 0 100%', display:'grid',
                   gridTemplateColumns:'1fr auto', gridTemplateRows:'auto 1fr auto', gridGap:'10px'}}>
        <div style={{gridColumn:'1 / 3', gridRow:'1', backgroundColor:'white', borderRadius:'6px', padding:'15px'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <FieldArray name='items' component={Search} />
            <div>Order Control - New / Cancel</div>
          </div>
        </div>
        <div style={{gridColumn:'1', gridRow:'2', backgroundColor:'white', borderRadius:'6px', padding:'15px'}}>
          <FieldArray name='items' component={POSItems} />
        </div>
        <div style={{gridColumn:'2', gridRow:'2', backgroundColor:'white', borderRadius:'6px', padding:'15px'}}>
          Selected Item Detail
        </div>
        <div style={{gridColumn:'1 / 3', gridRow:'3', backgroundColor:'white', borderRadius:'6px', padding:'15px'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>Customer</div>
            <div>Order Totals</div>
          </div>
        </div>
      </div>
    )
  }
}
export default reduxForm({
  form: 'posForm'
})(Inventory)