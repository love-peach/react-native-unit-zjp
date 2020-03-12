import React, { Component }from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, ViewPropTypes } from 'react-native';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Button from '../Button/Button';

export default class ButtonRadio extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    options: PropTypes.array,
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    type: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden']),
    activeType: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden']),
    ghost: PropTypes.bool,
    activeGhost: PropTypes.bool,
    braceUp: PropTypes.bool,
    radius: PropTypes.number,
    clickInterval: PropTypes.number,
    style: ViewPropTypes.style,
    onPress: PropTypes.func,
  }
  static defaultProps = {
    type: 'default',
    activeType: 'primary',
    ghost: true,
    activeGhost: false,
    radius: 0,
    clickInterval: 0,
  }

  handleOnPress = (data) => {
    const dataType = typeof data;
    let passData = data;

    switch(dataType) {
      case 'object':
        if (typeof data.value === 'boolean' || typeof data.value === 'string' || typeof data.value === 'number') { // 如果 data.value 为 false 或者 空字符串 也原样返回
          passData = data.value;
        } else {
          passData = data.value || data;
        }
        break;
      case 'boolean':
        passData = data;
        break;
      case 'string':
        passData = data;
        break;
      case 'number':
        passData = data;
        break;
      default:
        passData = data;
    }
    
    if (data.onPress) {
      data.onPress(passData);
    } else {
      this.props.onPress && this.props.onPress(passData);
    }
  }

  render() {
    const { value, options, type, activeType, ghost, activeGhost, braceUp, clickInterval, onPress, ...restProps } = this.props;
    return (
      <ButtonGroup {...restProps}>
        {
          options.map((item, index) => {
            const isActive = value !== undefined && value === item.value || value === item;
            let isGhost = ghost;
            if (isActive) {
              isGhost = activeGhost;
            }
            let dynamicStyle = {};
            if (braceUp) {
              dynamicStyle.flex = 1;
            }
            
            return (
              <Button
                clickInterval={clickInterval}
                type={isActive ? activeType : type}
                ghost={isGhost}
                key={index}
                onPress={() => {this.handleOnPress(item);}}
                style={StyleSheet.flatten([dynamicStyle, item.style])}
              >
                {item.label || item}
              </Button>
            );
          })
        }
      </ButtonGroup>
    );
  }
}