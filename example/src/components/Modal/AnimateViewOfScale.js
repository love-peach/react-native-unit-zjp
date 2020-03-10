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
        duration: 150,
        friction: 5,
        tension: 150,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 150,
      }),
    ]).start();
  }

  out() {
    Animated.timing(this.state.scaleRatio, {
      toValue: 1.2,
      duration: 150,
    }).start();

    Animated.parallel([
      Animated.timing(this.state.scaleRatio, {
        toValue: 1.2,
        duration: 150,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 150,
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
