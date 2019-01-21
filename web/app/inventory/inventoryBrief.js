import React, { Component } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import LabelledText from 'components/labelledText';

class InventoryBrief extends Component {
  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <div
        style={{
          width: '150px'
        }}>
        {item && (
          <div>
            <LabelledText label="make">{item.make}</LabelledText>
            <LabelledText label="model">{item.model}</LabelledText>
            <LabelledText label="Purchase Price">{item.purchasePrice}</LabelledText>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    item: find(state.inventory.items || [], { _id: ownProps.itemID })
  }),
  null
)(InventoryBrief);
