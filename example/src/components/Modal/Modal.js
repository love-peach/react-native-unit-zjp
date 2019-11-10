import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Modal, ScrollView, View, TouchableWithoutFeedback, TouchableOpacity, Text, Image, Platform, NativeModules } from 'react-native';

import Mask from './Mask';
import AnimateViewOfFade from './AnimateViewOfFade';
import AnimateViewOfScale from './AnimateViewOfScale';
import AnimateViewOfSliderBottom from './AnimateViewOfSliderBottom';
import AnimateViewOfSliderTop from './AnimateViewOfSliderTop';
import AnimateViewOfSliderLeft from './AnimateViewOfSliderLeft';
import AnimateViewOfSliderRight from './AnimateViewOfSliderRight';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const closeIconDefaultSource = require('./close_gray.png');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  left: {},
  right: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  container: {
    position: 'relative',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 99,
    padding: 8,
  },
});

export default class MyModal extends Component {
  static propTypes = {
    // modal 动画类型; 默认: fade
    modalAnimationType: PropTypes.oneOfType(['fade', 'slider', 'none']),
    // content 动画类型; 默认: scale
    // contentAnimationType: PropTypes.oneOfType(['scale', 'slider', 'none']),
    // 是否显示右上角的关闭按钮; 默认: true
    closable: PropTypes.bool,
    // 关闭按钮样式
    closeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    // 是否允许点击遮罩层关闭弹框; 默认: true
    maskClosable: PropTypes.bool,
    // 遮罩层的背景色; 默认: rgba(0, 0, 0, .4)
    maskBackgroundColor: PropTypes.string,
    // 内容块的位置; 默认: center
    placement: PropTypes.oneOfType(['center', 'top', 'bottom', 'left', 'right']),
    // 内容块的宽度;
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // 内容块样式
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    visible: PropTypes.bool,
    onMaskPress: PropTypes.func,
    onClosePress: PropTypes.func,
    onBackdropPress: PropTypes.func,
  };

  static defaultProps = {
    modalAnimationType: 'fade',
    // contentAnimationType: 'scale',
    closable: true,
    maskClosable: true,
    maskBackgroundColor: 'rgba(0, 0, 0, .5)',
    placement: 'center',
    // width: '100%',
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentWillMount() {
    this.setState({
      isVisible: this.props.visible,
    });
  }

  componentWillReceiveProps(props) {
    if (props.visible === this.props.visible) {
      return;
    }
    if (props.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  show() {
    this.setState({
      isVisible: true,
    });
  }

  hide() {
    this.animateView.out();
    setTimeout(() => {
      this.setState({
        isVisible: false,
      });
    }, 150);
  }

  buildWrapperStyle() {
    const { placement } = this.props;
    return StyleSheet.flatten([styles.wrapper, styles[placement]]);
  }

  buildContainerStyle() {
    const { placement, width, containerStyle } = this.props;
    let additionStyle = {};
    switch (placement) {
      case 'center':
        additionStyle = {
          width: width || '80%',
          marginHorizontal: '10%',
        };
        break;
      case 'top':
        additionStyle = {
          width: width || '100%',
          borderRadius: 0,
          paddingTop: STATUSBAR_HEIGHT,
        };
        break;
      case 'bottom':
        additionStyle = {
          width: width || '100%',
          borderRadius: 0,
        };
        break;
      case 'left':
        additionStyle = {
          width: width || '80%',
          borderRadius: 0,
          height: '100%',
          paddingTop: STATUSBAR_HEIGHT,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        };
        break;
      case 'right':
        additionStyle = {
          width: width || '80%',
          borderRadius: 0,
          height: '100%',
          paddingTop: STATUSBAR_HEIGHT,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        };
        break;
      default:
        additionStyle = {
          width: width || '100%',
        };
    }
    return StyleSheet.flatten([styles.container, additionStyle, containerStyle]);
  }

  renderCloseIcon() {
    let { closable, onClosePress, onMaskPress, placement, closeStyle } = this.props;
    if (closable) {
      return (
        <TouchableOpacity onPress={onClosePress || onMaskPress} style={[styles.closeIcon, { top: placement === 'bottom' || placement === 'center' ? 0 : 8 + STATUSBAR_HEIGHT }, { ...closeStyle }]}>
          <Image style={{ width: 15, height: 15 }} source={closeIconDefaultSource} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderContent() {
    return (
      <View style={this.buildContainerStyle()}>
        {this.renderCloseIcon()}
        {this.props.children}
      </View>
    );
  }

  renderAnimateView() {
    const { placement, visible } = this.props;
    if (placement === 'center') {
      return (
        <AnimateViewOfScale
          ref={ref => {
            this.animateView = ref;
          }}
          visible={visible}
        >
          {this.renderContent()}
        </AnimateViewOfScale>
      );
    }

    if (placement === 'bottom') {
      return (
        <AnimateViewOfSliderBottom
          visible={visible}
          ref={ref => {
            this.animateView = ref;
          }}
        >
          {this.renderContent()}
        </AnimateViewOfSliderBottom>
      );
    }

    if (placement === 'top') {
      return (
        <AnimateViewOfSliderTop
          ref={ref => {
            this.animateView = ref;
          }}
          visible={visible}
        >
          {this.renderContent()}
        </AnimateViewOfSliderTop>
      );
    }

    if (placement === 'left') {
      return (
        <AnimateViewOfSliderLeft
          ref={ref => {
            this.animateView = ref;
          }}
          visible={visible}
        >
          {this.renderContent()}
        </AnimateViewOfSliderLeft>
      );
    }

    if (placement === 'right') {
      return (
        <AnimateViewOfSliderRight
          ref={ref => {
            this.animateView = ref;
          }}
          visible={visible}
        >
          {this.renderContent()}
        </AnimateViewOfSliderRight>
      );
    }

    return this.renderContent();
  }

  render() {
    const { modalAnimationType, maskBackgroundColor, maskClosable, onMaskPress, onBackdropPress } = this.props;
    const { isVisible } = this.state;

    return (
      <Modal visible={isVisible} transparent animationType={modalAnimationType} onRequestClose={onBackdropPress}>
        <Mask onMaskPress={maskClosable ? onMaskPress : null} maskBackgroundColor={maskBackgroundColor} />
        <View style={this.buildWrapperStyle()} pointerEvents="box-none">
          {this.renderAnimateView()}
        </View>
      </Modal>
    );
  }
}
