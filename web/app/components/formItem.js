import React, { Component } from "react";
import { connect } from "react-redux";
import FormSelect from "components/formSelect";

class FormItem extends Component {
  getOptionLabel(item) {
    return item.make + " " + item.model;
  }

  getOptionValue(item) {
    return item._id;
  }

  render() {
    const { items, ...props } = this.props;
    return (
      <FormSelect
        options={items || []}
        getOptionLabel={this.getOptionLabel}
        getOptionValue={this.getOptionValue}
        {...props}
      />
    );
  }
}
export default connect(
  state => ({
    items: state.inventory.items
  }),
  undefined
)(FormItem);
