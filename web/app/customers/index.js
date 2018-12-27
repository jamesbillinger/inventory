import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import Button from 'components/button';
import { Switch, Route, Link } from 'react-router-dom';
import CustomerDetail from './customerDetail';
import { AutoSizer, Table, Column } from 'react-virtualized';
import Dialog from '@material-ui/core/Dialog';
import moment from 'moment';

class Customers extends Component {
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

  render() {
    const { inventory, match } = this.props;
    console.log(inventory.customers);
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
          <Button>search</Button>
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
                rowGetter={({ index }) => (inventory.customers || [])[index]}
                rowCount={(inventory.customers || []).length || 0}
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
        <Dialog modal={false} open={!!match.params.customerID} onRequestClose={this.close} autoScrollBodyContent={true}>
          {match.params.customerID && <CustomerDetail customerID={match.params.customerID} close={this.close} />}
        </Dialog>
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
