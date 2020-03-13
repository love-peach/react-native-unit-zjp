import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonRadio, Button, Modal } from '../components';


export default class ModalDemo extends Component {
  static navigationOptions = () => ({
    title: 'ModalDemo',
  });

  state = {
    placement: 'center',
    width: '',
    maskBgColor: 'rgba(0,0,0,.6)',
    closable: false,
    isShowModal: false,
    maskClosable: false,
  };

  setModalVisibleByKey = (key, visible) => {
    this.setState({ [key]: visible });
  };

  renderDemoText() {
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 15 }}>fet</Text>
        <Text style={{ marginBottom: 10, marginRight: 15, marginLeft: 15, textAlign: 'justify' }}>fe</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.title}>placement</Text>
        <ButtonRadio value={this.state.placement} options={['center', 'bottom', 'top', 'left', 'right']} onPress={v => {this.setModalVisibleByKey('placement', v);}} />
        {/* <ButtonRadio value={this.state.placement} options={[{ label: '中间', value: 'center'}, { label: '底部', value: 'bottom'}, { label: '顶部', value: 'top'}, { label: '左边', value: 'left'}, { label: '右边', value: 'right'} ]} onPress={v => {this.setModalVisibleByKey('placement', v);}} type='default' activeType="primary" /> */}

        <Text style={styles.title}>width</Text>
        <ButtonRadio value={this.state.width} options={[ {label: 'unset', value: ''}, {label: '"80"', value: '80'}, {label: '"50"', value: '50'}, {label: '"100"', value: '100'}, 150, 200, 300]} onPress={v => {this.setModalVisibleByKey('width', v);}} />

        <Text style={styles.title}>maskBgColor</Text>
        <ButtonRadio value={this.state.maskBgColor} options={['transparent', 'red', '#90ea3d', 'rgba(0,0,0,.6)', 'rgba(101,0,212,.5)']} onPress={v => {this.setModalVisibleByKey('maskBgColor', v);}} size="sm" />


        <Text style={styles.title}>closable</Text>
        <ButtonRadio value={this.state.closable} options={[{ label: 'false', value: false }, { label: 'true', value: true }]} onPress={v => {this.setModalVisibleByKey('closable', v);}} />

        <Text style={styles.title}>maskClosable</Text>
        <ButtonRadio value={this.state.maskClosable} options={[{ label: 'false', value: false }, { label: 'true', value: true }]} onPress={v => {this.setModalVisibleByKey('maskClosable', v);}} />

        <View style={{ margin: 20 }}>
          <Button type="primary" onPress={() => {this.setModalVisibleByKey('isShowModal', true);}}>Show</Button>
        </View>

        <Modal
          visible={this.state.isShowModal}
          placement={this.state.placement}
          width={this.state.width || undefined}
          maskBgColor={this.state.maskBgColor}
          closable={this.state.closable}
          maskClosable={this.state.maskClosable}
        >
          {this.renderDemoText()}
          <Button type="primary" size="lg" onPress={() => {this.setModalVisibleByKey('isShowModal', false);}}>Close</Button>
        </Modal>

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
