import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

const deviceWidth = Dimensions.get('window').width;

/**
 * @width 宽度
 * @height 高度
 * @margin 外边距
 * @padding 内边距
 * @backgroundColor 背景色
 * @borderRadius 圆角
 * @shadow 是否有阴影
 * @shadowColor 阴影颜色
 * @shadowOpt 阴影设置
 */

export default class LoanPage extends PureComponent {
  // 接收的属性
  // TODO: 接收属性校验
  static propTypes = {};

  static defaultProps = {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#092460',
    shadowBorder: 10,
    shadowOpacity: 0.3,
  };

  constructor(props) {
    super(props);
    this.minWidth = deviceWidth - this.props.margin * 2;
    this.minHeight = 180;
  }

  // static minWidth = deviceWidth - this.props.margin * 2;

  getShadowOption() {
    const { width, height, margin, borderRadius, shadowColor, shadowBorder, shadowOpacity, shadowOpt } = this.props;
    let shadowOption = {
      width: width || this.minWidth,
      height: height || this.minHeight,
      color: shadowColor,
      border: shadowBorder,
      opacity: shadowOpacity,
      radius: borderRadius,
      style: {
        margin,
      },
    };
    return Object.assign({}, shadowOption, shadowOpt);
  }

  getContentStyle() {
    const { width, height, margin, marginVertical, marginBottom, marginTop, padding, borderRadius, backgroundColor, style, shadow } = this.props;
    let contentStyle = [
      {
        width,
        height,
        borderRadius,
        backgroundColor,
        margin,
        marginVertical,
        marginBottom,
        marginTop,
        padding,
        overflow: 'hidden',
      },
    ].concat(style);
    contentStyle = StyleSheet.flatten(contentStyle);
    if (shadow) {
      contentStyle.height = height || this.minHeight;
      contentStyle.margin = 0;
    }
    return contentStyle;
  }

  renderPureWrap() {
    return <View style={this.getContentStyle()}>{this.props.children}</View>;
  }

  renderBoxShadowWrap() {
    const { shadow } = this.props;
    if (shadow) {
      return <BoxShadow setting={this.getShadowOption()}>{this.renderPureWrap()}</BoxShadow>;
    }
    return this.renderPureWrap();
  }

  render() {
    return this.renderBoxShadowWrap();
  }
}
