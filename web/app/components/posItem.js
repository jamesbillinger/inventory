import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from 'components/formInput';
import find from 'lodash/find';
import LabelledText from './labelledText';
import get from 'lodash/get';

class _POSItem extends Component {
  state = {};

  componentDidMount() {
    const { items, index, inventoryItems } = this.props;
    let item = items[index].item;
    if (item.input.value) {
      this.setState({
        fullItem: find(inventoryItems, {_id: item.input.value})
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { items, index, inventoryItems } = this.props;
    let item = items[index].item;
    let prevItem = prevProps.items[index].item;
    if (item.input.value !== prevItem.input.value) {
      this.setState({
        fullItem: find(inventoryItems, {_id: item.input.value})
      });
    }
  }

  priceChange = (e, v) => {
    const { items, index } = this.props;
    let quantity = items[index].quantity;
    let price = items[index].price;
    let totalPrice = items[index].totalPrice;
    price.input.onChange(v || 0);
    totalPrice.input.onChange((quantity.input.value || 0) * (v || 0));
  };
  
  quantityChange = (e, v) => {
    const { items, index } = this.props;
    let quantity = items[index].quantity;
    let price = items[index].price;
    let totalPrice = items[index].totalPrice;
    quantity.input.onChange(v || 0);
    totalPrice.input.onChange((v || 0) * (price.input.value || 0));
  };

  render() {
    const { items, index, selectItem, labelledTextMode } = this.props;
    let price = items[index].price;
    let quantity = items[index].quantity;
    let totalPrice = items[index].totalPrice;
    const { fullItem } = this.state;
    if (fullItem) {
      return (
        <div style={{display:'flex', alignItems:'center', backgroundColor: index % 2 ? '#f2f2f2' : 'none'}}>
          <div style={{flex:'0 0 25px', fontWeight:'bold', fontSize:'18px', color:'#bbb'}}>{index + 1}.</div>
          <div style={{flex: '1 1 auto', display: 'flex', alignItems: 'center', cursor: 'pointer'}}
               onClick={selectItem ? selectItem.bind(this, fullItem._id) : null}>
            <LabelledText label='Make'>{fullItem.make}</LabelledText>
            <LabelledText label='Model'>{fullItem.model}</LabelledText>
            <LabelledText label='Qty On Hand'>{fullItem.qty}</LabelledText>
          </div>
          <FormInput type='currency' label='Price (ea)' style={{width:'100px'}} labelledTextMode={labelledTextMode}
                     input={{value:price.input.value, onChange:this.priceChange}} meta={price.meta} />
          <FormInput input={{value:quantity.input.value, onChange:this.quantityChange}} type='number' label='Quantity'
                     style={{ width: '60px' }} meta={quantity.meta} labelledTextMode={labelledTextMode} />
          <FormInput type='currency' label='Total Price' style={{width:'100px'}} {...totalPrice} labelledTextMode={labelledTextMode} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}
export default connect(
  (state) => ({
    inventoryItems: state.inventory.items
  }), undefined
)(_POSItem);