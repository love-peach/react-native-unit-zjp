
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from '../components';

export default class CardDemo extends Component {
  static navigationOptions = () => {
    return {
      title: 'CardDemo',
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <Text>fefe11</Text>
          <Text>fefe11</Text>
          <Text>fefe11</Text>
          <Text>fefe11</Text>
          <Text>fefe11</Text>
        </Card>

        <Card shadow margin={15} shadowOpt={{ radius: 1, opacity: 0.06 }}>
          <Text>fefe11</Text>
        </Card>

        <Card shadow width={100} height={100}>
          <Text>fefe11</Text>
        </Card>

        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          <Card shadow width={100} height={100}>
            <Text>fefe11</Text>
          </Card>
        </View>
      </ScrollView>
    );
  }
}
