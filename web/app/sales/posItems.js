import React, { Component } from 'react';
import POSItem from './posItem';
import { Fields } from 'redux-form';

export default class POSItems extends Component {
  render() {
    const { fields, meta, ...props } = this.props;
    console.log(this.props);
    return (
      <div>
        {(fields || []).map((f, fi) => (
          <Fields
            key={f}
            names={[f + '.item', f + '.quantity', f + '.price', f + '.totalPrice']}
            component={POSItem}
            index={fi}
            removeItem={fields.remove.bind(this, fi)}
            {...props}
          />
        ))}
      </div>
    );
  }
}
