import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonRadio, ButtonGroup, Button, Modal } from '../components';


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

  handleChangePlacement = (value) => {
    this.setModalVisibleByKey('placement', value);
  }

  handleChangeWidth = (value) => {
    this.setModalVisibleByKey('width', value);
  }

  handleChangeMaskBgColor = (value) => {
    this.setModalVisibleByKey('maskBgColor', value);
  }

  handleChangeClosable = (value) => {
    this.setModalVisibleByKey('closable', value);
  }

  handleChangeMaskClosable = (value) => {
    this.setModalVisibleByKey('maskClosable', value);
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.title}>placement</Text>
        <ButtonRadio value={this.state.placement} options={['center', 'bottom', 'top', 'left', 'right']} onPress={this.handleChangePlacement} radius={1000} />
        {/* <ButtonRadio value={this.state.placement} options={[{ label: '中间', value: 'center'}, { label: '底部', value: 'bottom'}, { label: '顶部', value: 'top'}, { label: '左边', value: 'left'}, { label: '右边', value: 'right'} ]} onPress={this.handleChangePlacement} type='default' activeType="primary" /> */}

        <Text style={styles.title}>width</Text>
        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Button size="md" type="primary" onPress={() => {this.setState({ width: undefined});}}>Auto</Button>
        </View>
        <ButtonRadio value={this.state.width} options={[ {label: '"80"', value: '80'}, {label: '"50"', value: '50'}, {label: '"100"', value: '100'}, 150, 200, 300]} onPress={this.handleChangeWidth} radius={1000} />

        <Text style={styles.title}>maskBgColor</Text>
        <ButtonRadio value={this.state.maskBgColor} options={['transparent', 'red', '#90ea3d', 'rgba(0,0,0,.6)', 'rgba(101,0,212,.5)']} onPress={this.handleChangeMaskBgColor} radius={1000} />


        <Text style={styles.title}>closable</Text>
        <ButtonRadio value={this.state.closable} options={[{ label: 'false', value: false }, { label: 'true', value: true }]} onPress={this.handleChangeClosable} radius={1000} />

        <Text style={styles.title}>maskClosable</Text>
        <ButtonRadio value={this.state.maskClosable} options={[{ label: 'false', value: false }, { label: 'true', value: true }]} onPress={this.handleChangeMaskClosable} radius={1000} />

        <View style={{ margin: 20 }}>
          <Button type="primary" onPress={this.setModalVisibleByKey.bind(this, 'isShowModal', true)}>Show</Button>
        </View>

        <Modal
          visible={this.state.isShowModal}
          placement={this.state.placement}
          width={this.state.width}
          maskBgColor={this.state.maskBgColor}
          closable={this.state.closable}
          maskClosable={this.state.maskClosable}
        >
          {this.renderDemoText()}
          <Button type="primary" size="lg" onPress={this.setModalVisibleByKey.bind(this, 'isShowModal', false)}>Close</Button>
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
  btnWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  btnDemo: {
    marginBottom: 10,
    marginHorizontal: 5,
  }
});
