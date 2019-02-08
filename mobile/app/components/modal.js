import {
  View,
  Text,
  Modal,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView
} from 'react-native';
import React, { Component } from 'react';
import Button from 'components/button';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : undefined;
const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

export default class MyModal extends Component {
  render() {
    const {
      children,
      leftAction,
      leftText = 'Cancel',
      leftComponent,
      rightAction,
      rightText,
      rightComponent,
      rightDisabled,
      submitAction,
      submitDisabled,
      submitText = 'Save',
      title,
      getTextInputRefs,
      closeAction,
      modalChild,
      animationType = 'slide',
      show = true,
      ...props
    } = this.props;
    let left;
    if (leftComponent) {
      left = leftComponent;
    } else if (leftAction) {
      left = (
        <Button secondary={true} onClick={leftAction} style={{ paddingHorizontal: 15 }}>
          {leftText}
        </Button>
      );
    }
    let right = <View style={{ width: 50 }} />;
    if (rightComponent) {
      right = rightComponent;
    } else if (rightAction) {
      right = (
        <Button primary={true} onClick={rightAction} style={{ paddingHorizontal: 15 }} disabled={rightDisabled}>
          {rightText}
        </Button>
      );
    } else if (submitAction) {
      right = (
        <Button primary={true} onClick={submitAction} style={{ paddingHorizontal: 15 }} disabled={submitDisabled}>
          {submitText}
        </Button>
      );
      if (!left) {
        left = (
          <Button secondary={true} onClick={closeAction} style={{ paddingHorizontal: 15 }}>
            Cancel
          </Button>
        );
      }
    } else if (closeAction) {
      right = (
        <Button secondary={true} onClick={closeAction} style={{ paddingHorizontal: 15 }}>
          Close
        </Button>
      );
    }
    let ret;
    if (getTextInputRefs) {
      ret = (
        <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 }} keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
        </KeyboardAvoidingView>
      );
    } else {
      ret = <View style={{ flex: 1 }}>{children}</View>;
    }
    return (
      <Modal visible={show} animationType={animationType} onRequestClose={closeAction} {...props}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex:1, backgroundColor:'rgb(250,250,250)'}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgb(250,250,250)',
              //paddingTop: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              height: 60,
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            {left || <View style={{ minWidth: 60 }} />}
            <View>
              <Text style={{ color: '#00305C', fontSize: 16 }}>{title}</Text>
            </View>
            {right}
          </View>
          {ret}
          {modalChild}
        </SafeAreaView>
      </Modal>
    );
  }
}
