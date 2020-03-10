import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ButtonGroup, Button, Modal } from '../components';


export default class ModalDemo extends Component {
  static navigationOptions = () => ({
    title: 'ModalDemo',
  });

  state = {
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
  };

  setModalVisibleByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  handleMaskPress() {}

  renderDemoText() {
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 15 }}>Lorem ipsum dolor sit</Text>
        <Text style={{ marginBottom: 10, marginRight: 15, marginLeft: 15, textAlign: 'justify' }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam quia dolore deleniti vel fuga omnis repellat ut! Voluptates expedita ipsum ex commodi tenetur debitis animi asperiores. Eius alias corrupti deleniti?
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <ButtonGroup>
          <Button type="primary" onPress={this.setModalVisibleByKey.bind(this, 'modal1', true)}>center</Button>
          <Button type="primary" onPress={this.setModalVisibleByKey.bind(this, 'modal2', true)}>bottom</Button>
          <Button type="primary" onPress={this.setModalVisibleByKey.bind(this, 'modal3', true)}>top</Button>
          <Button type="primary" onPress={this.setModalVisibleByKey.bind(this, 'modal4', true)}>left</Button>
          <Button type="primary" onPress={this.setModalVisibleByKey.bind(this, 'modal5', true)}>right</Button>
        </ButtonGroup>

        <Modal visible={this.state.modal1} width="90"onClosePress={this.setModalVisibleByKey.bind(this, 'modal1', false)}>
          {this.renderDemoText()}
          <Button type="primary" size="lg" onPress={this.setModalVisibleByKey.bind(this, 'modal1', false)}>Yes</Button>
        </Modal>

        <Modal visible={this.state.modal2} placement="bottom" contentStyle={{padding: 0}}>
          {this.renderDemoText()}
          <Button type="primary" size="lg" onPress={this.setModalVisibleByKey.bind(this, 'modal2', false)}>关闭</Button>
        </Modal>

        <Modal visible={this.state.modal3} placement="top">
          {this.renderDemoText()}
          <Button type="primary" size="lg" onPress={this.setModalVisibleByKey.bind(this, 'modal3', false)}>关闭</Button>
        </Modal>

        <Modal visible={this.state.modal4} placement="left">
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            {this.renderDemoText()}
            <Button type="primary" size="lg" onPress={this.setModalVisibleByKey.bind(this, 'modal4', false)}>关闭</Button>
            <View style={{ height: 700, borderWidth: 1 }} />
          </ScrollView>
        </Modal>

        <Modal visible={this.state.modal5} placement="right">
          {this.renderDemoText()}
          <Button type="primary" size="lg" onPress={this.setModalVisibleByKey.bind(this, 'modal5', false)}>关闭</Button>
        </Modal>
      </ScrollView>
    );
  }
}
