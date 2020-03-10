import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ButtonGroup, Button, Modal, Popup } from '../components';


export default class PopupDemo extends Component {
  static navigationOptions = () => ({
    title: 'PopupDemo',
  });

  state = {
    modal1: false,
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
        </ButtonGroup>

        <Popup visible={this.state.modal1} onClosePress={this.setModalVisibleByKey.bind(this, 'modal1', false)}>
          {this.renderDemoText()}
          <Button type="primary" size="lg" onPress={this.setModalVisibleByKey.bind(this, 'modal1', false)}>Yes</Button>
        </Popup>

      </ScrollView>
    );
  }
}
