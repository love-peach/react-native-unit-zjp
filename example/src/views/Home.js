import React, { Component } from 'react';
import { ScrollView } from 'react-native';
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
        <ListRow contentOffset={10} title="ThemeDemo" link onPress={this.goto.bind(this, 'ThemeDemo')} />
        <ListRow contentOffset={10} title="ButtonDemo" link onPress={this.goto.bind(this, 'ButtonDemo')} />
        <ListRow contentOffset={10} title="ButtonGroupDemo" link onPress={this.goto.bind(this, 'ButtonGroupDemo')} />
        <ListRow contentOffset={10} title="ModalDemo" link onPress={this.goto.bind(this, 'ModalDemo')} />
        <ListRow contentOffset={10} title="CardDemo" link onPress={this.goto.bind(this, 'CardDemo')} />
        <ListRow contentOffset={10} title="ListRowDemo" link onPress={this.goto.bind(this, 'ListRowDemo')} />
        <ListRow contentOffset={10} title="InputDemo" link onPress={this.goto.bind(this, 'InputDemo')} />
      </ScrollView>
    );
  }
}
