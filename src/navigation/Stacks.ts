import { Screens } from '@navigation/Screens';
import { LayoutStack } from 'react-native-navigation';

export enum StacksIds {
  MAIN_STACK = 'MainStack',
}

export const AppStack: LayoutStack = {
  children: [
    {
      component: {
        name: Screens.APP,
        options: {
          statusBar: {
            style: 'dark',
          },
        },
      },
    },
  ],
};
