import { LayoutRoot, Navigation, Options } from 'react-native-navigation';
import registerScreens from './registerScreens';
import { AppStack } from './Stacks';

const startScreens = () => {
  registerScreens();
};

startScreens();

const defaultOptions: Options = {
  topBar: {
    drawBehind: true,
    animate: false,
    visible: false,
  },
  layout: {
    orientation: ['portrait'],
  },
};

const layoutRoot: LayoutRoot = {
  root: {
    stack: AppStack,
  },
};

export function rootNavigation() {
  Navigation.setDefaultOptions(defaultOptions);
  Navigation.setRoot(layoutRoot);
}
