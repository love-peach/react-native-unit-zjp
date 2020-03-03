import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import Theme from '../../themes/Theme';

/**
 * @paddingOffset 内部 cell 左右间距
 * @borderOffset 下滑线距离左边间距
 * @style 容器样式
 */

export default class Mask extends Component {
  static propTypes = {
    transparent: PropTypes.bool,
  }

  render() {
    const { transparent } = this.props;
    return (
      <View style={StyleSheet.flatten([styles.mask, transparent ? styles.mask_transparent : ''])}><Text>12122</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: Theme.mask_bg,
    borderWidth: 10,
  },
  mask_transparent: {
    // backgroundColor: 'transparent',
    backgroundColor: 'red',
  }
});
