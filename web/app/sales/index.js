import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import Button from 'components/button';
import { Switch, Route, Link } from 'react-router-dom';
import SaleDetail from './saleDetail';
import { AutoSizer, Table, Column } from 'react-virtualized';
import Modal from 'components/modal';
import moment from 'moment';
import FormInput from 'components/formInput';
import filter from 'lodash/filter';
import find from 'lodash/find';
import GridCustomer from 'components/gridCustomer';
import { filterDonuts } from 'shared/utils';
import findIndex from 'lodash/findIndex';


class Sales extends Component {
  constructor() {
    super();
    this.state = {};
    this.rowClick = ::this.rowClick;
  }
  componentDidMount() {
    const { inventory, actions } = this.props;
    if (!inventory.sales) {
      actions.fetchSales();
    }
  }
/*
  componentDidUpdate(prevProps, prevState) {
    const { inventory } = this.props;
    const { search } = this.state;
    if ((search || '') !== (prevState.search || '')) {
      this.setState({
        searchResults: search
          ? filter(inventory.sales || [], (s) => {
              return (s.taxRate || '').toString().indexOf(search) > -1;
            })
          : undefined
      });
    }
  }
*/
  rowClick = ({ event, rowData }) => {
    const { history } = this.props;
    history.push('/sales/' + rowData._id);
  };

  searchChange = (e) => {
    const { inventory } = this.props;
    if (e.target.value) {
      let search = e.target.value.toLowerCase();
      let matchingItems = filterDonuts(inventory.items, search);
      this.setState({
        search: e.target.value,
        sales: filterDonuts(inventory.sales, search, (s) => {
          return findIndex(s.items || [], (i) => {
            return findIndex(matchingItems, {_id:i.item}) > -1;
          }) > -1;
        })
      })
    } else {
      this.setState({
        search: e.target.value,
        sales: undefined
      })
    }
  };

  close = () => {
    const { history } = this.props;
    history.push('/sales');
  };

  /*
  search = (e, v) => {

    if ((v || '') !== (this.state.search || '')) {
      this.setState({
        search: v
      });
    }
  };
*/

  render() {
    const { inventory, match } = this.props;
    const { search, sales} = this.state;

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
          <FormInput input={{ value: search, onChange: this.searchChange }} placeholder="Search Sales" />
          <div>
            <Link to="/">
              <Button>Add Sale</Button>
            </Link>
          </div>
        </div>
        <div style={{ flex: '1 1 auto' }}>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                height={height}
                rowHeight={32}
                rowGetter={({ index }) => (sales || inventory.sales || [])[index]}
                rowCount={(sales || inventory.sales || []).length || 0}
                headerHeight={32}
                onRowClick={this.rowClick}
                rowStyle={{ cursor: 'pointer' }}
                width={width}>
                <Column
                  label="Date"
                  dataKey="createdAt"
                  flexGrow={0}
                  width={150}
                  cellRenderer={({ cellData }) => <div>{cellData && moment(cellData).format('M/D/YY h:mm a')}</div>}
                />
                <Column
                  label="Customer"
                  dataKey="customer"
                  flexGrow={0}
                  width={200}
                  cellRenderer={({ cellData }) => <GridCustomer value={cellData} />}
                />
                <Column
                  label="Total"
                  dataKey="items"
                  flexGrow={0}
                  width={120}
                  cellRenderer={({ cellData }) => {
                    let total = (cellData || []).reduce((t, item) => {
                      return t + parseFloat(item.totalPrice || 0);
                    }, 0);
                    return (
                      <div style={{ textAlign: 'right', paddingRight: '20px' }}>
                        {total.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        })}
                      </div>
                    );
                  }}
                />
              </Table>
            )}
          </AutoSizer>
        </div>
        <Modal show={!!match.params.saleID} closeAction={this.close}>
          {match.params.saleID ? <SaleDetail saleID={match.params.saleID} close={this.close} /> : <div />}
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
)(Sales);
