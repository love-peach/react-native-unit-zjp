import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch } from 'react-native';
import { Button, ButtonRadio, Theme, Carousel } from '../component-path';

export default class CarouselDemo extends Component {
  static navigationOptions = () => ({
    title: 'CarouselDemo',
  });

  render() {
    return (
      <View style={styles.pageContent} >
        <View>
          <Carousel style={{ height: 100 }} loop={true} control={true}>
            <View style={{ backgroundColor: Theme.primary, height: 100 }}></View>
            <View style={{ backgroundColor: Theme.info, height: 100 }}></View>
            <View style={{ backgroundColor: Theme.success, height: 100 }}></View>
            <View style={{ backgroundColor: Theme.warning, height: 100 }}></View>
            <View style={{ backgroundColor: Theme.error, height: 100 }}></View>
          </Carousel>
          
        </View>

        <ScrollView contentContainerStyle={{flex: 1, borderWidth: 1}}>
          <Text style={styles.title}>type</Text>
          {/* <ScrollView horizontal>
            <ButtonRadio value={this.state.type} options={['default', 'primary', 'info', 'warning', 'success', 'error', 'gray', 'golden', 'text' ]} onPress={v => {this.setValueByKey('type', v);}} />
          </ScrollView> */}
        </ScrollView>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  pageContent: {
    position: 'relative',
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 20,
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
