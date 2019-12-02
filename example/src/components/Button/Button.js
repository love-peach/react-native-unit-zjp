/*
 * @Author: shawn
 * @LastEditTime: 2019-11-01 14:35:45
 */
import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import theme from './theme';
/**
 * @label  按钮中的文字
 * @labelStyle 按钮中的文字样式
 * @labelProps 按钮中的文字属性
 * @containerStyle 容器样式 覆盖 padding 等
 * @type 按钮主题 [default, gray, primary, info, orange, warning, success, error]
 * @color 文字颜色
 * @backgroundColor 背景色
 * @gradient 是否渐变
 * @gradientColors 渐变颜色
 * @gradientDirection 渐变方向
 * @gradientProps 渐变其他属性
 * @icon 图标资源
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
 * @activityIndicatorColor loading 指示器颜色 默认为文字颜色
 * @onPress 事件
 * @clickInterval 防连点 默认 1000 毫秒
 */
export default class Button extends Component {
  static propTypes = {
    label: PropTypes.string,
    labelStyle: Text.propTypes.style,
    labelProps: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    color: PropTypes.string,
    type: PropTypes.oneOf(['default', 'gray', 'primary', 'info', 'warning', 'orange', 'success', 'error']),
    backgroundColor: PropTypes.string,
    gradient: PropTypes.bool,
    gradientColors: PropTypes.array,
    gradientDirection: PropTypes.oneOf(['horizontal', 'vertical']),
    gradientProps: PropTypes.object,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.number, PropTypes.func]),
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
    activityIndicatorColor: PropTypes.string,
    style: ViewPropTypes.style,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
    clickInterval: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    
  };

  static defaultProps = {
    type: 'default',
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
    clickInterval: 1000,
  };

  prePressTime = 0;

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

  // 构建组件样式
  buildStyle() {
    let { style } = this.props;
    const outlineStyle = this.getOutLineStyle();
    return StyleSheet.flatten([
      {
        borderRadius: this.getBorderRadius(),
        backgroundColor: this.getBackgroundColor(),
        overflow: 'hidden',
        ...outlineStyle,
      },
      style
    ]);
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
    const { icon, loading, activityIndicatorColor } = this.props;
    if (loading) {
      return <ActivityIndicator color={activityIndicatorColor || this.getLabelColor()} size="small" style={{ marginRight: 5, alignSelf: 'center', }} />;
    }

    if (icon && React.isValidElement(icon)) {
      return icon;
    }

    // if (typeof icon === 'string') {
    //   return <Icon name={icon} style={this.getIconStyle()} />;
    // }


    
    if (icon) {
      if (React.isValidElement(icon)) {
        return icon;
      }
      // if (typeof icon === 'string') {
      //   return <Icon name={icon} style={this.getIconStyle()} />;
      // }
      return <Image source={icon} style={this.getIconStyle()} />;
    }
    return null;
  }

  // 生成按钮文字
  renderLabel() {
    const { label, labelStyle, size, children } = this.props;

    const labelStyleFinaly = StyleSheet.flatten([
      {
        color: this.getLabelColor(),
        fontSize: theme[`btnFontSize${size.toUpperCase()}`],
        fontWeight: size === 'xl' ? '600' : '400',
      },
      labelStyle
    ]);

    if (children) {
      let childElements = [];
      React.Children.forEach(children, (item) => {
        if (typeof item === 'string' || typeof item === 'number') {
          const element = (
            <Text key={item} style={labelStyleFinaly} numberOfLines={1}>
              {item}
            </Text>
          );
          childElements.push(element);
        } else if (React.isValidElement(item)) {
          childElements.push(item);
        }
      });
      return childElements;
    }

    if (label && React.isValidElement(label)) {
      return children;
    }

    return label ? <Text style={labelStyleFinaly} numberOfLines={1}>{label}</Text> : null;
  }

  // 生成按钮内容
  renderContent() {
    const { size, iconOnRight, containerStyle } = this.props;
    const containerStyleFinal = StyleSheet.flatten([
      {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme[`btnPaddingVertical${size.toUpperCase()}`],
        paddingHorizontal: theme[`btnPaddingHorizontal${size.toUpperCase()}`],
      },
      containerStyle,
    ]);
    return (
      <View style={containerStyleFinal}>
        {iconOnRight ? this.renderLabel() : this.renderIcon()}
        {iconOnRight ? this.renderIcon() : this.renderLabel()}
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

  render() {
    let {
      label,
      labelStyle,
      labelProps,
      containerStyle,
      type, color,
      backgroundColor,
      gradient,
      gradientColors,
      gradientDirection,
      gradientProps,
      icon,
      iconStyle,
      iconOnRight,
      size,
      outline,
      outlineColor,
      outlineWidth,
      outlineType,
      shape,
      borderRadius,
      link,
      linkColor,
      loading,
      activityIndicatorColor,
      clickInterval,
      onPress,
      style,
      children,
      ...restProps
    } = this.props;
    
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={event => this.handleClick(event)} {...restProps}>
          <View style={this.buildStyle()}>
            {this.renderWrapAndContent()}
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity style={this.buildStyle()} onPress={event => this.handleClick(event)} {...restProps}>
        {this.renderWrapAndContent()}
      </TouchableOpacity>
    );
  }
}
