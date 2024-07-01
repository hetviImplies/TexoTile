import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Suspense, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import VerifyPhone from '../screens/VerifyPhone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from '../screens/UpdateUser';
import Category from '../screens/Preference';
import Tabs from './Tabs';
import Request from '../screens/Request';
import QualityDetail from '../screens/QualityView';
import axios from 'axios';
import UpdateYarn from '../screens/UpdateYarn';
import Profile_Setting from '../screens/Profile_Setting';
import {EndPoints} from '../URLs/EndPoints';
import {URL} from '../URLs/URL';
import Activity_Indicator from '../component/Activity_Indicator';
const LoginStack = () => {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const stack = createStackNavigator();

  useEffect(() => {
    Handle();
  }, []);

  useEffect(() => {
    console.log('Setting initial route:', name);
  }, [name]);

  const Handle = async () => {
    try {
      const response = await axios
        .get(`${URL}${EndPoints.GetProfile}`)
        .then(res => {
          return res.data.result;
        })
        .then(data => {
          console.log('data: ', data);
          if (data.mobile_number) {
            if (data.name) {
              if (data.role) {
                setName('Tabs');
              } else {
                if (data.company_owner === false && !data.role) {
                  setName('Request');
                } else if (data.company_owner === null) {
                  console.log('Category');
                  setName('Category');
                }
              }
            } else {
              console.log('WelcomeScreen');
              setName('WelcomeScreen');
            }
          } else {
            console.log('Login');
            setName('Login');
          }
        });
    } catch (error) {
      setName('Login');
      console.log(error);
    }
  };

  const options = {
    headerShown: false,
  };

  return (
    <Suspense fallback={<Activity_Indicator />}>
      <StatusBar backgroundColor="#E89E46" barStyle="light-content" />
      <NavigationContainer>
        {name != undefined ? (
          <stack.Navigator
            screenOptions={options}
            initialRouteName={'QualityDetail'}>
            <stack.Screen component={Login} name="Login"></stack.Screen>
            <stack.Screen
              component={VerifyPhone}
              name="VerifyPhone"></stack.Screen>
            <stack.Screen
              component={WelcomeScreen}
              name="WelcomeScreen"></stack.Screen>
            <stack.Screen component={Category} name="Category"></stack.Screen>
            <stack.Screen component={Tabs} name="Tabs"></stack.Screen>
            <stack.Screen component={Request} name="Request"></stack.Screen>
            <stack.Screen
              component={QualityDetail}
              name="QualityDetail"
              initialParams={{data: 100}}
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerBackgroundContainerStyle: {
                  backgroundColor: '#E89E46',
                  zIndex: 0,
                  overflow: 'hidden',
                },
                headerTintColor: 'white',
                headerBackground: () => {},
                headerShown: true,
              }}></stack.Screen>
            <stack.Screen
              component={UpdateYarn}
              name="UpdateYarn"
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerBackgroundContainerStyle: {
                  backgroundColor: '#E89E46',
                },
                headerTintColor: 'white',
                headerBackground: () => {},
              }}></stack.Screen>
            <stack.Screen
              component={Profile_Setting}
              name="Profile_Setting"></stack.Screen>
          </stack.Navigator>
        ) : (
          Handle()
        )}
      </NavigationContainer>
    </Suspense>
  );
};
export default LoginStack;

const styles = StyleSheet.create({});
