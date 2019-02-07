import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import moment from 'moment';
import { AutoSizer, Table, Column, List } from 'react-virtualized';
import Modal from 'components/modal';
import FormInput from 'components/formInput';
import FatButton from '../components/fatButton';
import Button from 'components/button';
import _ from 'lodash';
import ReportForm from 'reports/reportForm';
import FormDate from 'components/formDate';
import SaleListItem from './saleListItem';

class Reports extends Component {
  state = {
    list: [],
    begin: moment().startOf('day')._d,
    end: moment().endOf('day')._d
  };

  componentDidMount() {
    const { inventory, actions } = this.props;
    if (!inventory.sales) {
      actions.fetchSales();
    } else {
      this.filterList(this.state.begin, this.state.end);
    }
    if (!inventory.users) {
      actions.fetchUsers();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { inventory } = this.props;
    if (inventory.sales && !prevProps.inventory.sales) {
      this.filterList(this.state.begin, this.state.end);
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
    newState.list = this.filterList(val, this.state.end);
    this.setState(newState);
  };

  endChange = (val) => {
    this.setState({
      end: val,
      list: this.filterList(this.state.begin, val)
    });
  };

  filterList(begin, end) {
    const { inventory } = this.props;
    return _.filter(inventory.sales, (item) => {
      if (item.createdAt >= begin && item.createdAt <= end) {
        return item;
      }
    });
  }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { list } = this.state;
    let sale = list[index];
    if (sale) {
      return (
        <div key={key} style={style}>
          {(sale.items || []).map((item, i) => (
            <SaleListItem key={i} index={index} item={item} sale={sale} />
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  getRowHeight = ({ index }) => {
    const { list } = this.state;
    return ((list[index] || {}).items || []).length * 24;
  };

  test(begin, end, number) {
    console.log('hey', begin, end, number);
  }

  render() {
    const { begin, end, list } = this.state;
    let myTest = this.test.bind(this, begin, end);
    return (
      <div
        style={{
          flex: '0 0 100%',
          display: 'grid',
          gridTemplateColumns: '1fr auto ',
          gridTemplateRows: 'auto 1fr',
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
            gridColumn: '1/4',
            gridRow: '2',
            backgroundColor: 'white',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <div
            style={{ flex: '0 0 auto', display: 'flex', height: '24px', overflow: 'hidden' }}
            className="ReactVirtualized__Table__headerRow">
            <div
              style={{ flex: '0 1 100px', justifyContent: 'flex-start' }}
              className="ReactVirtualized__Table__headerColumn">
              Date
            </div>
            <div
              style={{ flex: '0 1 200px', justifyContent: 'flex-start' }}
              className="ReactVirtualized__Table__headerColumn">
              Sold By
            </div>
            <div
              style={{ flex: '1 1 150px', justifyContent: 'flex-start' }}
              className="ReactVirtualized__Table__headerColumn">
              Model
            </div>
          </div>
          <div style={{flex:'0 0 auto'}}>
            <button onClick={myTest.bind(this, 1)}>test1</button>
            <button onClick={myTest.bind(this, 2)}>test2</button>
          </div>
          <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  width={width}
                  height={height - 24}
                  rowCount={list.length}
                  rowHeight={this.getRowHeight}
                  rowRenderer={this.rowRenderer}
                />
              )}
            </AutoSizer>
          </div>
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
