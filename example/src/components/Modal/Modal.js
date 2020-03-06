import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Modal, View, TouchableOpacity, Image, Platform, NativeModules } from 'react-native';

import Mask from '../Mask/Mask';

// import AnimateViewOfFade from './AnimateViewOfFade';
import AnimateViewOfScale from './AnimateViewOfScale';
import AnimateViewOfSliderBottom from './AnimateViewOfSliderBottom';
import AnimateViewOfSliderTop from './AnimateViewOfSliderTop';
import AnimateViewOfSliderLeft from './AnimateViewOfSliderLeft';
import AnimateViewOfSliderRight from './AnimateViewOfSliderRight';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const closeIconDefaultSource = require('../../icons/close.png');

/**
 * @param {Boolean} visible 控制 modal 是否显示
 * @param {String} placement 弹框内容出现位置，可选值为 [center, bottom, top, left, right]
 * @param {Number|String} width 内容块宽度 可以设置数值 或者 '100%'
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
export default class MyModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    placement: PropTypes.oneOfType(['center', 'top', 'bottom', 'left', 'right']),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),

    closable: PropTypes.bool,
    closeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    onClosePress: PropTypes.func,

    maskClosable: PropTypes.bool,
    maskBgColor: PropTypes.string,
    onMaskPress: PropTypes.func,

    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  };

  static defaultProps = {
    closable: true,
    maskClosable: false,
    maskBgColor: 'rgba(0, 0, 0, .5)',
    placement: 'center',
    // width: '100%',
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

  UNSAFE_componentWillReceiveProps(props) {
    if (props.visible === this.props.visible) {
      return;
    }
    if (props.visible) {
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
    this.animateView.out();
    setTimeout(() => {
      this.setState({
        isVisible: false,
      });
    }, 150);
  }

  // 构建内容容器样式
  buildContentStyle() {
    const { placement, width, contentStyle } = this.props;
    let additionStyle = {};
    switch (placement) {
      case 'center':
        additionStyle = {
          width: width || '80%',
          borderRadius: 5,
          padding: 10,
        };
        break;
      case 'top':
        additionStyle = {
          width: width || '100%',
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          padding: 10,
          paddingTop: STATUSBAR_HEIGHT,
        };
        break;
      case 'bottom':
        additionStyle = {
          width: width || '100%',
          padding: 10,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        };
        break;
      case 'left':
      case 'right':
        additionStyle = {
          width: width || '80%',
          height: '100%',
          paddingTop: STATUSBAR_HEIGHT,
        };
        break;
      default:
        additionStyle = {
          width: width || '100%',
        };
    }
    return StyleSheet.flatten([styles.content, additionStyle, contentStyle]);
  }

  // 生成动画视图组件
  renderAnimateView() {
    const { placement, visible } = this.props;
    let WrapComponent = null;
    switch(placement) {
      case 'center':
        WrapComponent = AnimateViewOfScale;
        break;
      case 'bottom':
        WrapComponent = AnimateViewOfSliderBottom;
        break;
      case 'top':
        WrapComponent = AnimateViewOfSliderTop;
        break;
      case 'left':
        WrapComponent = AnimateViewOfSliderLeft;
        break;
      case 'right':
        WrapComponent = AnimateViewOfSliderRight;
        break;
    }
    if(!WrapComponent) {
      return this.renderContent();
    }
    return (
      <WrapComponent
        ref={ref => {
          this.animateView = ref;
        }}
        visible={visible}
      >
        {this.renderContent()}
      </WrapComponent>
    );
  }

  // 生成内容
  renderContent() {
    return (
      <View style={this.buildContentStyle()}>
        {this.renderCloseIcon()}
        {this.props.children}
      </View>
    );
  }

  // 生成关闭按钮
  renderCloseIcon() {
    let { closable, onClosePress, placement, closeStyle } = this.props;
    if (closable) {
      return (
        <TouchableOpacity onPress={onClosePress} style={[styles.closeIcon, { top: placement === 'bottom' || placement === 'center' ? 0 : 8 + STATUSBAR_HEIGHT }, { ...closeStyle }]}>
          <Image style={{ width: 15, height: 15 }} source={closeIconDefaultSource} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const { placement, maskBgColor, maskClosable, onMaskPress, onClosePress, ...resProps } = this.props;
    const { isVisible } = this.state;

    return (
      <Modal visible={isVisible} transparent hardwareAccelerated animationType="fade" {...resProps }>
        <Mask onPress={maskClosable ? (onMaskPress || onClosePress) : null} bgColor={maskBgColor} />
        <View style={StyleSheet.flatten([styles.container, styles[placement]])} pointerEvents="box-none">
          {this.renderAnimateView()}
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
  },
  bottom: {
    justifyContent: 'flex-end',
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
});
