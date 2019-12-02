import React, { Component } from 'react';
import { ScrollView, Text, TouchableHighlight } from 'react-native';
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
        <ListRow contentOffset={10} title="ButtonDemo" link onPress={this.goto.bind(this, 'ButtonDemo')} />
        <ListRow contentOffset={10} title="ModalDemo" link onPress={this.goto.bind(this, 'ModalDemo')} />
        <ListRow contentOffset={10} title="CardDemo" link onPress={this.goto.bind(this, 'CardDemo')} />
        <ListRow contentOffset={10} title="ListRowDemo" link onPress={this.goto.bind(this, 'ListRowDemo')} />
        <ListRow contentOffset={10} title="InputDemo" link onPress={this.goto.bind(this, 'InputDemo')} />

        <TouchableHighlight style={{ width: 'auto', height: 50, flex: 0, flexShrink: 0, borderWidth: 1 }} onPress={() => {alert(1);}}><Text style={{ backgroundColor: 'red' }}>fefe</Text></TouchableHighlight>
      </ScrollView>
    );
  }
}
