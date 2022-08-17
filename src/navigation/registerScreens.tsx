import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

import { Screens } from './Screens';

import App from '../../App';

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
  Navigation.registerComponent(Screens.APP, () => WrappedComponent(App));
}
