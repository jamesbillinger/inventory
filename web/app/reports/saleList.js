import React, { Component } from 'react';
import { List } from 'react-virtualized';

export default class SaleList extends Component {
  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { list } = this.props;
    return (
      <div key={key} style={{ display: 'flex' }}>
        <div style={{ flex: '1 0 auto' }}>
          <div style={{ justifyContent: 'flex-start' }}>{list[index].createdAt}</div>
          <div style={{ justifyContent: 'flex-end' }}>{list[index].updatedBy}</div>
        </div>
      </div>
    );
  };

  render() {
    const { list, width, height } = this.props;
    return <List width={width} height={height} rowCount={list.length} rowHeight={20} rowRenderer={this.rowRenderer} />;
  }
}
