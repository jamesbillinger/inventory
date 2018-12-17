import React, { Component } from "react";
import FormSelect from "components/formSelect";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as InventoryActions from "shared/actions";

class CustomerForm extends Component {
  change = val => {
    const { input } = this.props;
    if (val === "_new") {
      //create new customer
    } else {
      input.onChange(val);
    }
  };

  render() {
    const { input, ...props } = this.props;
    const { onChange, ...inputProps } = input;
    return (
      <FormSelect input={{ onChange: this.change, ...inputProps }} {...props} />
    );
  }
}

export default connect(
  state => ({
    options: [
      {
        value: "_new",
        label: "Add New Customer"
      },
      ...(state.inventory.customers || []).map(c => ({
        value: c._id,
        label: c.name
      }))
    ]
  }),
  dispatch => ({
    actions: bindActionCreators({ ...InventoryActions }, dispatch)
  })
)(CustomerForm);
