import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Button, Modal, Tip } from '../components';

const tipIcon = require('../icons/phone_green.png');

export default class TipDemo extends Component {
  static navigationOptions = () => ({
    title: 'TipDemo',
  });

  render() {
    return (
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Tip style={styles.tipDemo} type="gray">温馨提示：发Joe我骄傲偶爱家违法</Tip>
          <Tip style={styles.tipDemo} type="primary">温馨提示：发Joe我骄傲偶爱家违法</Tip>
          <Tip style={styles.tipDemo} type="info">温馨提示：发Joe我骄傲偶爱家违法</Tip>
          <Tip style={styles.tipDemo} type="warning">温馨提示：发Joe我骄傲偶爱家违法</Tip>
          <Tip style={styles.tipDemo} type="success">温馨提示：发Joe我骄傲偶爱家违法</Tip>
          <Tip style={styles.tipDemo} type="error">温馨提示：发Joe我骄傲偶爱家违法</Tip>
          <Tip style={styles.tipDemo} type="golden">温馨提示：发Joe我骄傲偶爱家违法</Tip>
          <Tip style={styles.tipDemo} title="客服热线">欢迎拨打，188-xxxx-xxxx。</Tip>
          <Tip style={styles.tipDemo} title="客服热线" icon={tipIcon}>欢迎拨打，188-xxxx-xxxx。Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, modi!</Tip>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  tipDemo: {
    marginBottom: 10,
  },
});
