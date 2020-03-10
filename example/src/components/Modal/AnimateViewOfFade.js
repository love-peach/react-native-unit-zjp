import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

/**
 * @title 标题 左上
 */

export default class ScaleAnimateView extends Component {
  // 接收的属性
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
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
        onPress={() => {console.log(222);}}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: this.state.opacity,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
