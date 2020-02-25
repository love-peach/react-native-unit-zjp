import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../themes/Theme';

/**
 * @type 按钮主题 [default, primary, info, warning, success, error, gray, golden, text]
 * @size 大小 [xl, lg, md, sm, xs]
 * 
 * @shape 圆角大小 提供三种固定大小 [rect, radius, circle]
 * @borderRadius 圆角大小
 * 
 * @color 文字颜色
 * @backgroundColor 背景色
 * 
 * @ghost 边框是否有
 * @outlineColor 边框颜色
 * @outlineWidth 边框粗细
 * @outlineType 边框类型 [solid, dotted, dashed]
 * 
 * @gradient 是否渐变
 * @gradientColors 渐变颜色
 * @gradientDirection 渐变方向
 * @gradientProps 渐变其他属性
 * 
 * @loading loading
 * @disabled 禁用
 * 
 * @icon 图标资源
 * @iconStyle 图标样式
 * @iconOnRight 图标是否在右边
 * @activityIndicatorColor loading 指示器颜色 默认为文字颜色
 * 
 * @containerStyle 容器样式 覆盖 padding 等
 * 
 * @onPress 事件
 * @clickInterval 防连点 默认 1000 毫秒
 */
export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden', 'text']),
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    shape: PropTypes.oneOf(['rect', 'radius', 'circle']),
    borderRadius: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    ghost: PropTypes.bool,
    outlineType: PropTypes.oneOf(['solid', 'dotted', 'dashed']),
    outlineColor: PropTypes.string,
    outlineWidth: PropTypes.number,
    gradient: PropTypes.bool,
    gradientColors: PropTypes.array,
    gradientDirection: PropTypes.oneOf(['horizontal', 'vertical']),
    gradientProps: PropTypes.object,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.number, PropTypes.func]),
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    iconOnRight: PropTypes.bool,
    activityIndicatorColor: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
    clickInterval: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };

  static defaultProps = {
    type: 'default',
    size: 'xl',
    shape: 'circle',
    outlineType: 'solid',
    gradientColors: [Theme.color.info, Theme.color.primary],
    gradientDirection: 'horizontal',
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
    const { ghost, disabled, backgroundColor, type } = this.props;
    if (ghost || type === 'text') {
      return 'transparent';
    }
    if (disabled) {
      return Theme.btn.bg.disabled;
    }
    return backgroundColor || Theme.btn.bg[type];
  }

  getLabelColor() {
    const { disabled, color, ghost, outlineColor, type, gradient } = this.props;
    if (disabled) {
      if (type === 'text' || ghost) {
        return Theme.color.grayDark;
      }
      return Theme.btn.text.disabled;
    }
    if (color) {
      return color;
    }
    if (ghost) {
      if (outlineColor) {
        return outlineColor;
      } else if (type === 'default') {
        return Theme.textColor.title;
      } else if (type === 'text') {
        return Theme.btn.text[type];
      } else {
        return Theme.btn.bg[type];
      }
    }
    if (gradient) {
      return Theme.color.white;
    }
    return Theme.btn.text[type];
  }

  getBorderRadius() {
    const { borderRadius, shape } = this.props;
    if (borderRadius) {
      return borderRadius;
    }
    if (shape) {
      return Theme.btn.radius[shape];
    }
  }

  getOutLineStyle() {
    const { type, ghost, outlineColor, outlineWidth, outlineType, disabled } = this.props;
    let outlineStyle = {};
    if (ghost) {
      outlineStyle.borderWidth = outlineWidth || Theme.btn.borderWidth;
      outlineStyle.borderStyle = outlineType;
      if (outlineColor) {
        outlineStyle.borderColor = outlineColor;
      } else if (type === 'default') {
        outlineStyle.borderColor = Theme.textColor.titleSub;
      } else if (type === 'text') {
        outlineStyle.borderColor = Theme.btn.text[type];
      } else {
        outlineStyle.borderColor = Theme.btn.bg[type];
      }
    }
    if (disabled) {
      outlineStyle.borderColor = Theme.color.grayDark;
    }
    return outlineStyle;
  }

  getIconStyle() {
    const { iconStyle = {}, iconOnRight } = this.props;
    const iconStyleFinaly = {
      tintColor: this.getLabelColor(),
      ...iconStyle,
    };
    if (iconOnRight) {
      iconStyleFinaly.marginLeft = 5;
    } else {
      iconStyleFinaly.marginRight = 5;
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
      gradientPropsFinaly.colors = [Theme.color.gray, Theme.color.gray];
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
    const { size, children } = this.props;

    const labelStyleFinaly = StyleSheet.flatten([
      {
        color: this.getLabelColor(),
        fontSize: Theme.btn.fontSize[size],
        fontWeight: size === 'xl' ? '600' : '400',
      },
    ]);

    if (children) {
      let childElements = [];
      React.Children.forEach(children, (item) => {
        if (typeof item === 'string' || typeof item === 'number') {
          const element = <Text key={item} style={labelStyleFinaly} numberOfLines={1}>{item}</Text>;
          childElements.push(element);
        } else if (React.isValidElement(item)) {
          childElements.push(item);
        }
      });
      if(childElements.length && childElements.length > 1) {
        return <Text style={labelStyleFinaly} numberOfLines={1}>{childElements}</Text>;
      }
      // return <Text style={labelStyleFinaly} numberOfLines={1}>{childElements}</Text>;
      return childElements;
    }
    return null;
  }

  // 生成按钮内容
  renderContent() {
    const { size, iconOnRight, containerStyle } = this.props;
    const containerStyleFinal = StyleSheet.flatten([
      {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Theme.btn.height[size],
        minWidth: Theme.btn.minWidth[size],
        paddingHorizontal: Theme.btn.paddingHorizontal[size],
        // paddingVertical: Theme.btn.paddingVertical[size],
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

  buildProps = () => {
    let {
      containerStyle,
      type,
      color,
      backgroundColor,
      gradient,
      gradientColors,
      gradientDirection,
      gradientProps,
      icon,
      iconStyle,
      iconOnRight,
      size,
      ghost,
      outlineColor,
      outlineWidth,
      outlineType,
      shape,
      borderRadius,
      loading,
      activityIndicatorColor,
      clickInterval,
      onPress,
      style,
      children,
      ...restProps
    } = this.props;
    return { ...restProps };
  };

  buildOverflowStyle = () => {
    let { style } = this.props;
    const outlineStyle = this.getOutLineStyle();
    return StyleSheet.flatten([
      {
        borderRadius: this.getBorderRadius(),
        overflow: 'hidden',
        borderWidth:2,
        borderColor:'red',
      },
      style
    ]);
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={event => this.handleClick(event)} {...this.buildProps()}>
          <View style={this.buildStyle()}>
            {this.renderWrapAndContent()}
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity style={this.buildStyle()} onPress={event => this.handleClick(event)} {...this.buildProps()}>
        {this.renderWrapAndContent()}
      </TouchableOpacity>
    );
  }
}
