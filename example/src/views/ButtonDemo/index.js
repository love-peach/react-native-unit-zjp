import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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
    console.log('click1');
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
        <Button style={styles.btnDemo} type="primary">默认宽度100%</Button>

        <Text style={styles.title}>六种默认主题</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="primary">primary</Button>
          <Button style={styles.btnDemo} type="info">info</Button>
          <Button style={styles.btnDemo} type="warning">warning</Button>
          <Button style={styles.btnDemo} type="orange">orange</Button>
          <Button style={styles.btnDemo} type="success">success</Button>
          <Button style={styles.btnDemo} type="error">error</Button>
        </View>

        <Text style={styles.title}>渐变</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} gradient gradientDirection="vertical">垂直渐变</Button>
          <Button style={styles.btnDemo} gradient label="渐变 默认样式"></Button>
          <Button style={styles.btnDemo} gradient gradientColors={['#19be6b', '#FFE105']} label="自定义渐变颜色"></Button>
          <Button style={styles.btnDemo} gradient gradientColors={['#ff0', '#f00']} shape="radius" color="#000" label="自定义渐变颜色"></Button>
          <Button style={styles.btnDemo} disabled gradient gradientColors={['#ff0', '#f00']} label="渐变 disabled"></Button>
        </View>

        <Text style={styles.title}>五种size</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="primary" size="xs" label="xs"></Button>
          <Button style={styles.btnDemo} type="primary" size="sm" label="sm"></Button>
          <Button style={styles.btnDemo} type="primary" size="md" label="md"></Button>
          <Button style={styles.btnDemo} type="primary" size="lg" label="lg"></Button>
          <Button style={styles.btnDemo} type="primary" size="xl" label="xl"></Button>
        </View>

        <Text style={styles.title}>三种shape</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="info" shape="rect" label="rect"></Button>
          <Button style={styles.btnDemo} type="info" shape="radius" label="radius"></Button>
          <Button style={styles.btnDemo} type="info" shape="circle" label="circle"></Button>
        </View>

        <Text style={styles.title}>自定义圆角 borderRadius</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="error" borderRadius={5} label="圆角 5"></Button>
          <Button style={styles.btnDemo} type="error" borderRadius={10} label="圆角 10"></Button>
          <Button style={styles.btnDemo} type="error" borderRadius={15} label="圆角 15"></Button>
          <Button style={styles.btnDemo} type="error" borderRadius={20} label="圆角 20"></Button>
          <Button style={styles.btnDemo} type="error" borderRadius={100} label="圆角 100"></Button>
        </View>

        <Text style={styles.title}>icon</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="warning" icon={buttonIcon} label="默认"></Button>
          <Button style={styles.btnDemo} type="warning" icon={buttonIcon} label="关闭"></Button>
          <Button style={styles.btnDemo} type="warning" iconOnRight icon={buttonIcon} label="图标在右边"></Button>
        </View>


        <Text style={styles.title}>loading</Text>
        <Button loading={this.state.loading} type="success" label="默认" onPress={() => {
          this.setState({
            loading: true,
          });
          setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 1000);
        }}></Button>

        <Text style={styles.title}>outline</Text>
        <Button style={styles.btnDemo} outline label="outline"></Button>
        <Button style={styles.btnDemo} outline outlineType="dashed" label="dashed"></Button>

        <Text style={styles.title}>自定义 outline</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} outline outlineColor="#f00" label="开始体验"></Button>
          <Button style={styles.btnDemo} outline shape="radius" outlineColor="#f0f" label="开始体验"></Button>
          <Button style={styles.btnDemo} outline shape="rect" outlineColor="#f0f" outlineWidth={4} label="开始体验"></Button>
          <Button style={styles.btnDemo} outline outlineColor="#f0f" outlineWidth={4} color="#000" label="开始体验"></Button>
        </View>

        <Text style={styles.title}>link</Text>
        <Button link label="link"></Button>

        

        <Text style={styles.title}>自定义 文字颜色 背景色</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="warning" color="#000" label="开始体验"></Button>
          <Button style={styles.btnDemo} type="warning" color="#f00" label="开始体验"></Button>
          <Button style={styles.btnDemo} type="warning" color="#f0f" label="开始体验"></Button>
          <Button type="warning" backgroundColor="#2faa93" color="#333" label="开始体验"></Button>
        </View>

        <Text style={styles.title}>disabled</Text>
        <Button style={styles.btnDemo} disabled label="开始体验"></Button>
        <Button style={styles.btnDemo} disabled outline label="开始体验"></Button>
        <Button style={styles.btnDemo} disabled outline shape="rect" label="开始体验"></Button>
        <Button style={styles.btnDemo} disabled link label="开始体验"></Button>
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
  btnWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  btnDemo: {
    marginBottom: 10,
    marginHorizontal: 10,
  }
});
