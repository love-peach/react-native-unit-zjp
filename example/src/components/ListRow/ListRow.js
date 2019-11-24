/*
 * @Author: shawn
 * @LastEditTime: 2019-11-01 17:53:44
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import SplitLine from '../SplitLine/SplitLine';

const demoImage = require('./icon_arrow.png');

const styles = {
  wrapper: {
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
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
  iconWrap: {
    marginRight: 9,
  },
};

/**
 * @title 标题 左上
 * @label 说明 左下
 * @value 值 右上
 * @extra 附加 右下
 * @size 大小
 * @icon 图标
 * @Indicator 指示器
 * @link 带箭头
 * @splitLine 分割线
 */

export default class ListRow extends PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    extra: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    indicator: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    link: PropTypes.bool,
    splitLine: PropTypes.bool,
    splitLineStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    contentWrapOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    contentOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    contentOffsetVertical: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    clickInterval: 1600,
    underlayColor: '#eee',
    onPress: null,
    titleStyle: null,
    splitLineStyle: null,
  };

  prePressTime = 0;


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
    return (
      <View style={styles.iconWrap}>
        <Image style={[{ width: 20, height: 20 }, iconStyle]} source={icon} />
      </View>
    );
  }

  renderIndicator() {
    const { link, linkDirection, indicator, indicatorStyle, onPress } = this.props;
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
    };
    if (linkDirection === 'up') {
      imageStyle.transform = [
        {
          rotate: '90deg',
        },
      ];
    }
    if (linkDirection === 'down') {
      imageStyle.transform = [
        {
          rotate: '-90deg',
        },
      ];
    }
    return (
      <View style={{ paddingLeft: 8 }}>
        <Image style={[imageStyle, indicatorStyle]} source={imageSource} />
      </View>
    );
  }

  renderSplitLine() {
    const { splitLine, splitLineStyle } = this.props;
    if (splitLine) {
      return <SplitLine splitLineStyle={splitLineStyle} />;
    }
    return null;
  }

  buildContentWrapStyle() {
    const { contentWrapOffset, contentWrapStyle } = this.props;
    let contentWrapStyleFinaly = [
      {
        paddingHorizontal: contentWrapOffset,
      },
    ].concat(contentWrapStyle);
    return StyleSheet.flatten(contentWrapStyleFinaly);
  }

  buildContentStyle() {
    const { contentOffset, contentOffsetVertical, contentStyle } = this.props;
    let contentStyleFinaly = [
      styles.content,
      {
        paddingHorizontal: contentOffset,
        paddingVertical: contentOffsetVertical,
      },
    ].concat(contentStyle);
    return StyleSheet.flatten(contentStyleFinaly);
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
    const { underlayColor, onPress } = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableHighlight onPress={event => this.handleClick(event)} activeOpacity={onPress ? 0.5 : 1} underlayColor={onPress ? underlayColor : 'transparent'} style={this.buildContentWrapStyle()}>
          <View>
            <View style={this.buildContentStyle()}>
              {this.renderIcon()}
              <View style={styles.container}>
                {this.renderContentRowTop()}
                {this.renderContentRowBottom()}
              </View>
              {this.renderIndicator()}
            </View>
            {this.renderSplitLine()}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
