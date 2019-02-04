import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import moment from 'moment/moment';
import { AutoSizer, Table, Column } from 'react-virtualized';
import Modal from 'components/modal';
import FormInput from 'components/formInput';
import FatButton from '../components/fatButton';
import Button from 'components/button';
import _ from 'lodash';
import ReportForm from 'reports/reportForm';

class Reports extends Component {
  constructor() {
    super();
    this.state = {};
  }

  close = () => {
    const { history } = this.props;
    history.push('/reports');
  };
  componentDidMount() {
    const { inventory, actions } = this.props;
    if (!inventory.sales) {
      actions.fetchSales();
    }
  }
  render() {
    const list = [
      { model: 'e', make: 'chicken', buyer: 'fred', qty: '1', profit: '$6', log: 'a47' },
      { model: 'c', make: 'frogs', buyer: 'joe', qty: '1', profit: '$2', log: 'b22' },
      { model: 's', make: 'bangin', buyer: 'yoMom', qty: '1', profit: '$1', log: 'x91' },
      { model: 'b', make: 'blackhawk', buyer: 'fred', qty: '1', profit: '$6', log: 'a47' },
      { model: 'a', make: 'frogs', buyer: 'joe', qty: '1', profit: '$2', log: 'b22' },
      { model: 'd', make: 'bangin', buyer: 'yoMom', qty: '1', profit: '$1', log: 'x91' },
      { model: 'k', make: 'blackhawk', buyer: 'fred', qty: '1', profit: '$6', log: 'a47' },
      { model: 'p', make: 'frogs', buyer: 'joe', qty: '1', profit: '$2', log: 'b22' },
      { model: 'h', make: 'bangin', buyer: 'yoMom', qty: '1', profit: '$1', log: 'x91' },
      { model: 'f', make: 'blackhawk', buyer: 'fred', qty: '1', profit: '$6', log: 'a47' },
      { model: 'k', make: 'frogs', buyer: 'joe', qty: '1', profit: '$2', log: 'b22' },
      { model: 'i', make: 'bangin', buyer: 'yoMom', qty: '1', profit: '$1', log: 'x91' },
      { model: 'g', make: 'blackhawk', buyer: 'fred', qty: '1', profit: '$6', log: 'a47' },
      { model: 'o', make: 'frogs', buyer: 'joe', qty: '1', profit: '$2', log: 'b22' },
      { model: 'y', make: 'bangin', buyer: 'yoMom', qty: '1', profit: '$1', log: 'x91' },
      { model: 'h', make: 'blackhawk', buyer: 'fred', qty: '1', profit: '$6', log: 'a47' },
      { model: 'l', make: 'frogs', buyer: 'joe', qty: '1', profit: '$2', log: 'b22' },
      { model: 'f', make: 'bangin', buyer: 'yoMom', qty: '1', profit: '$1', log: 'x91' }
    ];
    const newList = _.orderBy(list, ['model'], ['desc']);

    const { inventory, close } = this.props;
    const list1 = _.filter(inventory.sales, (item) => {
      if (item.createdAt > 1548902225602) {
        return item;
      }
    });

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
          }}><ReportForm closeAction={close} />
        </div>
        <div
          style={{
            gridTemplateColumns: 'auto auto auto auto',
            gridColumn: '1 / 2',
            gridRow: '2',
            backgroundColor: 'white',
            borderRadius: '6px',
            display: 'flex'
          }}>
          <div style={{ flex: '1 0 auto' }}>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  width={650}
                  height={height}
                  headerHeight={20}
                  rowHeight={30}
                  rowCount={list.length}
                  rowGetter={({ index }) => newList[index]}>
                  <Column dataKey="model" label="model" width={100} />
                  <Column dataKey="make" label="make" width={100} />
                  <Column dataKey="buyer" label="buyer" width={100} />
                  <Column dataKey="qty" label="qty" width={100} />
                  <Column dataKey="profit" label="profit" width={100} />
                  <Column dataKey="log" label="log" width={100} />
                </Table>
              )}
            </AutoSizer>
          </div>
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
