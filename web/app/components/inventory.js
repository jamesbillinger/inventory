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
    if (!inventory.items) {
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
          <div>search</div>
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
                rowGetter={({index}) => (inventory.items || [])[index]}
                rowCount={(inventory.items || []).length}
                width={width}>
                <Column dataKey='name' flexGrow={1} width={80} />
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