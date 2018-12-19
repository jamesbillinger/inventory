import React, { Component } fron'react';
import Modal from 'components/modal';
import CustomerDetail from './customerDetail';

export default class CustomerModal extends Component {
  render() {
    const { customerID, ...props } = this.props
    return (
      <Modal show={true} {...props}>
        <CustomerDetail customerID={customerID} />
      </Modal>
    );
  }
}