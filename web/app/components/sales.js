import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import RaisedButton from 'material-ui/RaisedButton';
import {Switch, Route, Link} from 'react-router-dom';
import SaleDetail from './saleDetail';
import {AutoSizer, Table, Column} from 'react-virtualized';
import Dialog from 'material-ui/Dialog';

class Sales extends Component {
  rowClick = ({event, rowData}) => {
    const { history } = this.props;
    history.push('/sales/' + rowData._id);
  };

  close = () => {
    const { history } = this.props;
    history.push('/sales');
  };

  render() {
    const { inventory, match } = this.props;
    return (
      <div style={{
        flex: '1 1 auto',
        backgroundColor: 'white',
        borderRadius: '6px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <RaisedButton>
            search
          </RaisedButton>
          <div>
            <Link to='/sales/_new'>
              <RaisedButton>
                Add Sale
              </RaisedButton>
            </Link>
          </div>
        </div>
        <div style={{flex: '1 1 auto'}}>
          <AutoSizer>
            {({height, width}) => (
              <Table
                height={height}
                rowHeight={32}
                rowGetter={({ index }) => (inventory.sales || [])[index]}
                rowCount={(inventory.sales || []).length || 0}
                headerHeight={32}
                onRowClick={this._rowClick}
                rowStyle={{cursor:'pointer'}}
                width={width}>
                <Column label='Date' dataKey='createdAt' flexGrow={1} width={40} />
                <Column label='Total' dataKey='total' flexGrow={1} width={80} />
                <Column label='Tax Rate' dataKey='taxRate' flexGrow={1} width={80} />
              </Table>
            )}
          </AutoSizer>
        </div>
        <Dialog modal={false} open={!!match.params.saleID} onRequestClose={this.close} autoScrollBodyContent={true}>
          {match.params.saleID && <SaleDetail saleID={match.params.saleID} close={this.close} />}
        </Dialog>
      </div>
    )
  }
}
export default connect(
  (state) => ({
    inventory: state.inventory
  }),
  (dispatch) => ({
    actions: bindActionCreators({...Actions}, dispatch)
  })
)(Sales)