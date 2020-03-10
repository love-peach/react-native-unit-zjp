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
          <Cell title="ThemeDemo" link onPress={this.goto.bind(this, 'ThemeDemo')} />
          <Cell title="ButtonDemo" link onPress={this.goto.bind(this, 'ButtonDemo')} />
          <Cell title="ButtonGroupDemo" link onPress={this.goto.bind(this, 'ButtonGroupDemo')} />
          <Cell title="CellDemo" link onPress={this.goto.bind(this, 'CellDemo')} />
          <Cell title="InputDemo" link onPress={this.goto.bind(this, 'InputDemo')} />
          <Cell title="CardDemo" link onPress={this.goto.bind(this, 'CardDemo')} />
          <Cell title="TipDemo" link onPress={this.goto.bind(this, 'TipDemo')} />
          <Cell title="ModalDemo" link onPress={this.goto.bind(this, 'ModalDemo')} />
          <Cell title="PopupDemo" link onPress={this.goto.bind(this, 'PopupDemo')} />
          <Cell title="WebviewDemo" link onPress={this.goto.bind(this, 'WebviewDemo')} />
        </CellGroup>
      </ScrollView>
    );
  }
}
