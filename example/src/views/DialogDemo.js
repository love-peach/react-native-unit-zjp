import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonRadio, Button, Dialog } from '../components';


export default class DialogDemo extends Component {
  static navigationOptions = () => ({
    title: 'DialogDemo',
  });

  state = {
    isShow: false,
    maskClosable: false,
    header: false,
  };

  setValueByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  handleMaskPress() {}

  render() {
    return (
      <ScrollView>
        <View style={{ paddingHorizontal: 10 }}>

          <Text style={styles.title}>header</Text>
          <ButtonRadio
            value={this.state.header}
            options={[{label: 'false', value: false}, {label: 'true', value: true}]}
            onPress={(v) => {this.setValueByKey('header', v); }}
          />

          <Button style={{ marginTop: 10 }} type="primary" onPress={this.setValueByKey.bind(this, 'isShow', true)}>show</Button>
        </View>
        
        <Dialog
          visible={this.state.isShow}
          onCancelPress={() => {this.setValueByKey('isShow', false); }}
          onMenuPress={(v) => {console.log(v, 'menu');}}
          title="弹框标题"
          // msg="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
          menus={[
            {
              label: '取消',
              onPress: (v) => {
                console.log(v);
                this.setValueByKey('isShow', false);
              }
            },
            {
              label: '确定',
              type: 'success',
              disabled: true,
              onPress: () => {
                this.setValueByKey('isShow', false);
              }
            },
            {
              label: '确定',
              type: 'success',
            }
          ]}
        >
          <Text>1212</Text>
          <Button>fefe</Button>
        </Dialog>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
});
