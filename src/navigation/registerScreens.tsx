import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Screens } from './Screens';
import App from '../../App';

function WrappedComponent(Component: any) {
  return function inject(props: any) {
    const EnhancedComponent = () => <Component {...props} />;
    return <EnhancedComponent />;
  };
}

export default function () {
  Navigation.registerComponent(Screens.APP, () => WrappedComponent(App));
}
