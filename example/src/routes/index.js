import { createStackNavigator } from 'react-navigation-stack';
import { Easing, Animated } from 'react-native';

import Home from '../views/Home';

import ThemeDemo from '../views/ThemeDemo';
import ButtonDemo from '../views/ButtonDemo';
import ModalDemo from '../views/ModalDemo';
import CardDemo from '../views/CardDemo';
import ListRowDemo from '../views/ListRowDemo';
import InputDemo from '../views/InputDemo';

const RootStack = createStackNavigator(
  {
    Home: Home,
    ThemeDemo: ThemeDemo,
    ButtonDemo: ButtonDemo,
    ModalDemo: ModalDemo,
    CardDemo: CardDemo,
    ListRowDemo: ListRowDemo,
    InputDemo: InputDemo,
  },
  {
    initialRouteName: 'Home',
  }
);

export default RootStack;
