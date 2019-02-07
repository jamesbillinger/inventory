import React, { Component } from 'react';
import { List } from 'react-virtualized';



export default class SaleList extends Component {
  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { list } = this.props;
    return (
      <div key={key} style={style}>
        {list[index].createdAt}
      </div>
    );
  };

  render() {
    const { list } = this.props;
    return <List width={300} height={300} rowCount={list.length} rowHeight={20} rowRenderer={this.rowRenderer} />;
  }
}
