import React, { Component } from 'react';
import moment from 'moment';

export default class GridDate extends Component {
  render() {
    const { time, data, cellData, format, style } = this.props;
    let myData = data || cellData;
    if (myData) {
      return (
        <div style={Object.assign({ display: 'inline-block' }, style)}>
          {time ? moment(myData).calendar() : moment(myData).format(format || 'M/D/YYYY')}
        </div>
      );
    } else {
      return <div />;
    }
  }
}
