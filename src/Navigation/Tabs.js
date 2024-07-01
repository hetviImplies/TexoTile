import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Yarn from '../screens/Yarn';
import Quality from '../screens/Quality';
import User from '../screens/User';
import Settings from '../screens/Settings';
import QualityLogo from '../assets/svgs/QualityLogo';
import Vector from '../assets/svgs/Vector';
import Profile from '../assets/svgs/Profile';
import YarnLogo from '../assets/svgs/YarnLogo';
import SettingsLogo from '../assets/svgs/SettingsLogo';
import Point from '../assets/svgs/Point';
import Search from '../assets/svgs/Search';
import Logo from '../assets/svgs/Logo';
import Add from '../assets/svgs/Add';
import Header_logo from '../assets/svgs/Header_logo';
import { styleText } from '../assets/fonts/Fonts';

const Tab = createBottomTabNavigator();
const {height, weight} = Dimensions.get('window');
import { URL } from '../URLs/URL';
import { EndPoints } from '../URLs/EndPoints';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
const options = {
  tabBarStyle: {
    height: height / 9,
    shadowColor: '#000',
    backgroundColor: 'white',
  },
};
const Tabs = () => {
  const [isWriter,setIsWriter]=useState(null)

useFocusEffect(
    useCallback(() => {
        const response = axios.get(`${URL}${EndPoints.GetProfile}`).then((response)=>{
          setIsWriter(response.data?.result.role);
        })
    }, []))

  return (

    <Tab.Navigator screenOptions={options} initialRouteName="Quality">
      <Tab.Screen
        options={{
          headerShown:true,
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          title: 'Quality',
          tabBarLabelStyle:{
            ...styleText.regular
          },
          headerBackgroundContainerStyle: {
            backgroundColor: '#E89E46',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackground: () => {},
          tabBarIcon: ({color, focused}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <View style={{position: 'absolute'}}>
                  {focused ? <Point /> : null}
                </View>
                <View
                  style={{
                    top: '30%',
                    position: 'absolute',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <QualityLogo stroke={focused ? '#E89E46' : 'black'} />
                  <Text style={{color: focused ? '#E89E46' : 'black'}}>
                    Quality
                  </Text>
                </View>
              </View>
            );
          },
        }}
        name="Quality"
        component={Quality}
      />{ (isWriter=="writer" || isWriter=="root" || isWriter=="admin") ?
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          title: 'User',
          headerBackgroundContainerStyle: {
            backgroundColor: '#E89E46',
            zIndex:0,
          },
          headerShown:true,
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackground: () => {},
          tabBarIcon: ({color, focused}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <View style={{position: 'absolute'}}>
                  {focused ? <Point /> : null}
                </View>
                <View
                  style={{
                    top: '30%',
                    justifyContent: 'center',
                    position: 'absolute',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Profile stroke={focused ? '#E89E46' : 'black'} />
                  <Text style={{color: focused ? '#E89E46' : 'black'}}>
                    User
                  </Text>
                </View>
              </View>
            );
          },
        }}
        name="User"
        component={User}
      /> : null}
      <Tab.Screen
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          title: 'Yarn',
          headerBackgroundContainerStyle: {
            backgroundColor: '#E89E46',
            zIndex:0,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackground: () => {

          },
          tabBarIcon: ({color, focused}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <View style={{position: 'absolute'}}>
                  {focused ? <Point /> : null}
                </View>
                <View
                  style={{
                    top: '30%',
                    position: 'absolute',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <YarnLogo stroke={focused ? '#E89E46' : 'black'} />
                  <Text style={{color: focused ? '#E89E46' : 'black'}}>
                    Yarn
                  </Text>
                </View>
              </View>
            );
          },
        }}
        name="Yarn"
        component={Yarn}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          title: 'Setting',
          headerBackgroundContainerStyle: {
            backgroundColor: '#E89E46',
            zIndex:0,
          },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackground: () => {},
          tabBarIcon: ({color, focused}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <View style={{position: 'absolute'}}>
                  {focused ? <Point /> : null}
                </View>
                <View
                  style={{
                    top: '30%',
                    position: 'absolute',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <SettingsLogo stroke={focused ? '#E89E46' : 'black'} />
                  <Text style={{color: focused ? '#E89E46' : 'black'}}>
                    Settings
                  </Text>
                </View>
              </View>
            );
          },
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
