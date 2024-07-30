import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import VerifyPhone from '../screens/VerifyPhone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateUser from '../screens/UpdateUser';
import Preference from '../screens/Preference';
import Tabs from './Tabs';
import Request from '../screens/Request';
import QualityDetail from '../screens/QualityView';
import UpdateYarn from '../screens/UpdateYarn';
import Profile_Setting from '../screens/Profile_Setting';
import Activity_Indicator from '../component/Activity_Indicator';
import {styleText} from '../assets/fonts/Fonts';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import ImageView from '../screens/ImageView';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Store from '../store/store';
import {ConditionProvider} from '../screens/ConditionContext';
import {White, Yellow} from '../Global_Com/color';
import {hp} from '../Global_Com/responsiveScreen';
import screens from '../constants/screens';
import {GetUser} from '../Slice/LoginAuthSlice';

const LoginStack = () => {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);
  const stack = createStackNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    Handle();
  }, []);

  const Handle = async () => {
    try {
      await dispatch(GetUser()).then(async data => {
        setLoading(false);
        if (data.payload.result.mobile_number) {
          if (data.payload.result.name) {
            if (data.payload.result.role) {
              setName(screens.Tabs);
            } else {
              if (
                data.payload.result.company_owner === false &&
                !data.payload.result.role
              ) {
                setName(screens.Request);
              } else if (data.payload.result.company_owner === null) {
                setName(screens.Preference);
              }
            }
          } else {
            setName(screens.Login);
          }
        } else {
          setName(screens.Login);
        }
      });
    } catch (error) {
      console.error('error1: ', error);
      setName(screens.Login);
    }
  };

  const options = {
    headerShown: false,
  };

  return (
    <Suspense fallback={<Activity_Indicator />}>
      <StatusBar backgroundColor={Yellow} barStyle="light-content" />
      <NavigationContainer>
        <ConditionProvider>
          {name !== undefined ? (
            <stack.Navigator screenOptions={options} initialRouteName={name}>
              <stack.Screen
                component={Login}
                name={screens.Login}></stack.Screen>
              <stack.Screen
                component={ConditionProvider}
                name={screens.ConditionProvider}></stack.Screen>
              <stack.Screen
                component={Preference}
                name={screens.Preference}></stack.Screen>
              <stack.Screen
                component={Tabs}
                name={screens.Tabs}
                initialParams={{role: role}}></stack.Screen>
              <stack.Screen
                component={Request}
                name={screens.Request}></stack.Screen>
              <stack.Screen
                component={QualityDetail}
                name={screens.QualityDetail}
                options={{
                  headerShown: true,
                }}></stack.Screen>
              <stack.Screen
                component={UpdateYarn}
                name={screens.UpdateYarn}
                options={{
                  headerShown: true,
                  headerTitleAlign: 'center',
                  headerBackgroundContainerStyle: {
                    backgroundColor: Yellow,
                  },
                  headerTintColor: White,
                  headerBackground: () => {},
                }}></stack.Screen>
              <stack.Screen
                component={Profile_Setting}
                options={{
                  headerBackgroundContainerStyle: {
                    backgroundColor: Yellow,
                  },
                  headerShown: true,
                  headerBackground: () => {},
                }}
                name={screens.Profile_Setting}></stack.Screen>
              <stack.Screen
                component={ImageView}
                name={screens.ImageView}></stack.Screen>
            </stack.Navigator>
          ) : (
            Handle()
          )}
        </ConditionProvider>
      </NavigationContainer>
    </Suspense>
  );
};
export default LoginStack;

const styles = StyleSheet.create({});
