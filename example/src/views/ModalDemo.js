import React, { Component } from 'react';
import { ScrollView, Animated, View, Text, Easing } from 'react-native';
import SButton from '../../../component/Button/Button';
import Modal from '../../../component/Modal/Modal';

export default class ModalExample extends Component {
  static navigationOptions = () => ({
    title: 'modal',
  });

  state = {
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    modal5: false,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

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
          用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。 下面的例子分别演示了如何显示从本地缓存、网络甚至是以'data:'的 base64 uri
          形式提供的图片。
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <SButton onPress={this.setModalVisibleByKey.bind(this, 'modal1', true)}>
          <Text>center</Text>
        </SButton>
        <SButton onPress={this.setModalVisibleByKey.bind(this, 'modal2', true)}>
          <Text>bottom</Text>
        </SButton>

        <SButton onPress={this.setModalVisibleByKey.bind(this, 'modal3', true)}>
          <Text>top</Text>
        </SButton>

        <SButton onPress={this.setModalVisibleByKey.bind(this, 'modal4', true)}>
          <Text>left</Text>
        </SButton>
        <SButton onPress={this.setModalVisibleByKey.bind(this, 'modal5', true)}>
          <Text>right</Text>
        </SButton>

        <Modal visible={this.state.modal1} placement="center" onMaskPress={this.setModalVisibleByKey.bind(this, 'modal1', false)}>
          {this.renderDemoText()}
          <SButton type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal1', false)} />
        </Modal>

        <Modal visible={this.state.modal2} placement="bottom">
          {this.renderDemoText()}
          <SButton type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal2', false)} />
        </Modal>

        <Modal visible={this.state.modal3} placement="top">
          {this.renderDemoText()}
          <SButton type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal3', false)} />
        </Modal>

        <Modal visible={this.state.modal4} placement="left">
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            {this.renderDemoText()}
            <SButton type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal4', false)} />
            <View style={{ height: 500, borderWidth: 1 }} />
          </ScrollView>
        </Modal>

        <Modal visible={this.state.modal5} placement="right">
          {this.renderDemoText()}
          <SButton type="primary" size="lg" label="关闭" onPress={this.setModalVisibleByKey.bind(this, 'modal5', false)} />
        </Modal>
      </ScrollView>
    );
  }
}
