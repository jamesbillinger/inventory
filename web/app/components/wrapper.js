import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InventoryActions from 'shared/actions';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from './main';
import Register from './register';
import Login from './login';
import firebase from 'firebase';

class Wrapper extends Component {
  componentWillMount() {
    const { actions } = this.props;
    firebase.auth().onAuthStateChanged(::actions.onAuthStateChanged);
  }

  render() {
    const { user, initialLoadComplete } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/register" render={() => <Register />} />
          <Route
            path="/login"
            render={(props) => {
              if (!initialLoadComplete) {
                return <div />;
              } else if (user) {
                return <Redirect to="/" />;
              } else {
                return <Login {...props} />;
              }
            }}
          />
          <Route
            render={() => {
              if (!initialLoadComplete) {
                return <div />;
              } else if (user) {
                return <Main />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(
  (state) => ({
    initialLoadComplete: state.inventory.initialLoadComplete,
    user: state.inventory.user
  }),
  (dispatch) => ({
    actions: bindActionCreators({ ...InventoryActions }, dispatch)
  })
)(Wrapper);
