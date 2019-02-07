import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import moment from 'moment';
import { AutoSizer, Table, Column } from 'react-virtualized';
import Modal from 'components/modal';
import FormInput from 'components/formInput';
import FatButton from '../components/fatButton';
import Button from 'components/button';
import _ from 'lodash';
import ReportForm from 'reports/reportForm';
import FormDate from 'components/formDate';
import SaleList from './saleList';

class Reports extends Component {
  state = {
    begin: moment().startOf('day')._d,

    end: moment().endOf('day')._d
  };

  componentDidMount() {
    const { inventory, actions } = this.props;
    if (!inventory.sales) {
      actions.fetchSales();
    }
  }

  close = () => {
    const { history } = this.props;
    history.push('/reports');
  };
  beginChange = (val) => {
    let newState = {
      begin: val
    };
    if (moment(val).isSameOrAfter(moment(this.state.end))) {
      newState.end = moment(val).endOf('day')._d;
    }
    this.setState(newState);
  };

  endChange = (val) => {
    this.setState({
      end: val
    });
  };

  render() {
    const { inventory, close } = this.props;
    const { begin, end } = this.state;
    let list1 = _.filter(inventory.sales, (item) => {
      if (item.createdAt >= begin && item.createdAt <= end) {
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
          }}>
          <FormDate label="Report Begin" input={{ value: begin, onChange: this.beginChange }} />
          <FormDate label="Report End" input={{ value: end, onChange: this.endChange }} />
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
                  rowCount={list1.length}
                  rowGetter={({ index }) => list1[index]}>
                  <Column dataKey="_id" label="model" width={100} />
                  <Column dataKey="createdAt" label="make" width={100} />
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
          <AutoSizer>{({ height, width }) => <SaleList list={list1} height={height} width={width} />}</AutoSizer>
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
