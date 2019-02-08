import { View, TextInput, Text, Linking, NativeModules, TouchableOpacity, Platform, Image, Dimensions } from 'react-native';
import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
let DocumentController = NativeModules.DocumentController;
import * as mime from 'react-native-mime-types';

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};


export default class MyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
      maxWidth: Dimensions.get('window').width - ((props.leftMargin || 20) * 2)
    };
    this._click = ::this.click;
  }

  componentDidMount() {
    this.loadContent();
  }

  loadContent() {
    const { maxWidth } = this.state;
    let source = this.props.source;
    if (source.indexOf('http') === -1) {
      source = global.BACKEND_URL.replace('/api/','') + source;
    } else if (source.indexOf('/api') === 0) {
      source = source.replace('/api/', global.BACKEND_URL);
    }
    let sp = source.split('/');
    let originalname = decodeURI(sp[sp.length - 1]).replaceAll(' ','_');
    if (Platform.OS === 'ios') {
      let dirs = RNFetchBlob.fs.dirs;
      RNFetchBlob
        .config({
          fileCache: true,
          path: dirs.CacheDir + '/' + originalname + '.png'
        })
        .fetch('GET',source, {
          ...global.HEADER_PROPS
        })
        .then((res) => {
          let p = res && res.path();
          if (p) {
            Image.getSize(p, (width, height) => {
              let ratio = 1;
              // consider max width
              if (width * ratio > maxWidth) {
                ratio = (maxWidth * ratio) / (width * ratio);
              }
              this.setState({
                path: p,
                width: width * ratio,
                height: height * ratio
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //figure out mime type!
      let mimeType = mime.lookup(originalname) || 'application/octet-stream';
      RNFetchBlob.config({
        addAndroidDownloads : {
          useDownloadManager : true,
          title : originalname,
          description : 'Downloading File',
          mime : mimeType,
          mediaScannable : true,
          notification : true,
        }
      })
        .fetch('GET', source, {
          ...global.HEADER_PROPS
        })
        .then((res) => {
          let p = res.path();
          Image.getSize(p, (width, height) => {
            let ratio = 1;
            // consider max width
            if (width * ratio > maxWidth) {
              ratio = (maxWidth * ratio) / (width * ratio);
            }
            this.setState({
              path: p,
              type: value.type,
              width: width * ratio,
              height: height * ratio
            });
          });
        })
    }
  }

  click() {
    const { path, type } = this.state;
    if (Platform.OS === 'ios') {
      DocumentController.open(path);
    } else {
      const android = RNFetchBlob.android;
      android.actionViewIntent(path, type)
    }
  }

  imageError = (e) => {
    console.log(e);
  };

  render() {
    const { label, style } = this.props;
    const { width, height, path } = this.state;
    let source = this.props.source;
    if (source.indexOf('http') === -1) {
      source = global.BACKEND_URL.replace('/api/','') + source;
    } else if (source.indexOf('/api') === 0) {
      source = source.replace('/api/', global.BACKEND_URL);
    }
    let myStyle = Object.assign({
      marginBottom:5,
      marginTop:2,
      width,
      height
    }, style);
    return (
      <TouchableOpacity onPress={this._click}>
        {/*<FastImage ref={k => this._image = k} source={{uri: source, headers: global.HEADER_PROPS }} style={myStyle} onLoadEnd={this._loadEnd} />*/}
        <Image source={{ uri: path }} style={myStyle} onError={this.imageError} />
      </TouchableOpacity>
    );
  }
}