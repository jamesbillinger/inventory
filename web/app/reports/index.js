import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import moment from 'moment/moment';
import { AutoSizer, Table, Column } from 'react-virtualized';
import Modal from 'components/modal';
import FormInput from 'components/formInput';
import FatButton from '../components/fatButton';
import Button from 'components/button';

class Reports extends Component {
  constructor() {
    super();
    this.state = {};
  }

  close = () => {
    const { history } = this.props;
    history.push('/reports');
  };

  render() {
    console.log(this.props);
    return (
      <div
        style={{
          flex: '0 0 100%',
          display: 'grid',
          gridTemplateColumns: '1fr auto ',
          gridTemplateRows: 'auto 1fr 1fr',
          gridGap: '10px'
        }}>
        <div
          style={{
            gridColumn: '1 / 4',
            gridRow: '1',
            backgroundColor: 'white',
            borderRadius: '6px',
            padding: '5px 15px'
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
            <Button>End of Day</Button>
            <Button>Custom Reports</Button>
            <Button>Saved Reports</Button>
          </div>
        </div>
        <div
          style={{
            gridColumn: '1 / 4',
            gridRow: '2',
            backgroundColor: 'white',
            borderRadius: '6px'
          }}>cats
        </div>
        <div
          style={{
            gridColumn: '1/4',
            gridRow: '3',
            backgroundColor: 'white',
            borderRadius: '6px'
          }}>
          Money Breakdown?
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    inventory: state.inventory
  }),
  (dispatch) => ({
    actions: bindActionCreators({ ...Actions }, dispatch)
  })
)(Reports);
