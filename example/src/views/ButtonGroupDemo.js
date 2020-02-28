import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button, ButtonGroup } from '../components';


export default class ButtonDemo extends Component {
  static navigationOptions = () => ({
    title: 'ButtonGroup',
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
        <View>
          <ButtonGroup size="xl">
            <Button type="info">Yesterday</Button>
            <Button type="primary">Today</Button>
            <Button type="success">Tommorrow</Button>
          </ButtonGroup>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
