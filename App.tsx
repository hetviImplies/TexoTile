/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LoginStack from './src/Navigation/loginStack';
import { Provider, useDispatch } from 'react-redux';
import Store from './src/store/store';
import SplashScreen from 'react-native-splash-screen';
import Demo from './Demo';
import BootSplash from "react-native-bootsplash";
function App(): React.JSX.Element {

  useEffect(()=>{
      setTimeout(()=>{
        BootSplash.hide();
      },5000)
    LogBox.ignoreAllLogs();
  }, [])

  return (
    <Provider store={Store}>
    <LoginStack/>
    </Provider>
    // <View style={{flex:1,backgroundColor:"red"}}>
    // </View>
    // <Demo/>
  );
}

export default App;
