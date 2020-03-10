import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Easing, Animated } from 'react-native';

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
      offset: new Animated.Value(-this.props.width),
    };
  }

  componentDidMount() {
    this.in();
  }

  in() {
    Animated.spring(this.state.offset, {
      toValue: 0,
      duration: 200,
      friction: 10,
      tension: 50,
    }).start();
  }

  out() {
    Animated.timing(this.state.offset, {
      toValue: -this.props.width * 1.2,
      duration: 200,
      easing: Easing.cubic,
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
