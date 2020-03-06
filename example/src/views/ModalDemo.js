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
    console.log(1);
    this.setState({ [key]: visible });
  };

  handleMaskPress() {}

  renderDemoText() {
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 15 }}>随行付用户隐私权政策</Text>
        <Text style={{ marginBottom: 10, marginRight: 15, marginLeft: 15, textAlign: 'justify' }}>
          用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、形式提供的图片。
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

        <Modal visible={this.state.modal1} placement="center" onMaskPress={this.setModalVisibleByKey.bind(this, 'modal1', false)}>
          {this.renderDemoText()}
          <Button type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal1', false)} />
        </Modal>

        <Modal visible={this.state.modal2} placement="bottom">
          {this.renderDemoText()}
          <Button type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal2', false)} />
        </Modal>

        <Modal visible={this.state.modal3} placement="top">
          {this.renderDemoText()}
          <Button type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal3', false)} />
        </Modal>

        <Modal visible={this.state.modal4} placement="left">
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            {this.renderDemoText()}
            <Button type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal4', false)} />
            <View style={{ height: 500, borderWidth: 1 }} />
          </ScrollView>
        </Modal>

        <Modal visible={this.state.modal5} placement="right">
          {this.renderDemoText()}
          <Button type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal5', false)} />
        </Modal>
      </ScrollView>
    );
  }
}
