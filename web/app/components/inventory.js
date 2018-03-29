import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import RaisedButton from 'material-ui/RaisedButton';
import {Switch, Route, Link} from 'react-router-dom';
import InventoryDetail from './inventoryDetail';
import {AutoSizer, Table, Column} from 'react-virtualized';

class Inventory extends Component {
  componentDidMount() {
    const {actions, inventory} = this.props;
    if (!inventory.items && !this._fetched) {
      this._fetched = true;
      actions.fetchItems();
    }
  }

  render() {
    const { inventory } = this.props;
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
            <Link to='/inventory/_new'>
              <RaisedButton>
                Add Inventory
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
                rowGetter={({ index }) => (inventory.items || [])[index]}
                rowCount={(inventory.items || []).length || 0}
                headerHeight={32}
                width={width}>
                <Column label='Calibre' dataKey='Calibre' flexGrow={1} width={40} />
                <Column label='Category' dataKey='Category' flexGrow={1} width={80} />
                <Column label='Make' dataKey='Make' flexGrow={1} width={50} />
                <Column label='Model' dataKey='Model' flexGrow={1} width={50} />
                <Column label='Owner' dataKey='Owner' flexGrow={1} width={80} />
                <Column label='Purch Price' dataKey='Purchase Price' flexGrow={1} width={80} />
                <Column label='Sale Price' dataKey='Sale Price' flexGrow={1} width={80} />
              </Table>
            )}
          </AutoSizer>
        </div>
        <Switch>
          <Route path='/inventory/:inventoryID' component={InventoryDetail}/>
        </Switch>
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
)(Inventory)