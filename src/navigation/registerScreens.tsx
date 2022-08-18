import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

import { Screens } from './Screens';
import MainMenu from '@screens/MainMenu';
import AgainstPlayer from '@screens/AgainstPlayer';
import AgainstAITikTakToe from '@screens/AgainstAI';

function WrappedComponent(Component: any) {
  return function inject(props: any) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
    return <EnhancedComponent />;
  };
}

export default function () {
  Navigation.registerComponent(Screens.MAIN_MENU, () =>
    WrappedComponent(MainMenu),
  );
  Navigation.registerComponent(Screens.AGAINST_PLAYER, () =>
    WrappedComponent(AgainstPlayer),
  );
  Navigation.registerComponent(Screens.AGAINST_AI, () =>
    WrappedComponent(AgainstAITikTakToe),
  );
}
