import { createStackNavigator } from 'react-navigation-stack';

import Home from '../views/Home';

import ThemeDemo from '../views/ThemeDemo.js';
import ButtonDemo from '../views/ButtonDemo.js';
import ButtonGroupDemo from '../views/ButtonGroupDemo.js';
import ModalDemo from '../views/ModalDemo.js';
import CardDemo from '../views/CardDemo.js';
import ListRowDemo from '../views/ListRowDemo.js';
import InputDemo from '../views/InputDemo.js';

const RootStack = createStackNavigator(
  {
    Home: Home,
    ThemeDemo: ThemeDemo,
    ButtonDemo: ButtonDemo,
    ButtonGroupDemo: ButtonGroupDemo,
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
