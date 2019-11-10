import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../views/Home';

import ButtonDemo from '../views/ButtonDemo';

const RootStack = createStackNavigator(
  {
    Home: Home,
    ButtonDemo: ButtonDemo,
  },
  {
    initialRouteName: 'ButtonDemo',
  }
)

export default RootStack;
