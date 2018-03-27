import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Switch, Route, Link } from 'react-router-dom';
import InventoryDetail from './InventoryDetail';

export default class Inventory extends Component {
  render() {
    return (
      <div style={{flex:'1 1 auto', backgroundColor:'white', borderRadius:'6px', padding:'10px', display:'flex', flexDirection:'column'}}>
        <div style={{flex:'0 0 auto', display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div>search</div>
          <div>
            <Link to='/inventory/_new'>
            <RaisedButton>
              Add Inventory
            </RaisedButton>
            </Link>
          </div>
        </div>
        <div style={{flex:'1 1 auto'}}>
        </div>
        <Switch>
          <Route path='/inventory/:inventoryID' component={InventoryDetail}/>
        </Switch>
      </div>
    )
  }
}