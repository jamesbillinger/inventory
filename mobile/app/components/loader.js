import { View, Text, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';

export default class Loader extends Component {
  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <View style={{position:'absolute', top:0, right:0, bottom:0, left:0, alignItems:'center', justifyContent:'center',
                      zIndex:100, backgroundColor:'rgba(0,0,0,0.1)'}}>
          <ActivityIndicator animating={!!loading} color='#00305c'/>
        </View>
      );
    } else {
      return <View />;
    }
  }
}