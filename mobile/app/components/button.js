import { TouchableHighlight, Text, Linking } from 'react-native';
import React, { PureComponent } from 'react';

export default class Button extends PureComponent {
  openURL() {
    const { url } = this.props;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  render() {
    const { onClick, onPress, url, children, primary, secondary, style, textStyle, disabled } = this.props;
    let myTextStyle = {
      fontSize:16,
      color:'#00305c'
    };
    if (primary) {
      myTextStyle.color = '#00B381';
    } if (secondary) {
      myTextStyle.color = '#D01947';
    }
    if (disabled) {
      myTextStyle.color = 'rgba(0,0,0,0.4)';
    }
    Object.assign(myTextStyle, textStyle);
    let myStyle = Object.assign({}, style);
    let myOnPress = {};
    if (!disabled) {
      myOnPress = {
        onPress: onClick || onPress
      };
      if (url) {
        myOnPress.onPress = ::this.openURL;
      }
    }
    return (
      <TouchableHighlight {...myOnPress} style={myStyle} underlayColor='transparent'>
        <Text style={myTextStyle}>{children}</Text>
      </TouchableHighlight>
    );
  }
}