import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Animated } from 'react-native';

/**
 * @title 标题 左上
 */

export default class ScaleAnimateView extends Component {
  // 接收的属性
  // TODO: 接收属性校验
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.in();
  }

  componentWillUnmount() {
    // TODO: 退出的时候 希望以动画的形式退出 目前没实现
    this.out();
  }

  in() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 300,
    }).start();
  }

  out() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 300,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          opacity: this.state.opacity,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
