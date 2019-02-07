import React, { Component } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import GridDate from 'components/gridDate';
import GridUser from 'components/gridUser';

class SaleListItem extends Component {
  state = {};

  componentDidMount() {
    const { item, inventory } = this.props;
    this.setState({
      invItem: find(inventory.items, { _id: item.item })
    });
  }

  render() {
    const { sale, item } = this.props;
    const { invItem } = this.state;
    return (
      <div style={{ display: 'flex', height: '24px', overflow: 'hidden' }} className="ReactVirtualized__Table__row">
        <div style={{ flex: '0 1 100px', justifyContent: 'flex-start' }} className="ReactVirtualized__Table__rowColumn">
          <GridDate cellData={sale.createdAt} />
        </div>
        <div style={{ flex: '0 1 200px', justifyContent: 'flex-end' }} className="ReactVirtualized__Table__rowColumn">
          <GridUser cellData={sale.updatedBy} />
        </div>
        <div style={{ flex: '1 1 150px', justifyContent: 'flex-start' }} className="ReactVirtualized__Table__rowColumn">
          {invItem && invItem.model}
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    inventory: state.inventory
  }),
  null
)(SaleListItem);
