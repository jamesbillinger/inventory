import { View, TextInput, Text, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { Component } from 'react';

export default class InputWrapper extends Component {
  constructor() {
    super();
    this.state = {
      scale: new Animated.Value(0),
      fontSize: new Animated.Value(15),
      width: new Animated.Value(0)
    };
    this._layout = ::this.layout;
  }

  componentDidMount() {
    const { hasValue, focused } = this.props;
    if (hasValue || focused) {
      this.animateLabel(true, 0);
    }
    /*if (focused) {
      this.animateUnderline(true, 0);
    }*/
  }

  componentDidUpdate(prevProps, prevState) {
    const { hasValue, focused } = this.props;
    let p1 = focused || !!hasValue;
    let p2 = prevProps.focused || !!prevProps.hasValue;
    if (p1 && !p2) {
      this.animateLabel(true, 100);
    } else if (p2 && !p1) {
      this.animateLabel(false, 100);
    }
    if (focused && !prevProps.focused) {
      this.animateUnderline(true, 100);
    } else if (prevProps.focused && !focused) {
      this.animateUnderline(false, 100);
    }
  }

  animateLabel(active, duration) {
    const { scale, fontSize } = this.state;
    Animated.timing(scale, {
      toValue: active ? -28 : 0,
      duration
    }).start();
    Animated.timing(fontSize, {
      toValue: active ? 15 * 0.75 : 15,
      duration
    }).start();
  }

  animateUnderline(active, duration) {
    const { width } = this.state;
    Animated.timing(width, {
      toValue: active ? this._width : 0,
      duration
    }).start();
  }

  layout(e) {
    const { focused, onLayout } = this.props;
    let { x, y, width, height } = e.nativeEvent.layout;
    this._width = width;
    if (focused) {
      this.animateUnderline(true, 0);
    }
    onLayout && onLayout(e);
  }

  render() {
    const { label, style, hasValue, focused, children, labelClick, labelStyle, lineStyle} = this.props;
    const { scale, fontSize, width } = this.state;
    let viewStyle = {
      marginLeft:10,
      marginRight:10,
      marginBottom:10,
      paddingTop:20,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.1)',
      position:'relative',
      justifyContent:'flex-end'
    };
    if (style && typeof style === 'object') {
      Object.assign(viewStyle, style);
    }
    let myLabelStyle = {
      position:'absolute',
      top:30,
      left:0,
      fontWeight:'500',
      color:'rgba(0,0,0,0.4)',
      fontSize: fontSize,
      transform: [
        {translateY: scale}
      ],
      zIndex:1
    };
    if (!hasValue && !focused) {
      delete myLabelStyle.top;
      myLabelStyle.bottom = 6;
    }
    if (focused) {
      myLabelStyle.color = '#00305c';
    }
    Object.assign(myLabelStyle, labelStyle);

    return (
      <View style={viewStyle} onLayout={this._layout}>
        {children}
        {label
          ? <TouchableWithoutFeedback onPress={labelClick}>
              <Animated.Text style={myLabelStyle}>{label}</Animated.Text>
            </TouchableWithoutFeedback>
          : null
        }
        <Animated.View style={Object.assign({position:'absolute', bottom:0, backgroundColor:'#00305c', height:2, width, zIndex:1}, lineStyle)}>
        </Animated.View>
      </View>
    );
  }
}