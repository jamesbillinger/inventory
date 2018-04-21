import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SaleForm from './saleForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'shared/actions';
import find from 'lodash/find';
import Icon from './icon';

class SaleDetail extends Component {
  deleteSale = () => {
    const { actions, saleID, close } = this.props;
    actions.deleteSale(saleID);
    close();
  };

  print = () => {

  };

  render() {
    const { inventory, actions, saleID, close } = this.props;
    let item = find((inventory.sales || []), {_id: saleID});
    return (
      <div>
        <div style={{position:'absolute', top:'23px', right:'30px'}}>
          {saleID !== '_new' &&
            <Icon icon='print' onClick={this.print} style={{fontSize:'18px', marginRight:'10px', color:'blue'}} />
          }
          {saleID !== '_new' &&
            <Icon icon='delete' secondary={true} onClick={this.deleteSale} style={{ fontSize: '18px' }}/>
          }
        </div>
        <SaleForm initialValues={item} closeAction={close} actions={actions} />
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
)(SaleDetail));