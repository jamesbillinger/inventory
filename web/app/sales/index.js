import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import Button from 'components/button';
import { Switch, Route, Link } from 'react-router-dom';
import SaleDetail from './saleDetail';
import { AutoSizer, Table, Column } from 'react-virtualized';
import Dialog from '@material-ui/core/Dialog';
import moment from 'moment';
import FormInput from 'components/formInput';
import filter from 'lodash/filter';

class Sales extends Component {
  state = {};

  componentDidMount() {
    const { inventory, actions } = this.props;
    if (!inventory.sales) {
      actions.fetchSales();
    }
  }

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

  rowClick = ({ event, rowData }) => {
    const { history } = this.props;
    history.push('/sales/' + rowData._id);
  };

  close = () => {
    const { history } = this.props;
    history.push('/sales');
  };

  search = (e, v) => {
    if ((v || '') !== (this.state.search || '')) {
      this.setState({
        search: v
      });
    }
  };

  render() {
    const { inventory, match } = this.props;
    const { searchResults, search } = this.state;
    let data = searchResults ? searchResults : inventory.sales || [];
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
          <FormInput input={{ value: search, onChange: this.search }} placeholder="Search Sales" />
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
                rowGetter={({ index }) => data[index]}
                rowCount={data.length || 0}
                headerHeight={32}
                onRowClick={this.rowClick}
                rowStyle={{ cursor: 'pointer' }}
                width={width}>
                <Column
                  label="Date"
                  dataKey="createdAt"
                  flexGrow={1}
                  width={40}
                  cellRenderer={({ cellData }) => <div>{cellData && moment(cellData).format('M/D/YY h:mm a')}</div>}
                />
                <Column label="Total" dataKey="total" flexGrow={1} width={80} />
                <Column label="Tax Rate" dataKey="taxRate" flexGrow={1} width={80} />
                <Column label="Customer" dataKey="customer" flexGrow={1} width={80} />
              </Table>
            )}
          </AutoSizer>
        </div>
        <Dialog modal={false} open={!!match.params.saleID} onRequestClose={this.close} autoScrollBodyContent={true}>
          {match.params.saleID && <SaleDetail saleID={match.params.saleID} close={this.close} />}
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
)(Sales);
