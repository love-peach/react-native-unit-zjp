import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import Theme from '../../themes/Theme';


/**
 * @size 设置按钮组大小 [xl, lg, md, sm, xs] md
 * @radius 设置按钮组圆角大小 1000
 * @ghost 设置幽灵按钮组 false
 * @vertical 设置按钮组垂直布局 false
 */

export default class CellGroup extends Component {

  static propTypes = {
    style: ViewPropTypes.style,
    borderOffset: PropTypes.number,
    paddingOffset: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    borderOffset: 12,
    paddingOffset: 12,
  }

  // 构建容器样式
  buildContainerStyle = () => {
    const { style } = this.props;
    let containerStyle = {
      // paddingLeft: 16,
      borderTopWidth: Theme.pixelSize,
      borderTopColor: Theme.border,
      borderBottomWidth: Theme.pixelSize,
      borderBottomColor: Theme.border,
    };
    return StyleSheet.flatten([containerStyle, style]);
  };

  // 渲染每个 cell
  renderChild = () => {
    const { borderOffset, paddingOffset, children } = this.props;
    if (children) {
      const childrenLength = React.Children.toArray(children).length;

      return React.Children.map(children, (item, index) => {
        const itemProps = {
          splitLine: index === childrenLength - 1 ? false : true,
          containerStyle: {
            paddingHorizontal: paddingOffset,
          },
          splitLineStyle: {
            marginLeft: borderOffset,
          }
        };

        return React.cloneElement(item, { ...itemProps });
      });
    }
    return null;
  };

  render() {
    return (
      <View style={this.buildContainerStyle()}>
        {this.renderChild()}
      </View>
    );
  }
}