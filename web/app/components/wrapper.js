import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Router, Redirect } from 'react-router-dom';
import Main from './main';

class Wrapper extends Component {
  render() {
    const { inventory } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route render={() => {
            if (inventory.user) {
              return <Main />;
            } else {
              return <Redirect to='/login' />;
            }
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(
  (state) => ({
    inventory: state.inventory
  }),
  (dispatch) => ({
  })
)(Wrapper);