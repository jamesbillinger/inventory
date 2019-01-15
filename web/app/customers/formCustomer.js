import React, { Component } from 'react';
import FormSelect from 'components/formSelect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InventoryActions from 'shared/actions';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import CustomerModal from './customerModal';

class FormCustomer extends Component {
  change = (val) => {
    const { input, actions } = this.props;
    if (val === '_new') {
      actions.openModal(CustomerModal, {
        customerID: '_new',
        onSubmit: (newVal) => {
          input.onChange(newVal._id)
        }
      });
    } else {
      input.onChange(val);
    }
  };

  render() {
    const { input, ...props } = this.props;
    const { onChange, ...inputProps } = input;
    return <FormSelect input={{ onChange: this.change, ...inputProps }} {...props} />;
  }
}

export default withRouter(
connect(
  (state) => ({
    options: [
      {
        value: '_new',
        label: 'Add New Customer'
      },
      ...(state.inventory.customers || []).map((c) => ({
        value: c._id,
        label: c.name
      }))
    ]
  }),
  (dispatch) => ({
    actions: bindActionCreators({ ...InventoryActions }, dispatch)
  })
)(FormCustomer));
