import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Button } from '../../components';

const buttonIcon = require('./close_gray.png');


export default class ButtonDemo extends Component {
  static navigationOptions = () => ({
    title: 'button',
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  pressEvent() {
    console.log('click');
  }

  longPressEvent() {
    console.log('long');
  }


  render() {
    return (
      <ScrollView>
        <Text style={styles.title}>默认样式</Text>
        <Button
          label="default"
          onPress={() => {
            this.pressEvent();
          }}
          onLongPress={() => {
            this.longPressEvent();
          }}
        ></Button>

        <Text style={styles.title}>六种默认主题</Text>
        <Button style={styles.btnDemo} type="primary" label="primary"></Button>
        <Button style={styles.btnDemo} type="info" label="info"></Button>
        <Button style={styles.btnDemo} type="warning" label="warning">{null}</Button>
        <Button style={styles.btnDemo} type="orange" label="orange"></Button>
        <Button style={styles.btnDemo} type="success" label="success"></Button>
        <Button style={styles.btnDemo} type="error" label="error"></Button>

        <Text style={styles.title}>渐变</Text>
        <Button style={styles.btnDemo} gradient label="渐变 默认样式"></Button>
        <Button style={styles.btnDemo} gradient gradientDirection="vertical" label="垂直渐变"></Button>
        <Button style={styles.btnDemo} gradient gradientColors={['#19be6b', '#FFE105']} label="自定义渐变颜色"></Button>
        <Button style={styles.btnDemo} gradient gradientColors={['#ff0', '#f00']} shape="radius" color="#000" label="自定义渐变颜色"></Button>
        <Button style={styles.btnDemo} disabled gradient gradientColors={['#ff0', '#f00']} label="渐变 disabled"></Button>

        <Text style={styles.title}>五种size</Text>
        <Button style={styles.btnDemo} type="primary" size="xs" label="xs"></Button>
        <Button style={styles.btnDemo} type="primary" size="sm" label="sm"></Button>
        <Button style={styles.btnDemo} type="primary" size="md" label="md"></Button>
        <Button style={styles.btnDemo} type="primary" size="lg" label="lg"></Button>
        <Button style={styles.btnDemo} type="primary" size="xl" label="xl"></Button>

        <Text style={styles.title}>三种shape</Text>
        <Button style={styles.btnDemo} type="info" shape="rect" label="rect"></Button>
        <Button style={styles.btnDemo} type="info" shape="radius" label="radius"></Button>
        <Button style={styles.btnDemo} type="info" shape="circle" label="circle"></Button>

        <Text style={styles.title}>自定义圆角 borderRadius</Text>
        <Button style={styles.btnDemo} type="error" borderRadius={5} label="borderRadius 5"></Button>
        <Button style={styles.btnDemo} type="error" borderRadius={10} label="borderRadius 10"></Button>
        <Button style={styles.btnDemo} type="error" borderRadius={15} label="borderRadius 15"></Button>
        <Button style={styles.btnDemo} type="error" borderRadius={20} label="borderRadius 20"></Button>

        <Text style={styles.title}>icon</Text>
        <Button style={styles.btnDemo} icon={buttonIcon} label="默认"></Button>
        <Button style={styles.btnDemo} link icon={buttonIcon} label="关闭"></Button>
        <Button style={styles.btnDemo} link iconOnRight icon={buttonIcon} label="图标在右边"></Button>

        <Text style={styles.title}>loading</Text>
        <Button loading label="默认"></Button>

        <Text style={styles.title}>outline</Text>
        <Button style={styles.btnDemo} outline label="outline"></Button>
        <Button style={styles.btnDemo} outline outlineType="dashed" label="dashed"></Button>

        <Text style={styles.title}>自定义 outline</Text>
        <Button style={styles.btnDemo} outline outlineColor="#f00" label="开始体验"></Button>
        <Button style={styles.btnDemo} outline shape="radius" outlineColor="#f0f" label="开始体验"></Button>
        <Button style={styles.btnDemo} outline shape="rect" outlineColor="#f0f" outlineWidth={4} label="开始体验"></Button>
        <Button style={styles.btnDemo} outline outlineColor="#f0f" outlineWidth={4} color="#000" label="开始体验"></Button>

        <Text style={styles.title}>link</Text>
        <Button link label="link"></Button>

        <Text style={styles.title}>disabled</Text>
        <Button style={styles.btnDemo} disabled label="开始体验"></Button>
        <Button style={styles.btnDemo} disabled outline label="开始体验"></Button>
        <Button style={styles.btnDemo} disabled outline shape="rect" label="开始体验"></Button>
        <Button style={styles.btnDemo} disabled link label="开始体验"></Button>

        <Text style={styles.title}>自定义 color</Text>
        <Button style={styles.btnDemo} type="warning" color="#000" label="开始体验"></Button>
        <Button style={styles.btnDemo} type="warning" color="#f00" label="开始体验"></Button>
        <Button style={styles.btnDemo} type="warning" color="#f0f" label="开始体验"></Button>

        <Text style={styles.title}>自定义 backgroundColor</Text>
        <Button type="warning" backgroundColor="#ebde74" color="#333" label="开始体验"></Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  btnDemo: {
    marginBottom: 10,
  }
});
