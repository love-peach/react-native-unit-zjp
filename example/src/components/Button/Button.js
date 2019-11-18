/*
 * @Author: shawn
 * @LastEditTime: 2019-11-01 14:35:45
 */
import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import theme from './theme';

/**
 * @label 按钮中的文字
 * @labelStyle 按钮中的文字样式
 * @labelProps 按钮中的文字属性
 * @containerStyle 容器样式 覆盖 padding 等
 * @type 按钮主题 [default, primary, info, orange, warning, success, error]
 * @color 文字颜色
 * @backgroundColor 背景色
 * @gradient 是否渐变
 * @gradientColors 渐变颜色
 * @gradientDirection 渐变方向
 * @gradientProps 渐变其他属性
 * @iconSource 图标资源
 * @iconStyle 图标样式
 * @iconOnRight 图标是否在右边
 * @size 大小 [xl, lg, md, sm, xs]
 * @outline 边框是否有
 * @outlineColor 边框颜色
 * @outlineWidth 边框粗细
 * @outlineType 边框类型 [solid, dotted, dashed]
 * @shape 圆角大小 提供三种固定大小 [rect, radius, circle]
 * @borderRadius 圆角大小
 * @link 是否是链接按钮 文字按钮
 * @linkColor 链接颜色
 * @disabled 禁用
 * @loading loading
 * @loadingSize loadingSize
 * @onPress 事件
 */
export default class Button extends Component {
  static propTypes = {
    label: PropTypes.string,
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    labelProps: PropTypes.object,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    color: PropTypes.string,
    type: PropTypes.oneOf(['default', 'gray', 'primary', 'info', 'warning', 'orange', 'success', 'error']),
    backgroundColor: PropTypes.string,
    gradient: PropTypes.bool,
    gradientColors: PropTypes.array,
    gradientDirection: PropTypes.oneOf(['horizontal', 'vertical']),
    gradientProps: PropTypes.object,
    iconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.func]),
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    iconOnRight: PropTypes.bool,
    iconMarginSize: PropTypes.number,
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    outline: PropTypes.bool,
    outlineColor: PropTypes.string,
    outlineWidth: PropTypes.number,
    outlineType: PropTypes.oneOf(['solid', 'dotted', 'dashed']),
    shape: PropTypes.oneOf(['rect', 'radius', 'circle']),
    borderRadius: PropTypes.number,
    link: PropTypes.bool,
    linkColor: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    loadingSize: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']), // 暂未实现
    onPress: PropTypes.func,
  };

  static defaultProps = {
    type: 'warning',
    size: 'xl',
    loading: false,
    iconOnRight: false,
    iconMarginSize: 5,
    outline: false,
    outlineColor: theme.btnBorderColor,
    outlineType: 'solid',
    link: false,
    linkColor: theme.btnLabelLinkColor,
    shape: 'circle',
    gradientColors: [theme.btnInfoColor, theme.btnPrimaryColor],
    gradientDirection: 'horizontal',
    activeOpacity: 0.65,
    clickInterval: 1600,
  };

  prePressTime = 0;

  getBackgroundColor() {
    const { outline, link, disabled, backgroundColor, type } = this.props;
    if (outline || link) {
      return 'transparent';
    }
    if (disabled) {
      return theme.btnDisabledColor;
    }
    return backgroundColor || theme[`btn${type.slice(0, 1).toUpperCase() + type.slice(1)}Color`];
  }

  getLabelColor() {
    const { disabled, color, link, linkColor, outline, outlineColor, type, gradient } = this.props;
    if (disabled) {
      if (outline || link) {
        return theme.btnDisabledColor;
      }
      return theme.btnLabelColorDisabled;
    }
    if (color) {
      return color;
    }
    if (link && linkColor) {
      return linkColor;
    }
    if (outline && outlineColor) {
      return outlineColor;
    }
    if (gradient) {
      return theme.btnDefaultColor;
    }
    return theme[`btnLabelColor${type.slice(0, 1).toUpperCase() + type.slice(1)}`];
  }

  getFontSize() {
    const { size } = this.props;
    return theme[`btnFontSize${size.toUpperCase()}`];
  }

  getPaddingVertical() {
    const { size } = this.props;
    return theme[`btnPaddingVertical${size.toUpperCase()}`];
  }

  getPaddingHorizontal() {
    const { size } = this.props;
    return theme[`btnPaddingHorizontal${size.toUpperCase()}`];
  }

  getBorderRadius() {
    const { borderRadius, shape, size } = this.props;
    if (borderRadius) {
      return borderRadius;
    }
    if (shape) {
      return theme[`btnBorderRadius${shape.slice(0, 1).toUpperCase() + shape.slice(1)}`];
    }
    return theme[`btnBorderRadius${size.toUpperCase()}`];
  }

  getOutLineStyle() {
    const { outline, outlineColor, outlineWidth, outlineType, disabled } = this.props;
    let outlineStyle = {};
    if (outline) {
      outlineStyle.borderWidth = outlineWidth || theme.btnBorderWidth;
      outlineStyle.borderColor = outlineColor || theme.btnBorderColor;
      outlineStyle.borderStyle = outlineType;
    }
    if (disabled) {
      outlineStyle.borderColor = theme.btnDisabledColor;
    }
    return outlineStyle;
  }

  getIconStyle() {
    const { iconStyle = {}, iconOnRight, iconMarginSize } = this.props;
    const iconStyleFinaly = {
      tintColor: this.getLabelColor(),
      ...iconStyle,
    };
    if (iconOnRight) {
      iconStyleFinaly.marginLeft = iconMarginSize;
    } else {
      iconStyleFinaly.marginRight = iconMarginSize;
    }
    return [iconStyleFinaly];
  }

  getLabelStyle() {
    let { size, labelStyle } = this.props;

    let labelStyleFinaly = [
      {
        color: this.getLabelColor(),
        fontSize: this.getFontSize(),
        fontWeight: size === 'xl' ? '600' : '400',
      },
    ].concat(labelStyle);
    labelStyleFinaly = StyleSheet.flatten(labelStyleFinaly);
    return labelStyleFinaly;
  }

  getLoadingSize() {
    const { size, loadingSize } = this.props;
    return loadingSize || theme[`btnLoadingSizeXL${size.toUpperCase()}`];
  }

  getContainerStyle() {
    const { containerStyle } = this.props;

    return StyleSheet.flatten([
      {
        paddingVertical: this.getPaddingVertical(),
        paddingHorizontal: this.getPaddingHorizontal(),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      containerStyle,
    ]);
  }

  // 构建组件样式
  buildStyle() {
    let { style } = this.props;
    const outlineStyle = this.getOutLineStyle();
    let styleFinaly = [
      {
        borderRadius: this.getBorderRadius(),
        backgroundColor: this.getBackgroundColor(),
        overflow: 'hidden',
        // marginVertical: 5,
        // marginHorizontal: 20,
        ...outlineStyle,
      },
    ].concat(style);
    styleFinaly = StyleSheet.flatten(styleFinaly);
    return styleFinaly;
  }

  getGradientProps() {
    const { disabled, gradientColors, gradientDirection, gradientProps } = this.props;
    let gradientPropsFinaly = {
      colors: gradientColors,
      start: { x: 0, y: 0 },
    };

    if (disabled) {
      gradientPropsFinaly.colors = [theme.btnDisabledColor, theme.btnDisabledColor];
    }

    if (gradientDirection === 'horizontal') {
      gradientPropsFinaly.end = { x: 1, y: 0 };
    }

    if (gradientDirection === 'vertical') {
      gradientPropsFinaly.end = { x: 0, y: 1 };
    }

    gradientPropsFinaly = Object.assign({}, gradientPropsFinaly, { ...gradientProps });
    return gradientPropsFinaly;
  }

  // 生成按钮图标
  renderIcon() {
    const { iconSource, loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={this.getLabelColor()} size="small" style={{ marginRight: 5 }} />;
    }
    if (iconSource) {
      return <Image source={iconSource} style={this.getIconStyle()} />;
    }
    return null;
  }

  // 生成按钮文字
  renderLabel() {
    const { label } = this.props;
    if (label) {
      return (
        <Text style={this.getLabelStyle()} numberOfLines={1}>
          {label}
        </Text>
      );
    }
    return null;
  }

  renderContent() {
    return (
      <View style={this.getContainerStyle()}>
        {this.props.children}
        {this.props.iconOnRight ? this.renderLabel() : this.renderIcon()}
        {this.props.iconOnRight ? this.renderIcon() : this.renderLabel()}
      </View>
    );
  }

  renderWrapAndContent() {
    const { gradient } = this.props;
    const gradientProps = this.getGradientProps();
    if (gradient) {
      return <LinearGradient {...gradientProps}>{this.renderContent()}</LinearGradient>;
    }
    return this.renderContent();
  }

  handleClick = event => {
    const { disabled, loading, clickInterval, onPress } = this.props;
    const now = Date.now();

    if (disabled || loading) return;

    if (clickInterval > 0 || this.prePressTime > 0) {
      if (now - this.prePressTime > clickInterval) {
        this.prePressTime = now;
        !!onPress && onPress(event);
      }
    } else {
      !!onPress && onPress(event);
    }
  };

  render() {
    let { style, type, size, label, labelStyle, labelProps, children, onPress, ...others } = this.props;
    return (
      <TouchableOpacity style={this.buildStyle()} onPress={event => this.handleClick(event)} {...others}>
        {this.renderWrapAndContent()}
      </TouchableOpacity>
    );
  }
}
