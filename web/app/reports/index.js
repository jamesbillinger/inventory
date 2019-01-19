import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import moment from "moment/moment";
import { AutoSizer, Table, Column } from 'react-virtualized';
import Modal from 'components/modal';
import FormInput from 'components/formInput';


class Reports extends Component {
  constructor() {
    super();
    this.state = {};
  }
}

close = () => {
  const { history } = this.props;
  history.push('/reports');
};

render() {

}


export default connect(
  (state) => ({
    inventory: state.inventory
  }),
  (dispatch) => ({
    actions: bindActionCreators({ ...Actions }, dispatch)
  })
)(Reports);
