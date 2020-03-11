import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonRadio, Button, Toast,  } from '../components';


export default class ToastDemo extends Component {
  static navigationOptions = () => ({
    title: 'ToastDemo',
  });

  state = {
    theme: 'default',
    placement: 'center',
    animateType: 'scale', 
  };

  setModalVisibleByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  handleShowToast() {
    this.MyToast && this.MyToast.destroy();
    this.MyToast = Toast.show('There are some msg', {
      theme: this.state.theme,
      placement: this.state.placement,
      animateType: this.state.animateType,
      // onHidden: () => {
      //   this.handleCloseToast();
      // }
    });
  }

  handleCloseToast() {
    this.MyToast && Toast.hide(this.MyToast);
  }

  render() {
    return (
      <ScrollView>
        <View none>
          <Text style={styles.title}>placement</Text>
          <ButtonRadio value={this.state.placement} options={['center', 'top', 'bottom', 'left', 'right']} onPress={v => {this.setModalVisibleByKey('placement', v);}} />

          <Text style={styles.title}>animateType</Text>
          <ButtonRadio value={this.state.animateType} options={['scale', 'fade', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right']} onPress={v => {this.setModalVisibleByKey('animateType', v);}} />

          <Text style={styles.title}>theme</Text>
          <ButtonRadio value={this.state.theme} options={['default', 'info', 'success', 'error']} onPress={v => {this.setModalVisibleByKey('theme', v);}} />

          <Button type="primary" style={styles.btnDemo} onPress={() => {this.handleShowToast();}}>show</Button>
          <Button type="error" style={styles.btnDemo} onPress={() => {this.handleCloseToast();}}>close</Button>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 15,
  },
  btnDemo: {
    margin: 10
  }
});