import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import AnimateView from '../AnimateView/AnimateView';
import Theme from '../../themes/Theme';

export default class ToastContainer extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    delay: PropTypes.number,
    duration: PropTypes.number,
    theme: PropTypes.string,
    placement: PropTypes.string, // PropTypes.oneOfType(['center', 'top', 'bottom', 'left', 'right']),
    animateType: PropTypes.string, // PropTypes.oneOfType(['fade', 'scale', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right']),
    top: PropTypes.number,
    bottom: PropTypes.number,
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    visible: false,
    delay: 0,
    duration: 2000,
    placement: 'center',
    animateType: 'scale',
    theme: 'error',
    top: 80,
    bottom: 40,
  }

  constructor() {
    super(...arguments);
    this.state = {
      visible: this.props.visible,
      contentHeight: 0,
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
      this.props.onShow && this.props.onShow();
      this.animateView && this.animateView.in(() => {
        this._animating = false;
        this.props.onShown && this.props.onShown();
        if (this.props.duration > 0) {
          this._hideTimeout = setTimeout(() => this._hide(), this.props.duration);
        }
      });
    }
  };

  _hide = () => {
    clearTimeout(this._showTimeout);
    clearTimeout(this._hideTimeout);

    if (!this._animating) {
      this.props.onHide && this.props.onHide();
      
      this.animateView && this.animateView.out(() => {
        this._animating = false;
        this.setState({
          visible: false,
        });
        this.props.onHidden && this.props.onHidden();
      });
    }
  };

  // 内容 onLayout
  measureView(event) {
    this.setState({
      contentHeight: event.nativeEvent.layout.height,
    });
  }

  // 构建容器样式
  buildContainerStyle = () => {
    const { placement, top, bottom } = this.props;
    let dynamicStyle = {};
    switch (placement) {
      case 'center':
        dynamicStyle.marginTop = -this.state.contentHeight / 2;
        break;
      case 'top':
        dynamicStyle.top = top;
        break;
      case 'bottom':
        dynamicStyle.bottom = bottom;
        break;
      case 'left':
      case 'right':
        dynamicStyle.top = top;
        break;
      default:
    }
    return StyleSheet.flatten([styles.container, styles[placement], dynamicStyle]);
  }

  // 构建内容
  buildContentStyle() {
    const { theme } = this.props;
    let dynamicStyle = {};
    switch (theme) {
      case 'info':
        dynamicStyle.backgroundColor = Theme.info;
        break;
      case 'success':
        dynamicStyle.backgroundColor = Theme.success;
        break;
      case 'error':
        dynamicStyle.backgroundColor = Theme.error;
        break;
      default:
        dynamicStyle.backgroundColor = Theme.title;
    }
    return StyleSheet.flatten([styles.content, dynamicStyle]);
  }

  // 生成按钮文字
  renderLabel() {
    const { children } = this.props;

    const labelStyleFinaly = StyleSheet.flatten([styles.label]);

    if (children) {
      let childElements = [];
      React.Children.forEach(children, (item) => {
        if (typeof item === 'string') {
          childElements.push(<Text key={item} style={labelStyleFinaly}>{item}</Text>);
        } else if (typeof item === 'number') {
          childElements.push(<Text key={item} style={labelStyleFinaly}>{item + ''}</Text>);
        } else if (React.isValidElement(item)) {
          childElements.push(item);
        }
      });
      // if(childElements.length && childElements.length > 1) {
      //   return <Text style={labelStyleFinaly} numberOfLines={1}>{childElements}</Text>;
      // }
      // return <Text style={labelStyleFinaly} numberOfLines={1}>{childElements}</Text>;
      return childElements;
    }
    return null;
  }

  render() {
    const {  animateType } = this.props;
    return this.state.visible ? (
      <View style={this.buildContainerStyle()}>
        <AnimateView ref={ele => this.animateView = ele} type={animateType}>
          <View style={this.buildContentStyle()} onLayout={(event) => this.measureView(event)}>
            {this.renderLabel()}
          </View>
        </AnimateView>
      </View>
    ) : null;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
  center: {
    alignSelf: 'center',
    top: '50%',
  },
  top: {
    alignSelf: 'center',
  },
  bottom: {
    alignSelf: 'center',
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#4c4c4c',

  },
  label: {
    color: '#fff',
    fontSize: 15,
  }
});