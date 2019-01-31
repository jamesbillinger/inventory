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
    const list = [
      { model: 'ar-15', make: 'blackhawk', name: 'fred' },
      { model: 'pewpew', make: 'frogs', name: 'joe' },
      { model: 'bangstick', make: 'bangin', name: 'yoMom' }
    ];

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
          }}>
          <Table
            width={300}
            height={300}
            headerHeight={20}
            rowHeight={30}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}>
            <Column dataKey="model" label="model" width={100} />
            <Column dataKey="make" label="make" width={100} />
            <Column dataKey="name" label="name" width={100} />
          </Table>
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
