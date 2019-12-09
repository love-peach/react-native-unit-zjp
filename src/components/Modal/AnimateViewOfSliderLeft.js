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
      offset: new Animated.Value(-300),
    };
  }

  componentDidMount() {
    this.in();
  }

  componentWillUnmount() {
    // TODO: 退出的时候 希望以动画的形式退出 目前没实现
    this.out();
  }

  in() {
    Animated.timing(this.state.offset, {
      toValue: 0,
      duration: 150,
    }).start();
  }

  out() {
    Animated.timing(this.state.offset, {
      toValue: -300,
      duration: 150,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: [{ translateX: this.state.offset }],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
