import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

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

  in() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
    }).start();
  }

  out() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 200,
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
