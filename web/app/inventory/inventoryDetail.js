import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import InventoryForm from 'inventory/inventoryForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'shared/actions';
import find from 'lodash/find';
import Icon from 'components/icon';

class InventoryDetail extends Component {
  deleteItem = () => {
    const { actions, itemID, close } = this.props;
    actions.deleteItem(itemID);
    close();
  };

  render() {
    const { inventory, actions, itemID, close } = this.props;
    let item = find((inventory.items || []), {_id: itemID});
    return (
      <div>
        <div style={{position:'absolute', top:'23px', right:'30px'}}>
          {itemID !== '_new' &&
            <Icon icon='delete' secondary={true} onClick={this.deleteItem} style={{ fontSize: '18px' }}/>
          }
        </div>
        <InventoryForm initialValues={item} closeAction={close} actions={actions} />
      </div>
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