import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InventoryActions from '../../../shared/actions';
import {Route, BrowserRouter, Link, Redirect, Switch} from 'react-router-dom';
import Inventory from './inventory';
import InventoryFilter from './inventoryFilter';
import Orders from './orders';
import Reports from './reports';
import Users from './users';
import FlatButton from 'material-ui/FlatButton';


class MenuItem extends Component {
  render() {
    const { label, path } = this.props;
    return (
      <Link to={path || ('/' + label.toLowerCase())}>
        <FlatButton style={{fontSize:'18px', color:'white', height:'64px'}} hoverColor='rgba(255,255,255,0.2)'>
          {label}
        </FlatButton>
      </Link>
    );
  }
}

class Main extends Component {
  render() {
    const { actions, inventory } = this.props;
    if (inventory.user) {
      return (
        <div style={{
          height:'100%',
          width:'100%',
          display:'grid',
          gridTemplateColumns:'256px 1fr',
          gridTemplateRows:'64px 1fr 32px'
        }}>
          <div style={{
            gridRow:'1', gridColumn:'1 / 3',
            backgroundColor:'#607d8b', color:'white',
            display:'flex', alignItems:'center', justifyContent:'flex-end'
          }}>
            <MenuItem label='Inventory' path='/'/>
            <MenuItem label='Users'/>
            <MenuItem label='Reports'/>
            <MenuItem label='Orders'/>
          </div>
          <div style={{gridRow:'2', gridColumn:'1'}}>
            <Switch>
              <Route path='/' exact={true} component={InventoryFilter}/>
            </Switch>
          </div>
          <div style={{gridRow:'2', gridColumn:'2'}}>
            <Switch>
              <Route path='/users' component={Users}/>
              <Route path='/reports' component={Reports}/>
              <Route path='/orders' component={Orders}/>
              <Route component={Inventory}/>
            </Switch>
          </div>
          <div style={{
            gridRow:'3', gridColumn:'1 / 3', display:'flex', backgroundColor:'#455a64',
            alignItems:'center', justifyContent:'center', color:'#ddd', fontSize:'13px'
          }}>
            <div>Copyright {(new Date()).getFullYear()}</div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(
  (state) => ({
    inventory: state.inventory
  }),
  (dispatch) => ({
    actions: bindActionCreators({...InventoryActions}, dispatch)
  })
)(Main);