import React, { Component } from 'react';
import Modal from 'components/modal';
import CustomerDetail from './customerDetail';


export default class CustomerModal extends Component {
  render() {
    const { customerID, closeAction, onSubmit, ...props } = this.props
    return (
      <Modal show={true} closeAction={closeAction} hideFooter={true} {...props}>
        <CustomerDetail customerID={customerID} onSubmit={onSubmit} closeAction={closeAction}/>
      </Modal>
    );
  }
}