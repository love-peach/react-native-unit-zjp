import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Modal, View, TouchableOpacity, Image, Platform, NativeModules, Dimensions } from 'react-native';

import Mask from '../Mask/Mask';
import AnimateView from '../AnimateView/AnimateView';

const RNWindow = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const closeIconDefaultSource = require('../../icons/close.png');

/**
 * @param {Boolean} visible 控制 modal 是否显示
 * @param {String} placement 弹框内容出现位置，可选值为 [center, bottom, top, left, right]
 * @param {Number|String} width 内容块宽度 可以设置数值 或者 字符串。当为数值，则宽度为具体值；当为字符串，则宽度为百分比；
 * @param {Object} contentStyle 内容块样式
 * 
 * @param {Boolean} closable 是否显示关闭按钮
 * @param {Object} closeStyle 关闭按钮样式
 * @param {Function} onClosePress 关闭按钮点击事件
 * 
 * @param {Function} maskBgColor 遮罩层的背景色
 * @param {Function} maskClosable 是否允许点击遮罩层关闭弹框
 * @param {Function} onMaskPress 遮罩层点击事件
 * 
 */

// TODO: 如果没有提供 onMaskPress 或者 onClosePress 函数，并且 设置 closable = true maskClosable = true，则关闭后，父组件 state 改变后，会自动弹出弹框。所以最好提供手动关闭的函数。
export default class MyModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    placement: PropTypes.oneOfType(['center', 'top', 'bottom', 'left', 'right']),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),

    fade: PropTypes.bool,

    closable: PropTypes.bool,
    closeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    onClosePress: PropTypes.func,

    maskClosable: PropTypes.bool,
    maskBgColor: PropTypes.string,
    onMaskPress: PropTypes.func,

    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {
    placement: 'center',
    closable: false,
    maskClosable: false,
    maskBgColor: 'rgba(0, 0, 0, .5)',
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount() {
    this.setState({
      isVisible: this.props.visible,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.visible === this.props.visible && nextProps.visible === this.state.isVisible) {
      return;
    }
    if (nextProps.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.setState({
      isVisible: true,
    });
  }

  hide() {
    this.animateView && this.animateView.out();
    this.maskAnimateView && this.maskAnimateView.out();
    setTimeout(() => {
      this.setState({
        isVisible: false,
      });
    }, 200);
  }

  handleMaskClick = () => {
    this.hide();
  };

  handleCloseClick = () => {
    this.hide();
  };

  // 构建内容容器样式
  buildContentStyle() {
    const { placement, width, contentStyle } = this.props;
    const isWidthNum = typeof width === 'number';
    let additionStyle = {};
    switch (placement) {
      case 'center':
        additionStyle = {
          width: width ? (isWidthNum ? width : `${width}%`) : RNWindow.width * 0.8,
          borderRadius: 5,
          padding: 10,
        };
        break;
      case 'top':
        additionStyle = {
          width: width ? (isWidthNum ? width : `${width}%`) : RNWindow.width,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          padding: 10,
          paddingTop: STATUSBAR_HEIGHT,
        };
        break;
      case 'bottom':
        additionStyle = {
          width: width ? (isWidthNum ? width : `${width}%`) : RNWindow.width,
          padding: 10,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        };
        break;
      case 'left':
      case 'right':
        additionStyle = {
          width: width ? (isWidthNum ? width : `${width}%`) : RNWindow.width * 0.8,
          height: '100%',
          paddingTop: STATUSBAR_HEIGHT,
        };
        break;
      default:
        additionStyle = {
          width: width ? (isWidthNum ? width : `${width}%`) : RNWindow.width,
        };
    }
    return StyleSheet.flatten([styles.content, additionStyle, contentStyle]);
  }

  // 生成动画视图组件
  buildAnimateViewProps = () => {
    const { fade, placement, width } = this.props;
    let WrapComponentProps = {};
    const isWidthNum = typeof width === 'number';

    switch(placement) {
      case 'center':
        WrapComponentProps.type = 'scale';
        break;
      case 'bottom':
        WrapComponentProps.type = 'slide-bottom';
        WrapComponentProps.height = this.state.contentHeight;
        break;
      case 'top':
        WrapComponentProps.type = 'slide-top';
        WrapComponentProps.height = this.state.contentHeight;
        break;
      case 'left':
        WrapComponentProps.type = 'slide-left';
        WrapComponentProps.width = width ? (isWidthNum ? width : RNWindow.width * width / 100) : RNWindow.width * 0.8;
        break;
      case 'right':
        WrapComponentProps.type = 'slide-right';
        WrapComponentProps.width = width ? (isWidthNum ? width : RNWindow.width * width / 100) : RNWindow.width * 0.8;
        break;
    }
    if (fade) {
      WrapComponentProps.type = 'fade';
    }
    return WrapComponentProps;
  }
  
  // 内容 onLayout
  measureView(event) {
    const { placement } = this.props;
    if (placement === 'top' || placement === 'bottom') {
      this.setState({
        contentHeight: event.nativeEvent.layout.height,
      });
    }
  }

  // 生成关闭按钮
  renderCloseIcon() {
    let { closable, onClosePress, placement, closeStyle } = this.props;
    if (closable) {
      return (
        <TouchableOpacity onPress={onClosePress || this.handleCloseClick} style={[styles.closeIcon, { top: placement === 'bottom' || placement === 'center' ? 0 : 8 + STATUSBAR_HEIGHT }, { ...closeStyle }]}>
          <Image style={{ width: 15, height: 15 }} source={closeIconDefaultSource} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const { visible, placement, maskBgColor, maskClosable, onMaskPress, onClosePress, ...resProps } = this.props;
    const { isVisible } = this.state;

    return (
      <Modal visible={isVisible} {...resProps } transparent hardwareAccelerated animationType="fade">
        <AnimateView
          type="fade"
          style={styles.maskWrap}
          ref={ref => {
            this.maskAnimateView = ref;
          }}
        >
          <Mask onPress={maskClosable ? (onMaskPress || this.handleMaskClick) : null} bgColor={maskBgColor} />
        </AnimateView>

        <View style={StyleSheet.flatten([styles.container, styles[placement]])} pointerEvents="box-none">
          <AnimateView
            ref={ref => {
              this.animateView = ref;
            }}
            {...this.buildAnimateViewProps() }
          >
            <View style={this.buildContentStyle()}  onLayout={(event) => this.measureView(event)}>
              {this.renderCloseIcon()}
              {this.props.children}
            </View>
          </AnimateView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  top: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  content: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 99,
    padding: 8,
  },
  maskWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
