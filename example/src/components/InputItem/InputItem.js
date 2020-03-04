import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SplitLine from '../SplitLine/SplitLine';
import Theme from '../../themes/Theme';

const isIos = Platform.OS === 'ios';
// const isIos = false;

export default class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      isFocus: false,
      myValue: '',
    };
  }

  static propTypes = {
    type: PropTypes.oneOf(['textarea', 'number', 'password', 'default', 'number-pad', 'decimal-pad', 'numeric', 'email-address', 'phone-pad']),
    label: PropTypes.string,
    labelPosition: PropTypes.oneOf(['left', 'top']),
    labelWidth: PropTypes.number,
    labelAlign: PropTypes.oneOf(['left', 'right']),
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.number, PropTypes.func]),
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    line: PropTypes.bool,
    lineColor: PropTypes.string,
    lineColorActive: PropTypes.string,
    lineStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    showPasswordControl: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    extraStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    tip: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    tipStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    
    textAlign: PropTypes.oneOf(['left', 'right']),
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.oneOf(['default', 'number']),
    clearButtonMode: PropTypes.oneOf(['while-editing']),
    numberOfLines: PropTypes.number,

    handleOnFocus: PropTypes.func,
    handleOnBlur: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  }

  static defaultProps = {
    type: 'default',
    labelPosition: 'left',
    labelAlign: 'left',
    textAlign: 'left',
    lineColor: Theme.borderDark,
    placeholder: '请输入',
    placeholderTextColor: Theme.textPlaceholder,
    line: true,
    showPasswordControl: true,
    keyboardType: 'default',
    clearButtonMode: 'while-editing',
    onChange: null,
  };

  // componentDidMount() {
  //   const { value } = this.props;
  //   if (value) {
  //     this.setState({
  //       myValue: value,
  //     });
  //   }
  // }

  //
  handleChange = value => {
    this.setState({
      myValue: value,
    });
    this.props.onChange && this.props.onChange(value);
  };

  handleFocus = () => {
    // 这个是触发 formItem 的聚焦事件
    const { myValue } = this.state;
    this.props.handleOnFocus && this.props.handleOnFocus(myValue);
    this.props.onFocus && this.props.onFocus(myValue);
    this.setState({
      isFocus: true,
    });
  };

  handleBlur = () => {
    // 这个是触发 formItem 的失焦事件
    const { myValue } = this.state;
    this.props.handleOnBlur && this.props.handleOnBlur(myValue);
    this.props.onBlur && this.props.onBlur(myValue);
    this.setState({
      isFocus: false,
    });
  };

  focus() {
    this.inputRef.focus();
  }

  // 切换 密码显示 与隐藏
  handleTogglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  // 生成 icon
  renderIcon() {
    const { icon, iconStyle } = this.props;
    if(!icon) {
      return null;
    }
    if (React.isValidElement(icon)) return icon;
    return <Image source={icon} style={[styles.icon, iconStyle]} />;
  }

  // 生成 label
  renderLabel() {
    const { label, labelPosition, labelWidth, labelAlign, labelStyle } = this.props;
    if(!label) {
      return null;
    }
    if (React.isValidElement(label)) return label;
    let dynamicStyle = {};
    let dynamicStyle2= {};

    switch (labelPosition) {
    case 'top':
      dynamicStyle = styles.labelTop;
      break;
    case 'left':
      dynamicStyle = styles.labelLeft;
      break;
    default:
      dynamicStyle = styles.labelLeft;
    }
    
    if (labelWidth) {
      dynamicStyle2.width = labelWidth;
      dynamicStyle2.textAlign = labelAlign;
    }

    return <Text style={StyleSheet.flatten([styles.label, dynamicStyle, dynamicStyle2, labelStyle])}>{label}</Text>;
  }

  // 生成关闭按钮
  renderClearIcon() {
    const { clearButtonMode, type } = this.props;

    const { isFocus, myValue } = this.state;
    const androidClearButtonMode = clearButtonMode && clearButtonMode !== 'never';

    if (!isIos && myValue && isFocus && androidClearButtonMode && type !== 'textarea') {
      return (
        <TouchableOpacity style={styles.closeIconBtn} onPress={this.handleChange.bind(this, '')}>
          <Icon name="md-close-circle" size={18} color="#ccc" />
        </TouchableOpacity>
      );
    }

    return null;
  }

  // 生成最右部分
  renderExtra() {
    const { extra, extraStyle } = this.props;
    if (!extra) return null;
    if (React.isValidElement(extra)) {
      return <View style={[styles.extraWrap, extraStyle]}>{extra}</View>;
    }
    return <Text style={[styles.extraWrap, extraStyle]}>{extra}</Text>;
  }

  // 生成最右部分 显示密码控制
  renderPasswordControl() {
    const { type, showPasswordControl } = this.props;
    const { showPassword } = this.state;
    if (type === 'password' && showPasswordControl) {
      let imageSource = showPassword ? require('../../icons/eyes_open.png') : require('../../icons/eyes_close.png');
      return (
        <TouchableOpacity style={styles.passwordControlWrap} onPress={this.handleTogglePassword}>
          <Image style={styles.passwordControlImage} source={imageSource} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  // 生成 输入计数
  renderCount() {
    const { type, maxLength } = this.props;
    const { myValue } = this.state;
    if (maxLength && type === 'textarea') {
      return (
        <Text style={styles.count}>
          {myValue.length || 0} / {maxLength}
        </Text>
      );
    }
    return null;
  }

  // 生成 分割线
  renderSplitLine() {
    const { type, line, lineStyle, lineColor, lineColorActive } = this.props;
    const { isFocus } = this.state;

    if (type === 'textarea') {
      return null;
    }

    const activeColor = lineColorActive === 'none' ? lineColor : lineColorActive || Theme.split_line_active_color;

    if (line) {
      return <SplitLine color={isFocus ? activeColor : lineColor} style={lineStyle} />;
    }
    return null;
  }

  // 生成底部 tip
  renderTip() {
    const { tip, tipStyle } = this.props;
    if (tip) {
      let tipEle = null;
      if (React.isValidElement(tip)) {
        tipEle = tip;
      } else {
        tipEle = <Text style={[styles.tip, tipStyle]}>{tip}</Text>;
      }
      return <View style={styles.tipWrap}>{tipEle}</View>;
    }
    return null;
  }

  // 输入框样式
  buildInputStyle() {
    const { inputStyle, type, numberOfLines, lineColor } = this.props;
    let dynamicStyle = {};
    if (type === 'textarea') {
      dynamicStyle.height = (numberOfLines - 1) * 25;
      dynamicStyle.paddingLeft = 5;
      dynamicStyle.paddingRight = 5;
      dynamicStyle.borderWidth = 0.5;
      dynamicStyle.borderColor = lineColor;
      dynamicStyle.borderRadius = 5;
    }
    return [styles.inputStyle, dynamicStyle, inputStyle];
  }

  // 过滤输入框属性
  buildInputProps() {
    
    const { type, label, labelPosition, labelWidth, labelAlign, labelStyle, icon, iconStyle, line, lineColor, lineColorActive, lineStyle, showPasswordControl, extra, extraStyle, tip, tipStyle, inputStyle, style, ...rest } = this.props;
    const { showPassword } = this.state;

    let inputProps = { ...rest };

    switch (type) {
    case 'number':
      inputProps.dataDetectorTypes = 'phoneNumber';
      inputProps.keyboardType = 'number-pad';
      break;
    case 'password':
      inputProps.secureTextEntry = !showPassword;
      break;
    case 'textarea':
      inputProps.multiline = true;
      inputProps.numberOfLines = this.props.numberOfLines || 6;
      inputProps.maxLength = this.props.maxLength || 180;
      break;
    default:
      inputProps.keyboardType = 'default';
    }
    if (!isIos) {
      inputProps.clearButtonMode = 'never';
    }
    return inputProps;
  }

  render() {
    const { style } = this.props;
    return (
      <View style={StyleSheet.flatten([styles.container, style])}>
        {this.renderIcon()}
        {this.renderLabel()}
        <TextInput
          {...this.buildInputProps()}
          style={this.buildInputStyle()}
          onChange={() => null}
          onChangeText={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          underlineColorAndroid="transparent"
          ref={ref => {
            this.inputRef = ref;
          }}
        />
        {this.renderClearIcon()}
        {this.renderExtra()}
        {this.renderPasswordControl()}
        {this.renderCount()}
        {this.renderSplitLine()}
        {this.renderTip()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: Theme.input_weight_label,
    fontSize: Theme.input_font_size_label,
    color: Theme.input_color_label,
  },
  labelLeft: {
    marginRight: 8,
    fontSize: Theme.input_font_size_label,
  },
  labelTop: {
    width: '100%',
    fontSize: Theme.input_font_size_label_top,
    paddingTop: 15,
  },
  icon: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  inputStyle: {
    flexBasis: 50,
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: Theme.input_font_size_input,
    textAlignVertical: 'top',
    color: Theme.input_color_input,
    fontWeight: Theme.input_weight_input,
  },
  closeIconWrap: {
    position: 'relative',
    marginLeft: 5,
    width: 18,
    height: 18,
  },
  closeIconBtn: {
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  passwordControlWrap: {
    marginLeft: 10,
    padding: 5,
  },
  passwordControlImage: {
    width: 18,
    height: 18,
  },
  extraWrap: {
    position: 'relative',
    marginLeft: 5,
  },
  count: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  tipWrap: {
    width: '100%',
    marginTop: 5,
  },
  tip: {
    fontSize: Theme.input_font_size_tip,
    fontWeight: Theme.input_weight_tip,
    color: Theme.input_color_tip,
  },
});
