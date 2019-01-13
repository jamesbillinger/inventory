import React, { Component } from 'react';
import * as InventoryActions from 'share/actions';

export default class CustomerDropdown extends Component {
  render(){
    const { customers, actions, onClick, onHover } = this.props;
    console.log(customers);
    if (!customers) {
      actions.fetchCustomers();
    }
  }
}