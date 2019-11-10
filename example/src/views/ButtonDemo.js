import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';

const buttonIcon = <Icon name="md-close-circle" size={18} color="#ccc" />;

export default class ButtonDemo extends Component {
  static navigationOptions = () => {
    return {
      title: 'button',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }


  pressEvent() {
    alert('click');
  }

  longPressEvent() {
    alert('long');
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
        <Button type="primary" label="primary"></Button>
        <Button type="info" label="info"></Button>
        <Button type="warning" label="warning"></Button>
        <Button type="orange" label="orange"></Button>
        <Button type="success" label="success"></Button>
        <Button type="error" label="error"></Button>

        <Text style={styles.title}>渐变</Text>
        <Button gradient label="渐变 默认样式"></Button>
        <Button gradient gradientDirection="vertical" label="垂直渐变"></Button>
        <Button gradient gradientColors={['#19be6b', '#FFE105']} label="自定义渐变颜色"></Button>
        <Button gradient gradientColors={['#ff0', '#f00']} shape="radius" color="#000" label="自定义渐变颜色"></Button>
        <Button disabled gradient gradientColors={['#ff0', '#f00']} label="渐变 disabled"></Button>

        <Text style={styles.title}>五种size</Text>
        <Button type="primary" size="xs" label="xs"></Button>
        <Button type="primary" size="sm" label="sm"></Button>
        <Button type="primary" size="md" label="md"></Button>
        <Button type="primary" size="lg" label="lg"></Button>
        <Button type="primary" size="xl" label="xl"></Button>

        <Text style={styles.title}>三种shape</Text>
        <Button type="info" shape="rect" label="rect"></Button>
        <Button type="info" shape="radius" label="radius"></Button>
        <Button type="info" shape="circle" label="circle"></Button>

        <Text style={styles.title}>自定义圆角 borderRadius</Text>
        <Button type="error" borderRadius={5} label="borderRadius 5"></Button>
        <Button type="error" borderRadius={10} label="borderRadius 10"></Button>
        <Button type="error" borderRadius={15} label="borderRadius 15"></Button>
        <Button type="error" borderRadius={20} label="borderRadius 20"></Button>

        <Text style={styles.title}>icon</Text>
        <Button iconSource={buttonIcon} label="默认"></Button>
        <Button link iconSource={buttonIcon} label="关闭"></Button>
        <Button link iconOnRight iconSource={buttonIcon} label="图标在右边"></Button>

        <Text style={styles.title}>outline</Text>
        <Button outline label="outline"></Button>
        <Button outline outlineType="dashed" label="dashed"></Button>

        <Text style={styles.title}>自定义 outline</Text>
        <Button outline outlineColor="#f00" label="开始体验"></Button>
        <Button outline shape="radius" outlineColor="#f0f" label="开始体验"></Button>
        <Button outline shape="rect" outlineColor="#f0f" outlineWidth={4} label="开始体验"></Button>
        <Button outline outlineColor="#f0f" outlineWidth={4} color="#000" label="开始体验"></Button>

        <Text style={styles.title}>link</Text>
        <Button link label="link"></Button>

        <Text style={styles.title}>disabled</Text>
        <Button disabled label="开始体验"></Button>
        <Button disabled outline label="开始体验"></Button>
        <Button disabled outline shape="rect" label="开始体验"></Button>
        <Button disabled link label="开始体验"></Button>

        <Text style={styles.title}>自定义 color</Text>
        <Button type="warning" color="#000" label="开始体验"></Button>
        <Button type="warning" color="#f00" label="开始体验"></Button>
        <Button type="warning" color="#f0f" label="开始体验"></Button>

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
});
