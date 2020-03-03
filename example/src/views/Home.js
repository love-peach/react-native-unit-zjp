import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { CellGroup, Cell } from '../components';


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
        <CellGroup borderOffset={0}>
          <Cell contentOffset={10} title="ThemeDemo" link onPress={this.goto.bind(this, 'ThemeDemo')} />
          <Cell contentOffset={10} title="ButtonDemo" link onPress={this.goto.bind(this, 'ButtonDemo')} />
          <Cell contentOffset={10} title="ButtonGroupDemo" link onPress={this.goto.bind(this, 'ButtonGroupDemo')} />
          <Cell contentOffset={10} title="CellDemo" link onPress={this.goto.bind(this, 'CellDemo')} />
          <Cell contentOffset={10} title="ModalDemo" link onPress={this.goto.bind(this, 'ModalDemo')} />
          <Cell contentOffset={10} title="CardDemo" link onPress={this.goto.bind(this, 'CardDemo')} />
          <Cell contentOffset={10} title="InputDemo" link onPress={this.goto.bind(this, 'InputDemo')} />
        </CellGroup>
      </ScrollView>
    );
  }
}
