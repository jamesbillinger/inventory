import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class LeftMenu extends Component {
  render() {
    return (
      <div style={{gridRow:'2', gridColumn:'1', margin:'20px',border:'1px solid black', padding:'10px',borderRadius:'10px',backgroundColor:'#eeee',borderColor:'#e3ee'}}>
        <div>Left Middle</div>
        <RaisedButton label="a button yo"  />
      </div>
    )
  }
}