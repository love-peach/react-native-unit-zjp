import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Animated } from 'react-native';
const { height } = Dimensions.get('window');

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
    // TODO: height 应该有个默认值 也接受外部传值
    this.state = {
      offset: new Animated.Value(height * 0.8),
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
    Animated.spring(this.state.offset, {
      toValue: 0,
      duration: 150,
      friction: 8,
      tension: 100,
    }).start();
  }

  out() {
    Animated.spring(this.state.offset, {
      toValue: height * 0.8,
      duration: 150,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.state.offset }],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
