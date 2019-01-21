import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InventoryActions from 'shared/actions';
import { Route, BrowserRouter, Link, Redirect, Switch, withRouter } from 'react-router-dom';
import Inventory from 'inventory';
import Sales from 'sales';
import Customers from 'customers';
import Reports from 'reports';
import Users from './users';
import POS from 'sales/pos';
import Button from 'components/button';
import Popover from 'material-ui/Popover';
import Menu from '@material-ui/core/Menu';
import Icon from 'components/icon';
import PopoverContainer from 'components/popoverContainer';
import MenuItem from '@material-ui/core/MenuItem';

class AccountMenu extends Component {
  render() {
    const { actions, closeAction } = this.props;
    return (
      <div style={{ textAlign: 'right' }} onClick={closeAction}>
        <div onClick={actions.logout.bind(this)} className="hoverDiv" style={{ padding: '10px' }}>
          Sign Out
        </div>
        <div style={{ padding: '10px', fontSize: '12px' }}>© Copyright {new Date().getFullYear()}</div>
      </div>
    );
  }
}

let linkStyle = {
  padding: '12px 20px',
  fontSize: '15px',
  color:'#555'
};

class MenuMenu extends Component {
  render() {
    const { closeAction } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={closeAction}>
        <Link style={linkStyle} to="/sales" className="hoverDiv">
          Sales
        </Link>
        <Link style={linkStyle} to="/inventory" className="hoverDiv">
          Inventory
        </Link>
        <Link style={linkStyle} to="/customers" className="hoverDiv">
          Customers
        </Link>
        <Link style={linkStyle} to="/users" className="hoverDiv">
          Users
        </Link>
        <Link style={linkStyle} to="/reports" className="hoverDiv">
          Reports
        </Link>
      </div>
    );
  }
}

class Main extends Component {
  componentDidMount() {
    const { actions, inventory } = this.props;
    if (!inventory.items && !this._fetched) {
      this._fetched = true;
      actions.fetchItems();
      actions.fetchCustomers();
    }
  }

  userClick = (e) => {
    const { actions } = this.props;
    actions.openPopover(AccountMenu, {
      anchorEl: e.target,
      actions
    });
  };

  menuClick = (e) => {
    const { actions } = this.props;
    actions.openPopover(MenuMenu, {
      anchorEl: e.target,
      actions
    });
  };

  render() {
    const { actions, inventory } = this.props;
    if (inventory.user) {
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'grid',
            backgroundColor: 'rgba(207,216,220,0.2)',
            gridTemplateColumns: 'auto 1fr',
            gridTemplateRows: 'auto 1fr'
          }}>
          <div style={{ gridRow: '1', gridColumn: '1 / 3' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#607d8b',
                color: 'white',
                padding: '2px 20px'
              }}>
              <Link to="/">
                <Icon icon="home" style={{ color: 'white', fontSize: '24px', cursor: 'pointer' }} />
              </Link>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: '1 1 auto',
                  marginRight: '30px'
                }}>
                {/*<MyMenuItem label="POS" path="/" />
                <MyMenuItem label="Sales" path="/sales" />
                <MyMenuItem label="Inventory" path="/inventory" />
                <MyMenuItem label="Customers" path="/customers" />
                <MyMenuItem label="Users" path="/users" />
                <MyMenuItem label="Reports" path="/reports" />*/}
              </div>
              <Icon
                icon="dots-vertical"
                style={{ color: 'white', fontSize: '24px', marginLeft: '5px' }}
                onClick={this.menuClick}
              />
              <Icon
                icon="account-circle"
                style={{ color: 'white', fontSize: '24px', marginLeft: '5px' }}
                onClick={this.userClick}
              />
            </div>
          </div>
          <div
            style={{
              gridRow: '2',
              gridColumn: '1',
              display: 'flex',
              flexDirection: 'column'
            }}
          />
          <div
            style={{
              gridRow: '2',
              gridColumn: '2',
              display: 'flex',
              flexDirection: 'column',
              padding: '15px'
            }}>
            <Switch>
              <Route path="/users" component={Users} />
              <Route path="/reports" component={Reports} />
              <Route path="/sales/:saleID?" component={Sales} />
              <Route path="/customers/:customerID?" component={Customers} />
              <Route path="/inventory/:itemID?" component={Inventory} />
              <Route component={POS} />
            </Switch>
          </div>
          <PopoverContainer />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default withRouter(
  connect(
    (state) => ({
      inventory: state.inventory
    }),
    (dispatch) => ({
      actions: bindActionCreators({ ...InventoryActions }, dispatch)
    })
  )(Main)
);
