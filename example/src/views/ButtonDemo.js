import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';

const buttonIcon = require('../../images/close_gray.png');

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
        <Text style={styles.title}>默认样式 宽度100%</Text>
        <Button
          style={styles.btnDemo} 
          onPress={() => {
            this.pressEvent();
          }}
          onLongPress={() => {
            this.longPressEvent();
          }}
        >default</Button>

        <Text style={styles.title}>九种默认主题</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="default">default</Button>
          <Button style={styles.btnDemo} type="primary">primary</Button>
          <Button style={styles.btnDemo} type="info">info</Button>
          <Button style={styles.btnDemo} type="warning">warning</Button>
          <Button style={styles.btnDemo} type="success">success</Button>
          <Button style={styles.btnDemo} type="error">error</Button>
          <Button style={styles.btnDemo} type="gray">gray</Button>
          <Button style={styles.btnDemo} type="golden">golden</Button>
          <Button style={styles.btnDemo} type="text">text</Button>
        </View>

        <Text style={styles.title}>渐变</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} gradient gradientDirection="vertical">垂直渐变</Button>
          <Button style={styles.btnDemo} gradient>渐变 默认样式</Button>
          <Button style={styles.btnDemo} gradient gradientColors={['#19be6b', '#FFE105']}>自定义渐变颜色</Button>
          <Button style={styles.btnDemo} gradient gradientColors={['#ff0', '#f00']} shape="radius" color="#000">自定义渐变颜色</Button>
        </View>

        <Text style={styles.title}>五种size</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="primary" size="xs" >xs</Button>
          <Button style={styles.btnDemo} type="primary" size="sm" >sm</Button>
          <Button style={styles.btnDemo} type="primary" size="md" >md</Button>
          <Button style={styles.btnDemo} type="primary" size="lg" >lg</Button>
          <Button style={styles.btnDemo} type="primary" size="xl" >xl</Button>
        </View>

        <Text style={styles.title}>三种shape</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="info" shape="rect" >rect</Button>
          <Button style={styles.btnDemo} type="info" shape="radius" >radius</Button>
          <Button style={styles.btnDemo} type="info" shape="circle" >circle</Button>
        </View>

        <Text style={styles.title}>自定义圆角 borderRadius</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="error" borderRadius={5} >圆角 5</Button>
          <Button style={styles.btnDemo} type="error" borderRadius={10} >圆角 10</Button>
          <Button style={styles.btnDemo} type="error" borderRadius={15} >圆角 15</Button>
          <Button style={styles.btnDemo} type="error" borderRadius={20} >圆角 20</Button>
          <Button style={styles.btnDemo} type="error" borderRadius={100} >圆角 100</Button>
        </View>

        <Text style={styles.title}>icon</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} type="warning" icon={buttonIcon} >默认</Button>
          <Button style={styles.btnDemo} type="warning" icon={buttonIcon} >关闭</Button>
          <Button style={styles.btnDemo} type="warning" iconOnRight icon={buttonIcon} >图标在右边</Button>
        </View>


        <Text style={styles.title}>loading</Text>
        <Button loading={this.state.loading} type="success"  onPress={() => {
          this.setState({
            loading: true,
          });
          setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 1000);
        }}>默认</Button>

        <Text style={styles.title}>ghost</Text>
        <Button style={styles.btnDemo} ghost>ghost 默认 边框 文字 颜色一致</Button>
        <Button style={styles.btnDemo} ghost type="text">text solid</Button>
        <Button style={styles.btnDemo} ghost outlineType="dashed" type="golden">dashed golden</Button>
        <Button style={styles.btnDemo} ghost outlineType="dotted" type="error">dotted error</Button>

        <Text style={styles.title}>自定义 文字颜色 背景色</Text>
        <View style={styles.btnWrap}>
          <Button style={styles.btnDemo} color="#f0f" >自定义文字颜色</Button>
          <Button backgroundColor="#2faa93" >自定义背景颜色</Button>
          <Button style={styles.btnDemo} ghost outlineColor="#f00" >自定义边框颜色</Button>
          <Button style={styles.btnDemo} ghost outlineColor="#f00" outlineWidth={4}>自定义边框粗细</Button>
          <Button style={styles.btnDemo} ghost outlineColor="#f00" outlineWidth={4} color="#000" >边框 文字颜色 分开</Button>
        </View>

        <Text style={styles.title}>disabled</Text>
        <Button style={styles.btnDemo} disabled>默认禁用样式</Button>
        <Button style={styles.btnDemo} disabled ghost>ghost 禁用样式</Button>
        <Button style={styles.btnDemo} disabled type="info">info 禁用样式</Button>
        <Button style={styles.btnDemo} disabled type="text">文字 禁用样式</Button>
        <Button style={styles.btnDemo} disabled gradient gradientColors={['#ff0', '#f00']}>渐变 禁用样式</Button>
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
    marginHorizontal: 5,
  }
});
