import React, { Component } from 'react';
import debounce from 'lodash/debounce'
import FormInput from 'components/formInput';
import LabelledText from 'components/labelledText';

export default class Totals extends Component {
  state = {
    itemsTotal: 0
  };

  componentDidMount() {
    this.calculateTotals();
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.props;
    this.calculateTotals();
  }

  calculateTotals() {
    const { items, discount } = this.props;
    let itemsTotal = (items.input.value || []).reduce((a, b) => {
      return a + parseFloat(b.totalPrice || 0);
    }, 0);
    if (itemsTotal !== this.state.itemsTotal) {
      this.setState({
        itemsTotal
      });
    }
  }

  discountChange = (e, v) => {
    const { discount } = this.props;
    const { totalValue } = this.state;
    discount.input.onChange(v);
    if (totalValue) {
      this.setState({
        totalValue: undefined
      });
    }
  };

  changeTotal = (e, v) => {
    const { discount } = this.props;
    const { itemsTotal } = this.state;
    this.setState({
      totalValue: v || 0
    });
    discount.input.onChange(itemsTotal - (v || 0));
  };

  render() {
    const { items, discount, taxRate, labelledTextMode } = this.props;
    const { itemsTotal } = this.state;
    let totalValue = this.state.totalValue || (itemsTotal - (discount.input.value || 0));
    if ((items.input.value || []).length > 0) {
      return (
        <div style={{display:'flex', alignItems:'center'}}>
          <FormInput label='Subtotal' input={{value:itemsTotal}} type='currency' style={{flex:'1 1 100px'}}
                     disabled={true} labelledTextMode={labelledTextMode} />
          <FormInput label='Discount' input={{value:discount.input.value, onChange:this.discountChange}}
                     type='currency' style={{flex:'1 1 100px'}} labelledTextMode={labelledTextMode} />
          <FormInput label='Sale Total' input={{value:totalValue, onChange:this.changeTotal}}
                     type='currency' style={{flex:'1 1 100px'}} labelledTextMode={labelledTextMode} />
          <FormInput label={'Tax (' + taxRate.input.value + ')'}
                     input={{value:(totalValue * taxRate.input.value).toFixed(2), onChange:this.changeTotal}}
                     type='currency' style={{flex:'1 1 100px'}} disabled={true} labelledTextMode={labelledTextMode} />
          <FormInput label='Total' input={{value:(totalValue * (1 + taxRate.input.value)).toFixed(2), onChange:this.changeTotal}}
                     type='currency' style={{flex:'1 1 100px´'}} disabled={true} labelledTextMode={labelledTextMode} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}