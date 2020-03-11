import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button, ButtonGroup, ButtonRadio } from '../components';


export default class ButtonGroupDemo extends Component {
  static navigationOptions = () => ({
    title: 'ButtonGroupDemo',
  });

  state = {
    selectValue: '一',
    size: 'md',
    type: 'primary',
    activeType: 'primary',
    ghost: true,
    activeGhost: false,
    radius: '0',
    vertical: false,
  };

  setValueByKey = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <ScrollView>
        <Text style={styles.title}>demo:</Text>
        <ButtonRadio
          value={this.state.selectValue}
          options={['一','二','三','四','五','六']}
          size={this.state.size}
          type={this.state.type}
          activeType={this.state.activeType}
          ghost={this.state.ghost}
          activeGhost={this.state.activeGhost}
          radius={parseInt(this.state.radius, 10)}
          vertical={this.state.vertical}
          onPress={(v) => {this.setValueByKey('selectValue', v);}}
        />

        <Text style={styles.title}>size</Text>
        <ButtonRadio value={this.state.size} options={['xl','lg','md','sm','xs']} onPress={(v) => {this.setValueByKey('size', v);}} />

        <Text style={styles.title}>type</Text>
        <ButtonRadio value={this.state.type} options={['default','primary', 'info', 'warning', 'success', 'error', 'gray', 'golden']} onPress={(v) => {this.setValueByKey('type', v);}} size="sm" />

        <Text style={styles.title}>activeType</Text>
        <ButtonRadio value={this.state.activeType} options={['default','primary', 'info', 'warning', 'success', 'error', 'gray', 'golden']} onPress={(v) => {this.setValueByKey('activeType', v);}} size="sm" />

        <Text style={styles.title}>ghost</Text>
        <ButtonRadio value={this.state.ghost} options={[{ label: 'false', value: false }, { label: 'true', value: true }]} onPress={(v) => {this.setValueByKey('ghost', v);}} />

        <Text style={styles.title}>activeGhost</Text>
        <ButtonRadio value={this.state.activeGhost} options={[{ label: 'false', value: false }, { label: 'true', value: true }]} onPress={(v) => {this.setValueByKey('activeGhost', v);}} />

        <Text style={styles.title}>radius</Text>
        <ButtonRadio value={this.state.radius} options={['0', 2, 5, 10, 1000]} onPress={(v) => {this.setValueByKey('radius', v);}} />

        <Text style={styles.title}>vertical</Text>
        <ButtonRadio value={this.state.vertical} options={[{ label: 'false', value: false }, { label: 'true', value: true }]} onPress={(v) => {this.setValueByKey('vertical', v);}} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
});