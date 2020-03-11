import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import AnimateView from '../AnimateView/AnimateView';

export default class ToastContainer extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    delay: PropTypes.number,
    duration: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
  }
  static defaultProps = {
    visible: false,
    delay: 0,
    duration: 2000,
  }

  constructor() {
    super(...arguments);
    this.state = {
      visible: this.props.visible,
    };
  }

  componentDidMount = () => {
    if (this.state.visible) {
      this._showTimeout = setTimeout(() => this._show(), this.props.delay);
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        clearTimeout(this._showTimeout);
        clearTimeout(this._hideTimeout);
        this._showTimeout = setTimeout(() => this._show(), this.props.delay);
      } else {
        this._hide();
      }

      this.setState({
        visible: this.props.visible
      });
    }
  };

  componentWillUnmount = () => {
    this._hide();
  };

  _animating = false;
  _hideTimeout = null;
  _showTimeout = null;

  _show = () => {
    clearTimeout(this._showTimeout);
    if (!this._animating) {
      clearTimeout(this._hideTimeout);
      this._animating = true;
      this.props.onShow && this.props.onShow(this.props.siblingManager);
      this.animateView.in(() => {
        this._animating = false;
        this.props.onShown && this.props.onShown(this.props.siblingManager);
        if (this.props.duration > 0) {
          this._hideTimeout = setTimeout(() => this._hide(), this.props.duration);
        }
      });
    }
    console.log(111);
  };

  _hide = () => {
    console.log(222);
    clearTimeout(this._showTimeout);
    clearTimeout(this._hideTimeout);
    if (!this._animating) {
      this.props.onHide && this.props.onHide(this.props.siblingManager);
      
      this.animateView.out(() => {
        this._animating = false;
        this.props.onHidden && this.props.onHidden(this.props.siblingManager);
      });
    }
  };

  render() {
    return this.state.visible || this._animating ? (
      <View style={{ backgroundColor: 'red', top: 20, borderWidth: 1,position: 'absolute'}}>
        <Text>{this.state.visible.toString()}</Text>
        <AnimateView ref={ele => this.animateView = ele}>
          <Text style={{height: 100}}>fefe</Text>
        </AnimateView>
      </View>
    ) : null;
  }
}