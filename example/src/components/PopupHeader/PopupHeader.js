
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import SplitLine from '../SplitLine/SplitLine';

import Theme from '../../themes/Theme';


export default class PopupHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    leftText: PropTypes.string,
    rightText: PropTypes.string,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,

    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    leftText: '取消',
    rightText: '确认',
  }


  render() {
    const { style, title, leftText, rightText, onLeftPress, onRightPress } = this.props;
    return(
      <View>
        <View style={StyleSheet.flatten([styles.headerWrap, style])}>
          <Button size="lg" radius={0} type="text" color={Theme.title} onPress={() => { onLeftPress && onLeftPress(); }}>{leftText}</Button>
          <Text style={styles.title}>{title}</Text>
          <Button size="lg" radius={0}  type="text" color={Theme.warning} onPress={() => { onRightPress && onRightPress(); }}>{rightText}</Button>
        </View>
        <SplitLine />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  headerWrap: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: Theme.titleMain,
    textAlign: 'center',
  }
});