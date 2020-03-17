import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
 
export default class WebviewDemo extends Component {
  render() {
    return (
      <WebView source={{ uri: 'http://172.18.40.235:8010/home/addInfo?jumpToBase=true' }} />
    );
  }
}