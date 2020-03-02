import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import Theme from '../../themes/Theme';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden', 'text']),
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    radius: PropTypes.number,
    ghost: PropTypes.bool,
    vertical: PropTypes.bool,
    style: ViewPropTypes.style,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    type: 'primary',
    size: 'md',
    radius: 1000,
  }

  buildContainerStyle = () => {
    const { size, vertical, style } = this.props;
    let containerStyle = {};
    if (vertical) {
      containerStyle = {
        flexDirection: 'column',
        justifyContent: 'center',
        width: Theme[`btn_group_width_${size}`] + 2,
        // position: 'absolute',
        // backgroundColor: 'red',
      };
    } else {
      containerStyle = {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      };
    }
    return StyleSheet.flatten([containerStyle, style]);
  };

  buildItemStyle = (index, length) => {
    const { radius } = this.props;
    let itemStyle = {};
    if (index === 0 && index !== length - 1) {
      itemStyle = {
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
        borderRightWidth: 0.5,
        borderRightColor: '#fff'
      };
    } else if (index === length - 1 && index !== 0){
      itemStyle = {
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
      };
    } else {
      itemStyle = {
        borderRadius: 0,
        borderRightWidth: 0.5,
        borderRightColor: '#fff'
      };
    }
    return itemStyle;
  };

  buildItemStyleVertical = (index, length) => {
    const { radius } = this.props;
    let itemStyle = {};
    if (index === 0 && index !== length - 1) {
      itemStyle = {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        borderBottomWidth: 0.5,
        borderBottomColor: '#fff'
      };
    } else if (index === length - 1 && index !== 0){
      itemStyle = {
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
      };
    } else {
      itemStyle = {
        borderRadius: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#fff'
      };
    }
    return itemStyle;
  }

  renderChild = () => {
    const { size, type, ghost, vertical, children, ...restProps } = this.props;
    if (children) {
      let childElements = [];
      const childrenLength = children.length;
      childElements = React.Children.map(children, (item, index) => {
        const currentStyle = vertical ? this.buildItemStyleVertical(index, childrenLength) : this.buildItemStyle(index, childrenLength);
        return React.cloneElement(item, { size, shape: 'rect', ghost: item.props.ghost || ghost, type: item.props.type || type, style: { ...currentStyle } });
      });
      return childElements;
    }
  };

  render() {
    return (
      <View style={this.buildContainerStyle()}>
        {this.renderChild()}
      </View>
    );
  }
}
