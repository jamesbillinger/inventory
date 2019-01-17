import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import Button from 'components/button';
import { Switch, Route, Link } from 'react-router-dom';
import InventoryDetail from 'inventory/inventoryDetail';
import { AutoSizer, Table, Column } from 'react-virtualized';
import Modal from 'components/modal';
import FormInput from 'components/formInput';
import filter from 'lodash/filter';

class Inventory extends Component {
  constructor() {
    super();
    this.state = {};
    this._rowClick = ::this.rowClick;
  }

  rowClick({ event, rowData }) {
    const { history } = this.props;
    history.push('/inventory/' + rowData._id);
  }

  close = () => {
    const { history } = this.props;
    history.push('/inventory');
  };

  searchChange = (e) => {
    const { inventory } = this.props;
    this.setState({
      search: e.target.value,
      items: e.target.value
        ? filter(inventory.items || [], (item) => {
            let s = e.target.value.toLowerCase();
            let ret = false;
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
    const { search, items } = this.state;
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
            <Link to="/inventory/_new">
              <Button>Add Inventory</Button>
            </Link>
          </div>
        </div>
        <div style={{ flex: '1 1 auto' }}>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                height={height}
                rowHeight={32}
                rowGetter={({ index }) => (items || inventory.items || [])[index]}
                rowCount={(items || inventory.items || []).length || 0}
                headerHeight={32}
                onRowClick={this._rowClick}
                rowStyle={{ cursor: 'pointer' }}
                width={width}>
                <Column label="Qty" dataKey="quantity" flexGrow={1} width={5} />
                <Column label="Calibre" dataKey="calibre" flexGrow={1} width={40} />
                <Column label="Category" dataKey="category" flexGrow={1} width={80} />
                <Column label="Make" dataKey="make" flexGrow={1} width={50} />
                <Column label="Model" dataKey="model" flexGrow={1} width={50} />
                <Column
                  label="Sale Price"
                  dataKey="salePrice"
                  flexGrow={1}
                  width={80}
                  cellRenderer={({ cellData }) => (
                    <div>
                      {cellData
                        ? cellData.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          })
                        : cellData}
                    </div>
                  )}
                />
              </Table>
            )}
          </AutoSizer>
        </div>
        <Modal show={!!match.params.itemID} closeAction={this.close} hideFooter={true}>
          {match.params.itemID && <InventoryDetail itemID={match.params.itemID} close={this.close} />}
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
)(Inventory);
