import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InputItem, Button } from '../components';

const iconDemo = require('../icons/phone_green.png');


export default class InputDemo extends Component {
  static navigationOptions = () => ({
    title: 'InputDemo',
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
      <ScrollView keyboardShouldPersistTaps="handled">

        <View style={{ padding: 10 }}>
          <Text style={styles.titleText}>默认样式:</Text>
          <InputItem label="默认样式" />

          <Text style={styles.titleText}>labelPosition</Text>
          <InputItem
            lineColorActive="red"
            label="手机号"
            value={this.state.value1}
            labelPosition="top"
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />
          <InputItem
            label="手机号"
            value={this.state.value1}
            labelPosition="top"
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />

          <Text style={styles.titleText}>icon</Text>
          <InputItem
            icon={iconDemo}
            value={this.state.value1}
            onChange={v => {
              console.log(v, 'v');
              this.handleChangeValue(v, 'value1');
            }}
          />
          <InputItem
            icon={iconDemo}
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
            extra={<Button size="sm" type="primary"> 发送验证码 </Button>}
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
            showPasswordControl={false}
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

          <Text style={styles.titleText}>tip</Text>
          <InputItem label="密码" type="password" tip="密码为 英文，数字，下划线组合" />


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
