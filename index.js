/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginStack from './src/Navigation/loginStack';
import {name as appName} from './app.json';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

AppRegistry.registerComponent(appName, () => App);
