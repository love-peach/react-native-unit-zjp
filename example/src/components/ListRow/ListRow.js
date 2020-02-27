import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import SplitLine from '../SplitLine/SplitLine';

const demoImage = require('./icon_arrow.png');

/**
 * @title 标题 左上
 * @label 说明 左下
 * @value 值 右上
 * @extra 附加 右下
 * @valuePlace 空值 placeholder
 * @titleStyle 标题 左上 样式
 * @labelStyle 说明 左下 样式
 * @valueStyle 值 右上 样式
 * @extraStyle 附加 右下 样式
 * @valuePlaceStyle 空值 placeholder 样式
 * @icon 图标
 * @iconStyle 图标样式
 * @link 带箭头
 * @indicator 指示器
 * @indicatorDirection
 * @indicatorStyle
 * @splitLine 分割线
 * @splitLineStyle
 * @containerWrapStyle
 * @containerStyle
 * @activeOpacity
 * @underlayColor
 * @clickInterval
 * @onPress
 */

export default class ListRow extends PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    extra: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    valuePlace: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    valueStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    valuePlaceStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    extraStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.number, PropTypes.func]),
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    link: PropTypes.bool,
    indicator: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    indicatorDirection: PropTypes.string,
    indicatorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    splitLine: PropTypes.bool,
    splitLineStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    containerWrapStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    activeOpacity: PropTypes.number,
    underlayColor: PropTypes.string,
    onPress: PropTypes.func,
    clickInterval: PropTypes.number,
  };

  static defaultProps = {
    title: '',
    label: '',
    value: '',
    extra: '',
    link: false,
    splitLine: true,
    indicator: 'arrow',
    contentWrapOffset: 0,
    contentOffset: 0,
    contentOffsetVertical: 15,
    clickInterval: 0,
    activeOpacity: 0.5,
    underlayColor: '#eee',
    onPress: null,
    titleStyle: null,
    splitLineStyle: null,
  };

  prePressTime = 0;

  handleClick = event => {
    const { clickInterval, onPress } = this.props;
    const now = Date.now();

    if (clickInterval > 0 || this.prePressTime > 0) {
      if (now - this.prePressTime > clickInterval) {
        this.prePressTime = now;
        !!onPress && onPress(event);
      }
    } else {
      !!onPress && onPress(event);
    }
  };


  renderTitle() {
    const { title, titleStyle } = this.props;
    if (React.isValidElement(title)) return title;
    return (
      <Text numberOfLines={1} style={[styles.title, titleStyle]}>
        {title}
      </Text>
    );
  }

  renderLabel() {
    const { label, labelStyle } = this.props;
    if (React.isValidElement(label)) return label;
    return <Text style={[styles.label, labelStyle]}>{label}</Text>;
  }

  renderValue() {
    const { value, valueStyle, valuePlace, valuePlaceStyle } = this.props;
    if (value) {
      if (React.isValidElement(value)) return value;
      return <Text style={[styles.value, valueStyle]}>{value}</Text>;
    } else if (valuePlace) {
      if (React.isValidElement(valuePlace)) return valuePlace;
      return <Text style={[styles.valuePlace, valuePlaceStyle]}>{valuePlace}</Text>;
    }
  }

  renderExtra() {
    const { extra, extraStyle } = this.props;
    if (React.isValidElement(extra)) return extra;
    return <Text style={[styles.extra, extraStyle]}>{extra}</Text>;
  }

  renderContentRowTop() {
    const { title, value } = this.props;
    if (title || value) {
      return (
        <View style={styles.contentRow}>
          {this.renderTitle()}
          {this.renderValue()}
        </View>
      );
    }
    return null;
  }

  renderContentRowBottom() {
    const { label, extra } = this.props;
    if (label || extra) {
      return (
        <View style={[styles.contentRow, styles.contentRowBottom]}>
          {this.renderLabel()}
          {this.renderExtra()}
        </View>
      );
    }
    return null;
  }

  renderIcon() {
    let { icon, iconStyle } = this.props;
    if (icon === null || icon === undefined || React.isValidElement(icon)) return icon;

    if (icon) {
      if(React.isValidElement(icon)) {
        return icon;
      }
      return <Image style={StyleSheet.flatten([styles.icon, iconStyle])} source={icon} />;
    }
    return null;
  }

  renderIndicator() {
    const { link, indicator, indicatorDirection, indicatorStyle, onPress } = this.props;
    if (React.isValidElement(indicator)) return indicator;
    if (!link || indicator === 'none' || !onPress) return null;

    let imageSource;

    if (indicator === 'arrow') {
      imageSource = demoImage;
    }
    if (indicator === 'plus') {
      imageSource = demoImage;
    }

    let imageStyle = {
      width: 5,
      height: 10,
      marginLeft: 8,
    };
    if (indicatorDirection === 'up') {
      imageStyle.transform = [
        {
          rotate: '90deg',
        },
      ];
    }
    if (indicatorDirection === 'down') {
      imageStyle.transform = [
        {
          rotate: '-90deg',
        },
      ];
    }
    return <Image style={StyleSheet.flatten([imageStyle, indicatorStyle])} source={imageSource} />;
  }

  renderSplitLine() {
    const { splitLine, splitLineStyle } = this.props;
    if (splitLine) {
      return <SplitLine splitLineStyle={splitLineStyle} />;
    }
    return null;
  }
  

  // 过滤不必要的 props
  buildProps = () => {
    const  { activeOpacity, underlayColor, onPress, ...restProps } = this.props;
    const propsFinal = {
      ...restProps, activeOpacity: onPress ? activeOpacity : 1, underlayColor: onPress ? underlayColor : 'transparent'
    };
    return propsFinal;
  };

  render() {
    const { containerWrapStyle, containerStyle } = this.props;
    return (
      <TouchableHighlight {...this.buildProps()} onPress={event => this.handleClick(event)} >
        {/* 容器外层样式，包含 内容 和 分割线 */}
        <View style={StyleSheet.flatten([containerWrapStyle])}>
          {/* 容器样式，包含 图标 文字 指示器 */}
          <View style={StyleSheet.flatten([styles.container, containerStyle])}>
            {this.renderIcon()}
            <View style={styles.content}>
              {this.renderContentRowTop()}
              {this.renderContentRowBottom()}
            </View>
            {this.renderIndicator()}
          </View>
          {this.renderSplitLine()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    fontSIze: 0,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  contentRowBottom: {
    marginTop: 4,
  },
  title: {
    fontSize: 15,
    color: '#121C32',
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    fontSize: 15,
    color: '#121C32',
  },
  valuePlace: {
    fontSize: 15,
    color: '#868E9E',
  },
  label: {
    fontSize: 13,
    color: '#868E9E',
    flex: 1,
  },
  extra: {
    fontSize: 13,
    color: '#868E9E',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 9,
  },
};

