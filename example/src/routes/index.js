import { createStackNavigator } from 'react-navigation-stack';

import Home from '../views/Home';

import ThemeDemo from '../views/ThemeDemo.js';
import ButtonDemo from '../views/ButtonDemo.js';
import ButtonGroupDemo from '../views/ButtonGroupDemo.js';
import ModalDemo from '../views/ModalDemo.js';
import CardDemo from '../views/CardDemo.js';
import CellDemo from '../views/CellDemo.js';
import InputDemo from '../views/InputDemo.js';

const RootStack = createStackNavigator(
  {
    Home: Home,
    ThemeDemo: ThemeDemo,
    ButtonDemo: ButtonDemo,
    ButtonGroupDemo: ButtonGroupDemo,
    ModalDemo: ModalDemo,
    CardDemo: CardDemo,
    CellDemo: CellDemo,
    InputDemo: InputDemo,
  },
  {
    initialRouteName: 'Home',
  }
);

export default RootStack;
