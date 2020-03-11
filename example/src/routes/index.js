import { createStackNavigator } from 'react-navigation-stack';

import Home from '../views/Home';

import ThemeDemo from '../views/ThemeDemo.js';
import ButtonDemo from '../views/ButtonDemo.js';
import ButtonGroupDemo from '../views/ButtonGroupDemo.js';
import ButtonRadioDemo from '../views/ButtonRadioDemo.js';
import CardDemo from '../views/CardDemo.js';
import CellDemo from '../views/CellDemo.js';
import InputDemo from '../views/InputDemo.js';
import TipDemo from '../views/TipDemo.js';
import WebviewDemo from '../views/WebviewDemo.js';
import ModalDemo from '../views/ModalDemo.js';
import PopupDemo from '../views/PopupDemo.js';

const RootStack = createStackNavigator(
  {
    Home: Home,
    ThemeDemo: ThemeDemo,
    ButtonDemo: ButtonDemo,
    ButtonGroupDemo: ButtonGroupDemo,
    ButtonRadioDemo: ButtonRadioDemo,
    ModalDemo: ModalDemo,
    CardDemo: CardDemo,
    CellDemo: CellDemo,
    InputDemo: InputDemo,
    TipDemo: TipDemo,
    PopupDemo: PopupDemo,
    WebviewDemo: WebviewDemo,
  },
  {
    initialRouteName: 'Home',
  }
);

export default RootStack;
