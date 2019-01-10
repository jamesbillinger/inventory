import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import Button from 'components/button';
import { Switch, Route, Link } from 'react-router-dom';
import CustomerDetail from './customerDetail';
import { AutoSizer, Table, Column } from 'react-virtualized';
import Modal from 'components/modal';
import moment from 'moment';
import filter from 'lodash/filter';
import FormInput from 'components/formInput';

class Customers extends Component {
  constructor() {
    super();
    this.state = {};
    this.rowClick = ::this.rowClick;
  }

  componentDidMount() {
    const { inventory, actions } = this.props;
    if (!inventory.customers) {
      actions.fetchCustomers();
    }
  }

  rowClick = ({ event, rowData }) => {
    const { history } = this.props;
    history.push('/customers/' + rowData._id);
  };

  close = () => {
    const { history } = this.props;
    history.push('/customers');
  };
  searchChange = (e) => {
    const { inventory } = this.props;
    this.setState({
      search: e.target.value,
      customers: e.target.value
        ? filter(inventory.customers || [], (item) => {
            let s = e.target.value.toLowerCase();
            let ret = false;
            console.log(item);
            Object.values(item).map((k) => {
              if (typeof k === 'string' && k.toLowerCase().indexOf(s) > -1) {
                ret = true;
              }
            });
            return ret;
          })
        : undefined
    });
  };

  render() {
    const { inventory, match } = this.props;
    const { search, customers } = this.state;
    return (
      <div
        style={{
          flex: '1 1 auto',
          backgroundColor: 'white',
          borderRadius: '6px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <div
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <FormInput placeholder={'search'} input={{ value: search, onChange: this.searchChange }} />

          <div>
            <Link to="/customers/_new">
              <Button>Add Customer</Button>
            </Link>
          </div>
        </div>
        <div style={{ flex: '1 1 auto' }}>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                height={height}
                rowHeight={32}
                rowGetter={({ index }) => (customers || inventory.customers || [])[index]}
                rowCount={(customers || inventory.customers || []).length || 0}
                headerHeight={32}
                onRowClick={this.rowClick}
                rowStyle={{ cursor: 'pointer' }}
                width={width}>
                <Column label="Name" dataKey="name" flexGrow={0} width={200} />
                <Column label="Phone" dataKey="phone" flexGrow={1} width={80} />
              </Table>
            )}
          </AutoSizer>
        </div>
        <Modal show={!!match.params.customerID} closeAction={this.close}>
          {match.params.customerID && <CustomerDetail customerID={match.params.customerID} close={this.close} />}
        </Modal>
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
)(Customers);
