import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as InventoryActions from "shared/actions";
import find from "lodash/find";

class GridCustomer extends Component {
  componentDidMount() {
    const { actions, customers } = this.props;
    if (!customers) {
      actions.fetchCustomers();
    }
  }
  render() {
    const { customer } = this.props;
    return <div>{customer && customer.name}</div>;
  }
}

export default connect(
  (state, ownProps) => ({
    customer: find(state.inventory.customers || [], { _id: ownProps.value })
  }),
  dispatch => ({
    actions: bindActionCreators({ ...InventoryActions }, dispatch)
  })
);
