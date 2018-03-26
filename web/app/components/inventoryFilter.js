import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class InventoryFilter extends Component {
  render() {
    return (
      <div style={{flex:'1 1 auto', backgroundColor:'white', padding:'10px', borderRadius:'6px', width:'230px'}}>
        <div>Inventory Filter</div>
        <RaisedButton label="filter button"  />
      </div>
    )
  }
}