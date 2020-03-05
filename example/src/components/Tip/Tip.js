import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Text } from 'react-native';
import Theme from '../../themes/Theme';
import { HexToRGBA, HexToRgb, RgbToHex, getDarkColor, getLightColor} from '../../utils/color';

/**
 * @type 按钮主题 [default, primary, info, warning, success, error, gray, golden, text]
 * @icon 图标
 * @iconStyle 图标样式
 * @style 容器样式
 */

export default class Tip extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden', 'text']),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.number, PropTypes.func]),
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }

  static defaultProps = {
    type: 'primary',
  }

  buildContainerStyle() {
    const { type, style } = this.props;
    console.log(type, 'type');
    
    let dynamicStyle = {
      borderColor: Theme[type],
      backgroundColor: HexToRGBA(Theme[type], .1),
    };


    return StyleSheet.flatten([styles.container, dynamicStyle, style]);
  }

  // 生成 图标
  renderIcon() {
    let { icon, iconStyle } = this.props;

    if (icon) {
      if(React.isValidElement(icon)) {
        return <View style={styles.iconWrap}>{icon}</View>;
      }
      return <Image style={StyleSheet.flatten([styles.iconWrap, styles.icon, iconStyle])} source={icon} />;
    }
    return null;
  }

  // 生成 标题
  renderTitle() {
    const { title } = this.props;
    if (title) {
      if (React.isValidElement(title)) return title;
      return <Text style={styles.title}>{ title }</Text>;
    }
    return null;
  }

  // 生成 tip 文字
  renderLabel() {
    const { children } = this.props;


    if (children) {
      let childElements = [];
      React.Children.forEach(children, (item) => {
        if (typeof item === 'string' || typeof item === 'number') {
          const element = <Text key={item} style={styles.label}>{item}</Text>;
          childElements.push(element);
        } else if (React.isValidElement(item)) {
          childElements.push(item);
        }
      });
      return childElements;
    }
    return null;
  }

  render() {
    return (
      <View style={this.buildContainerStyle()}>
        {this.renderIcon()}
        <View style={styles.titleWrap}>
          {this.renderTitle()}
          {this.renderLabel()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: Theme.pixelSize,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  iconWrap: {
    marginRight: 9,
  },
  icon: {
    width: 18,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Theme.title,
    marginBottom: 5,
  },
  label: {
    fontSize: 15,
    color: Theme.titleSub,
    // lineHeight: 15,
    textAlign: 'justify'
  }
});
