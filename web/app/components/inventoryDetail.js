import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router-dom';
import InventoryForm from './inventoryForm';

class _InventoryFilter extends Component {
  handleClose() {
    console.log(this);
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { match } = this.props;
    return (
      <Dialog
        title="Dialog With Actions"
        modal={false}
        open={true}
        onRequestClose={::this.handleClose}
        autoScrollBodyContent={true}
      >
        <InventoryForm initialValues={{_id:match.params.inventoryID}} />
      </Dialog>
    )
  }
}

const InventoryFilter = withRouter(_InventoryFilter);
export default InventoryFilter;