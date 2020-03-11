import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Button from '../Button/Button';
import Theme from '../../themes/Theme';

export default class ButtonRadio extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    options: PropTypes.array,
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    type: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden']),
    activeType: PropTypes.oneOf(['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden']),
    ghost: PropTypes.bool,
    activeGhost: PropTypes.bool,
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
    switch(dataType) {
      case 'object':
        if(typeof data.value === 'boolean') {
          this.props.onPress && this.props.onPress(data.value);
        } else {
          this.props.onPress && this.props.onPress(data.value || data);
        }
        break;
      case 'boolean':
        this.props.onPress && this.props.onPress(data);
        break;
      case 'string':
        this.props.onPress && this.props.onPress(data);
        break;
      case 'number':
        this.props.onPress && this.props.onPress(data);
        break;
      default:
        this.props.onPress && this.props.onPress(data);
    }
  }

  render() {
    const { value, options, type, activeType, ghost, activeGhost,  clickInterval, onPress, ...restProps } = this.props;
    return (
      <ButtonGroup {...restProps}>
        {
          options.map((item, index) => {
            const isActive = value !== undefined && value === item.value || value === item;
            let isGhost = ghost;
            if (isActive) {
              isGhost = activeGhost;
            }
            
            return (
              <Button
                clickInterval={clickInterval}
                type={isActive ? activeType : type}
                ghost={isGhost}
                key={index}
                onPress={() => {this.handleOnPress(item);}}
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