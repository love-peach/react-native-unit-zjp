import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export default class ScaleAnimateView extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['fade', 'slide-bottom', 'slide-top', 'slide-left', 'slide-right']),
    style: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {
    type: 'fade',
  };

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.in();
  }

  in(callback) {
    console.log('in');
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
    }).start(() => {
      console.log('in callback');
      callback && callback();
    });
  }

  out(callback) {
    console.log('out');

    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 200,
    }).start(() => {
      console.log('out callback');
      callback && callback();
    });
  }

  buildAnimateViewStyle = () => {
    const { style, type } = this.props;
    let animateViewStyle = { ...style };
    switch(type) {
      case 'fade':
        animateViewStyle.opacity = this.state.opacity;
        break;
      case 'slide-bottom':
      case 'slide-top':
        animateViewStyle.transform = [{ translateY: this.state.offset }];
        break;
      case 'slide-left':
      case 'slide-right':
        animateViewStyle.transform = [{ translateX: this.state.offset }];
        break;
      default:
        animateViewStyle.opacity = this.state.opacity;
    }
    return animateViewStyle;
  }

  render() {
    return (
      <Animated.View style={this.buildAnimateViewStyle()}>
        {this.props.children}
      </Animated.View>
    );
  }
}
