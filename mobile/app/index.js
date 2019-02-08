import { View, Text } from 'react-native';
import React, { Component } from 'react';

export default class Index extends Component {
  render() {
    return (
      <View style={{flex:1, jusifyContent:'center'}}>
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Text>Hello</Text>
        </View>
      </View>
    )
  }
}