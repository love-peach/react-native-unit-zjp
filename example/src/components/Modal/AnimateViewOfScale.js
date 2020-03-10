import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

/**
 * @title 标题 左上
 */

export default class ScaleAnimateView extends Component {
  // 接收的属性
  // TODO: 接收属性校验
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      scaleRatio: new Animated.Value(1.2),
      opacity: new Animated.Value(0),
    };
  }


  componentDidMount() {
    this.in();
  }

  in() {
    Animated.parallel([
      Animated.spring(this.state.scaleRatio, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  }

  out() {
    Animated.parallel([
      Animated.timing(this.state.scaleRatio, {
        toValue: 1.1,
        duration: 200,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 200,
      }),
    ]).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          opacity: this.state.opacity,
          transform: [{ scale: this.state.scaleRatio }],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
