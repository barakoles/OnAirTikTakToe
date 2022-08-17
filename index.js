import 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { rootNavigation } from './src/navigation/Navigation';

Navigation.events().registerAppLaunchedListener(() => rootNavigation());
