import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class InventoryFilter extends Component {
  render() {
    return (
      <div
        style={{
          flex: '1 1 auto',
          backgroundColor: 'white',
          margin: '15px 0 15px 15px',
          borderRadius: '6px',
          width: '230px',
          padding: '10px'
        }}>
        <div>Inventory Filter</div>
        <Button label="filter cat" />
      </div>
    );
  }
}
