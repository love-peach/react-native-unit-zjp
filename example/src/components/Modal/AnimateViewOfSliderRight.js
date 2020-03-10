import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export default class ScaleAnimateView extends Component {
  static propTypes = {
    width: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {
    width: 300,
  };

  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(this.props.width),
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
      toValue: this.props.width,
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
