import { createStackNavigator } from 'react-navigation-stack';

import Home from '../views/Home';

import ButtonDemo from '../views/ButtonDemo';

const RootStack = createStackNavigator(
  {
    Home: Home,
    ButtonDemo: ButtonDemo,
  },
  {
    initialRouteName: 'Home',
  }
);

export default RootStack;
