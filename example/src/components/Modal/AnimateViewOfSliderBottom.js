import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Easing, Animated } from 'react-native';
const RNWindow = Dimensions.get('window');

export default class ScaleAnimateView extends Component {
  static propTypes = {
    height: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {
    height: RNWindow.height * 0.5
  };

  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(this.props.height),
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
      toValue: this.props.height * 1.3, // *1.3 是保证内容完全退出屏幕 
      duration: 200,
      easing: Easing.cubic,
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
