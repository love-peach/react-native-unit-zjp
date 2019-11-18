import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InputItem, Button } from '../../../component';

export default class ModalDemo extends Component {
  static navigationOptions = () => ({
    title: 'input-demo',
  });

  constructor(props) {
    super(props);
    this.state = {
      value1: '123',
    };
  }

  handleChangeValue(value, fild) {
    this.setState({
      [fild]: value,
    });
  }

  render() {
    return (
      <ScrollView style={{ borderWidth: 1, backgroundColor: '#fff' }} keyboardShouldPersistTaps="handled">
        <View style={{ padding: 10 }}>
          <Text style={styles.titleText}>默认样式:</Text>
          <InputItem label="默认样式" />

          <Text style={styles.titleText}>labelPosition</Text>
          <InputItem
            label="手机号"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
            labelPosition="top"
          />
          <InputItem
            label="手机号"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
            labelPosition="left"
          />

          <Text style={styles.titleText}>icon</Text>
          <InputItem
            icon={<Icon name="md-home" size={18} />}
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />
          <InputItem
            // icon={<Icon name="md-home" size={18} style={{ marginRight: 5 }} />}
            label="手机号"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />

          <Text style={styles.titleText}>extra</Text>
          <InputItem
            label="手机号"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
            extra={<Button size="md" label="发送验证码" outline />}
          />

          <Text style={styles.titleText}>textAlign</Text>
          <InputItem
            label="手机号"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />
          <InputItem
            label="手机号"
            textAlign="right"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />

          <Text style={styles.titleText}>type</Text>
          <InputItem
            label="number"
            type="number"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />
          <InputItem
            label="pwd"
            type="password"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />
          <InputItem
            type="textarea"
            borderColor="#C9CDD5"
            numberOfLines={6}
            maxLength={70}
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />

          <Text style={styles.titleText}>labelWidth</Text>
          <InputItem
            label="邮箱"
            labelWidth={70}
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />
          <InputItem
            label="手机号"
            labelWidth={70}
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />
          <InputItem
            label="家庭住址"
            labelWidth={70}
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />

          <Text style={styles.titleText}>labelAlign</Text>
          <InputItem
            label="邮箱"
            labelWidth={70}
            labelAlign="right"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />
          <InputItem
            label="家庭住址"
            labelWidth={70}
            labelAlign="right"
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />

          <Text style={styles.titleText}>线框 三种方式:</Text>
          <InputItem placeholder="line" labelPosition="top" containerType="line" />
          <InputItem label="line" labelPosition="top" containerType="line" />
          <InputItem label="line" containerType="line" />
          <InputItem label="box" labelPosition="top" containerType="box" />
          <InputItem label="box" containerType="box" />
          <InputItem label="fill" labelPosition="top" containerType="fill" />
          <InputItem label="fill" containerType="fill" />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
});
