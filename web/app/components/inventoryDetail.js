import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router-dom';
import InventoryForm from './inventoryForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'shared/actions';
import find from 'lodash/find';
import Icon from './icon';

class InventoryDetail extends Component {
  constructor() {
    super();
    this._close = ::this.close;
    this._deleteItem = ::this.deleteItem;
  }

  close() {
    const { history } = this.props;
    history.push('/');
  }

  deleteItem() {
    const { actions, match } = this.props;
    actions.deleteItem(match.params.inventoryID);
    this.close();
  }

  render() {
    const { match, inventory, actions } = this.props;
    let item = find((inventory.items || []), {_id: match.params.inventoryID});
    return (
      <Dialog
        title='Inventory Item Details'
        modal={false}
        open={true}
        onRequestClose={this._close}
        autoScrollBodyContent={true}
      >
        <div style={{position:'absolute', top:'23px', right:'30px'}}>
          {match.params.inventoryID !== '_new' &&
            <Icon icon='delete' secondary={true} onClick={this._deleteItem} style={{ fontSize: '18px' }}/>
          }
        </div>
        <InventoryForm initialValues={item} closeAction={this._close} actions={actions} />
      </Dialog>
    )
  }
}

export default withRouter(connect(
  (state) => ({
    inventory: state.inventory
  }),
  (dispatch) => ({
    actions: bindActionCreators({...Actions}, dispatch)
  })
)(InventoryDetail));