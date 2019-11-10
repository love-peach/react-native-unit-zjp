import React, { PureComponent } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export default class Mask extends PureComponent {
  // 接收的属性
  // TODO: 接收属性校验
  static propTypes = {};

  static defaultProps = {
    maskBackgroundColor: 'rgba(0, 0, 0, .4)',
  };

  buildMaskStyle() {
    const { maskBackgroundColor, maskStyle } = this.props;
    return StyleSheet.flatten([
      styles.fullScreen,
      {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: maskBackgroundColor,
      },
      maskStyle,
      maskStyle,
    ]);
  }

  render() {
    const { onMaskPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onMaskPress}>
        <View style={this.buildMaskStyle()} />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
