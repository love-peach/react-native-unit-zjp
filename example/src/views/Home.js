import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
// import { Button } from 'react-native-unit-zjp';
import { ListRow } from '../components';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  goto(route) {
    this.props.navigation.navigate(route);
  }

  render() {
    return (
      <ScrollView>
        <Text>Home Screen1</Text>
        <ListRow title="ButtonDemo" link onPress={this.goto.bind(this, 'ButtonDemo')} />
      </ScrollView>
    );
  }
}
