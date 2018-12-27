import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CustomerForm from './customerForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from 'shared/actions';
import find from 'lodash/find';
import Icon from 'components/icon';

class CustomerDetail extends Component {
  deleteCustomer = () => {
    const { actions, customerID, close } = this.props;
    actions.deleteCustomer(customerID);
    close();
  };

  print = () => {};

  render() {
    const { inventory, actions, customerID, close } = this.props;
    let item = find(inventory.customers || [], { _id: customerID });
    if (!item && customerID === '_new') {
      item = {};
    }
    return (
      <div>
        <div style={{ position: 'absolute', top: '23px', right: '30px' }}>
          {customerID !== '_new' && (
            <Icon icon="print" onClick={this.print} style={{ fontSize: '18px', marginRight: '10px', color: 'blue' }} />
          )}
          {customerID !== '_new' && (
            <Icon icon="delete" secondary={true} onClick={this.deleteCustomer} style={{ fontSize: '18px' }} />
          )}
        </div>
        <CustomerForm initialValues={item} closeAction={close} actions={actions} />
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state) => ({
      inventory: state.inventory
    }),
    (dispatch) => ({
      actions: bindActionCreators({ ...Actions }, dispatch)
    })
  )(CustomerDetail)
);
