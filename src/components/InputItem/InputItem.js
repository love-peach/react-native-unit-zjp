import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const isIos = Platform.OS === 'ios';
// const isIos = false;

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  container: {
    // borderColor: '#F0F1F5',
    position: 'relative',
  },
  content: {},
  inputStyle: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    textAlignVertical: 'center',
    color: '#121C32',
    fontWeight: '500',
  },
  label: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lableIcon: {
    width: 20,
    height: 20,
  },
  lableText: {
    fontSize: 15,
    color: '#121C32',
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
  extraWrap: {
    position: 'relative',
    marginLeft: 5,
  },
  count: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  tip: {
    fontSize: 13,
    fontWeight: '400',
    color: '#C9CDD5',
  },
});

export default class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      myValue: '',
    };
  }

  static defaultProps = {
    labelPosition: 'left',
    containerType: 'line', // line box fill
    labelAlign: 'left',
    borderColor: '#F0F1F5',
    borderColorActive: '#317AF1',
    onChange: null,
    textAlign: 'left',
    placeholder: '请输入',
    placeholderTextColor: '#C7C6CC',
    autoFocus: false,
    autoCorrect: true,
    keyboardType: 'default',
    maxLength: null,
    editable: true,
    clearButtonMode: 'while-editing',
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

  renderLabel() {
    const { icon, label, labelStyle } = this.props;
    if (!icon && !label) {
      return null;
    }
    return (
      <View style={[styles.label, labelStyle]}>
        {icon ? this.renderLabelIcon() : null}
        {label ? this.renderLabelText() : null}
      </View>
    );
  }

  renderLabelIcon() {
    const { icon, labelIconStyle } = this.props;
    if (React.isValidElement(icon)) return icon;
    return <Image source={icon} style={[styles.lableIcon, labelIconStyle]} />;
  }

  renderLabelText() {
    const { label, labelPosition, labelWidth, labelAlign, labelTextStyle } = this.props;
    if (React.isValidElement(label)) return label;
    let dynamicStyle = {};
    switch (labelPosition) {
    case 'top':
      dynamicStyle.fontSize = 12;
      dynamicStyle.marginBottom = 4;
      break;
    case 'left':
    default:
      dynamicStyle.fontSize = 15;
      dynamicStyle.marginRight = 4;
    }
    if (labelWidth) {
      dynamicStyle.width = labelWidth;
      dynamicStyle.textAlign = labelAlign;
    }
    return <Text style={[styles.lableText, dynamicStyle, labelTextStyle]}>{label}</Text>;
  }

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

  renderExtra() {
    const { extra, extraStyle } = this.props;
    if (!extra) return null;
    if (React.isValidElement(extra)) {
      return <View style={[styles.extraWrap, extraStyle]}>{extra}</View>;
    }
    return <View style={[styles.extraWrap, extraStyle]}>{extra}</View>;
  }

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

  renderTip() {
    const { tip, tipStyle } = this.props;
    if (React.isValidElement(tip)) return tip;
    if (tip) {
      return <Text style={[styles.tip, tipStyle]}>{tip}</Text>;
    }
    return null;
  }

  // 容器样式 包含 label input closeIcon 的容器，不包含 tip；控制 布局，label 和 input 是 上下 布局 还是 左右布局
  buildContainerStyle() {
    const { labelPosition, containerType, borderColor, borderColorActive, type, containerStyle } = this.props;
    const { isFocus } = this.state;
    const activeColor = borderColorActive === 'none' ? borderColor : borderColorActive;

    let dynamicStyle = {};
    switch (labelPosition) {
    case 'top':
      dynamicStyle.flexDirection = 'column';
      break;
    case 'left':
      dynamicStyle.flexDirection = 'row';
      dynamicStyle.alignItems = 'center';
      break;
    default:
      dynamicStyle.flexDirection = 'column';
    }
    if (type !== 'textarea') {
      if (containerType === 'line') {
        dynamicStyle.borderBottomWidth = 1;
        dynamicStyle.borderBottomColor = isFocus ? activeColor : borderColor;
      }
      if (labelPosition === 'left') {
        if (containerType === 'box') {
          dynamicStyle.borderWidth = 1;
          dynamicStyle.borderColor = isFocus ? activeColor : borderColor;
        }
        if (containerType === 'fill') {
          dynamicStyle.backgroundColor = isFocus ? activeColor : borderColor;
        }
      }
    }
    return [styles.container, dynamicStyle, containerStyle];
  }

  // 内容样式 包含 input closeIcon 的容器，不包含 label；控制 内容边框？
  buidContentStyle() {
    const { labelPosition, containerType, borderColor, borderColorActive, contentStyle } = this.props;
    const { isFocus } = this.state;
    const activeColor = borderColorActive === 'none' ? borderColor : borderColorActive;

    let dynamicStyle = {};
    if (labelPosition === 'left') {
      dynamicStyle.flex = 1;
    }
    dynamicStyle.flexDirection = 'row';
    dynamicStyle.alignItems = 'center';

    if (labelPosition === 'top') {
      if (containerType === 'box') {
        dynamicStyle.borderWidth =0.5;
        dynamicStyle.borderColor = isFocus ? activeColor : borderColor;
      }
      if (containerType === 'fill') {
        dynamicStyle.backgroundColor = isFocus ? activeColor : borderColor;
        dynamicStyle.borderWidth = 0.5;
        dynamicStyle.borderColor = isFocus ? activeColor : borderColor;
      }
    }
    return [styles.content, dynamicStyle, contentStyle];
  }

  // 输入框样式
  buildInputStyle() {
    const { inputStyle, type, numberOfLines, borderColor } = this.props;
    let dynamicStyle = {};
    if (type === 'textarea') {
      dynamicStyle.height = (numberOfLines - 1) * 25;
      dynamicStyle.paddingLeft = 5;
      dynamicStyle.paddingRight = 5;
      dynamicStyle.borderWidth = 0.5;
      dynamicStyle.borderColor = borderColor;
      dynamicStyle.borderRadius = 5;
    }
    return [styles.inputStyle, dynamicStyle, inputStyle];
  }

  buildInputProps() {
    const { type, style, containerType, label, labelAlign, labelWidth, labelPosition, containerStyle, contentStyle, inputStyle, borderColor, borderColorActive, ...rest } = this.props;
    let inputProps = { ...rest };

    switch (type) {
    case 'number':
      inputProps.dataDetectorTypes = 'phoneNumber';
      inputProps.keyboardType = 'number-pad';
      break;
    case 'password':
      inputProps.secureTextEntry = true;
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
    const { style, inputStyle, labelPosition, clearButtonMode, rows, ...rest } = this.props;
    return (
      <View style={[styles.wrap, style]}>
        <View style={this.buildContainerStyle()}>
          {this.renderLabel()}
          <View style={this.buidContentStyle()}>
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
            {this.renderCount()}
          </View>
        </View>
        {this.renderTip()}
      </View>
    );
  }
}
