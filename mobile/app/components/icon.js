import { TouchableHighlight, TouchableOpacity, Text } from 'react-native';
import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class MyIcon extends PureComponent {
  render() {
    const { onClick, onPress, primary, secondary, disabled, name, icon, color, size, backgroundColor='transparent', style = {},
      material, community, ...props } = this.props;
    let myColor = '#00305c';
    let mySize = size || 30;
    if (primary) {
      myColor = '#00B381';
    } if (secondary) {
      myColor = '#D01947';
    }
    if (disabled) {
      myColor = 'rgba(0,0,0,0.4)';
    }
    if (color || style.color) {
      myColor = color || style.color;
    }
    let myOnPress;
    if (!disabled) {
      myOnPress = onClick || onPress;
    }
    let myIcon;
    if (material) {
      myIcon = <MaterialCommunityIcon name={(icon || name).replace('_', '-')} backgroundColor={backgroundColor} color={myColor}
                             size={mySize}
                             style={style} {...props} />;
    } else {
      myIcon = <Icon name={icon || name} backgroundColor={backgroundColor} color={myColor} size={mySize}
                   style={style} {...props} />;
    }
    if (myOnPress) {
      return (
        <TouchableOpacity onPress={myOnPress} >
          {myIcon}
        </TouchableOpacity>
      );
    } else {
      return myIcon;
    }
  }
}