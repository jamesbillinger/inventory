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
    const { actions, customerID, closeAction } = this.props;
    actions.deleteCustomer(customerID);
    closeAction();
  };

  print = () => {};

  render() {
    const { inventory, actions, customerID, closeAction, onSubmit } = this.props;
    let item = find(inventory.customers || [], { _id: customerID });

    if (!item && customerID === '_new') {
      item = {};


    }
    console.log(this.props);
    return (
      <div>
        <div style={{ position: 'absolute', top: '23px', right: '30px' }}>
          {customerID !== '_new' && (
            <Icon icon="printer" onClick={this.print} style={{ fontSize: '18px', marginRight: '10px', color: 'blue' }} />
          )}
          {customerID !== '_new' && (
            <Icon icon="delete" secondary={true} onClick={this.deleteCustomer} style={{ fontSize: '18px' }} />
          )}
        </div>
        <CustomerForm initialValues={item} closeAction={closeAction} onSubmit={onSubmit} actions={actions}  />
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
