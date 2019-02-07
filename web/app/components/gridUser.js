import React, { Component } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';

class GridUser extends Component {
  render() {
    const { cellData, user, dispatch, ...props } = this.props;
    return (
      <div {...props}>
        {user && user.name}
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  user: (state.inventory.users || {})[ownProps.cellData]
}), null)(GridUser);