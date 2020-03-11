import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ButtonGroup, Button, Modal, Toast } from '../components';


export default class ToastDemo extends Component {
  static navigationOptions = () => ({
    title: 'ToastDemo',
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

  handleShowToast() {
    this.MyToast = Toast.show('fefeff', {
      onHidden: () => {
        this.handleCloseToast();
      }
    });
  }

  handleCloseToast() {
    this.MyToast && Toast.hide(this.MyToast);
  }

  render() {
    return (
      <ScrollView>
        <View>
          <ButtonGroup>
            <Button type="primary" onPress={this.setModalVisibleByKey.bind(this, 'modal1', true)}>center</Button>
          </ButtonGroup>

          <View style={{ margin: 20 }}>
            <Button onPress={() => {this.handleShowToast();}}>show</Button>
          </View>

          <View style={{ margin: 20 }}>
            <Button onPress={() => {this.handleCloseToast();}}>close</Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
