import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as InventoryActions from "shared/actions";
import {
  Route,
  BrowserRouter,
  Link,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom";
import Inventory from "inventory";
import InventoryFilter from "inventory/inventoryFilter";
import Sales from "sales";
import Customers from "customers";
import Reports from "./reports";
import Users from "./users";
import POS from "sales/pos";
import FlatButton from "material-ui/FlatButton";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import PopoverContainer from 'components/popoverContainer';
import MenuItem from "material-ui/MenuItem";

class _MyMenuItem extends Component {
  constructor() {
    super();
    this.state = {};
    this._click = ::this.click;
    this._close = ::this.close;
  }

  click(e) {
    this.setState({
      open: !this.state.open,
      anchorEl: e.currentTarget
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  render() {
    const { label, path, style, children, location } = this.props;
    const { open, anchorEl } = this.state;
    if (children) {
      return (
        <div>
          <FlatButton
            style={Object.assign(
              { fontSize: "18px", color: "white", height: "64px" },
              style
            )}
            hoverColor="rgba(255,255,255,0.2)"
            onClick={this._click}
          >
            {label}
          </FlatButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            targetOrigin={{ horizontal: "left", vertical: "top" }}
            onRequestClose={this._close}
          >
            {children}
          </Popover>
        </div>
      );
    } else {
      let active = path === location.pathname;
      if (path !== "/") {
        active = location.pathname.startsWith(path);
      }
      return (
        <Link
          to={path || "/" + label.toLowerCase()}
          style={{ flex: "1 1 auto", maxWidth: "120px" }}
        >
          <FlatButton
            style={Object.assign(
              {
                fontSize: "18px",
                color: active ? "#455a64" : "white",
                height: "64px",
                width: "100%",
                minWidth: "unset"
              },
              style
            )}
            hoverColor={active ? "#cfd8dc" : "rgba(255,255,255,0.2)"}
            backgroundColor={active ? "#cfd8dc" : undefined}
          >
            {label}
          </FlatButton>
        </Link>
      );
    }
  }
}
let MyMenuItem = withRouter(_MyMenuItem);

class Main extends Component {
  componentDidMount() {
    const { actions, inventory } = this.props;
    if (!inventory.items && !this._fetched) {
      this._fetched = true;
      actions.fetchItems();
    }
  }

  render() {
    const { actions, inventory } = this.props;
    if (inventory.user) {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "grid",
            backgroundColor: "rgba(207,216,220,0.2)",
            gridTemplateColumns: "auto 1fr",
            gridTemplateRows: "auto 1fr"
          }}
        >
          <div style={{ gridRow: "1", gridColumn: "1 / 3" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#607d8b",
                color: "white",
                padding: "0 20px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: "1 1 auto",
                  marginRight: "30px"
                }}
              >
                <MyMenuItem label="POS" path="/" />
                <MyMenuItem label="Sales" path="/sales" />
                <MyMenuItem label="Inventory" path="/inventory" />
                <MyMenuItem label="Customers" path="/customers" />
                <MyMenuItem label="Users" path="/users" />
                <MyMenuItem label="Reports" path="/reports" />
              </div>
              <MyMenuItem
                label={inventory.user.name}
                style={{ fontSize: "14px", padding: "0 10px" }}
              >
                <Menu style={{ textAlign: "right" }}>
                  <MenuItem
                    primaryText="Sign out"
                    onClick={actions.logout.bind(this)}
                  />
                  <MenuItem
                    primaryText={"© Copyright " + new Date().getFullYear()}
                    style={{ fontSize: "0.85em" }}
                  />
                </Menu>
              </MyMenuItem>
            </div>
          </div>
          <div
            style={{
              gridRow: "2",
              gridColumn: "1",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Switch>
              <Route path="/inventory" component={InventoryFilter} />
            </Switch>
          </div>
          <div
            style={{
              gridRow: "2",
              gridColumn: "2",
              display: "flex",
              flexDirection: "column",
              padding: "15px"
            }}
          >
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
    state => ({
      inventory: state.inventory
    }),
    dispatch => ({
      actions: bindActionCreators({ ...InventoryActions }, dispatch)
    })
  )(Main)
);
