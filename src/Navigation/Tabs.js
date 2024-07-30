import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Yarn from '../screens/Yarn';
import Quality from '../screens/Quality';
import User from '../screens/User';
import Settings from '../screens/Settings';
import {styleText} from '../assets/fonts/Fonts';

const Tab = createBottomTabNavigator();
const {height, weight} = Dimensions.get('window');
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import { Profile_Black, Profile_Yellow, QualityLogo, QualityLogo_Black, QualityLogo_Yellow, Setting_Black, Setting_Yellow, Union, Yarn_Black, Yarn_Logo, Yarn_Yellow } from '../assets/svgs/svg';
import { ConditionContext } from '../screens/ConditionContext';
import { hp, wp } from '../Global_Com/responsiveScreen';
import { Black, White, Yellow } from '../Global_Com/color';
const options = {
  tabBarStyle: {
    height: hp(11),
    shadowColor: Black,
    backgroundColor: White,

  },
  keyboardVerticalOffset : 100
};
const Tabs = (props) => {
  const { condition,setCondition } = useContext(ConditionContext);
  useFocusEffect(
    useCallback(() => {
      const response = axios.get(`${URL}${EndPoints.GetProfile}`).then((res)=>{
        setCondition(res.data.result.role);
      })
    }, [])
  );
  return (
    <Tab.Navigator screenOptions={options} initialRouteName="Quality">
      <Tab.Screen
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          title: 'Quality',
          tabBarLabelStyle: {
            ...styleText.regular,
          },
          headerBackgroundContainerStyle: {
            backgroundColor: Yellow,
          },
          headerTintColor: White,
          headerTitleStyle: {
            ...styleText.bold,
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
                <View style={{position: 'absolute',top:-2}}>
                  {focused ? <Union height={hp(2)} width={hp(6)}/> : null}
                </View>
                <View
                  style={{
                    top: '30%',
                    position: 'absolute',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  {
                    focused ? <QualityLogo_Yellow height={hp(4.2)} width={hp(4.2)}/> : <QualityLogo_Black height={hp(4.2)} width={hp(4.2)}/>
                  }
                  <Text style={{color: focused ? Yellow : Black,fontSize:wp(3.4),...styleText.semiBold}}>
                    Quality
                  </Text>
                </View>
              </View>
            );
          },
        }}
        name="Quality"
        component={Quality}
      />
      {
        (condition === 'root' || condition === 'admin')
       ? (
        <Tab.Screen
          options={{
            tabBarShowLabel: false,

            headerBackgroundContainerStyle: {
              backgroundColor: Yellow,
            },
            headerShown: true,

            headerBackground: () => {},
            tabBarIcon: ({color, focused}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}>
                  <View style={{position: 'absolute',top:-2}}>
                    {focused ? <Union height={hp(2)} width={hp(6)}/> : null}
                  </View>
                  <View
                    style={{
                      top: '30%',
                      justifyContent: 'center',
                      position: 'absolute',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    {
                    focused ? <Profile_Yellow  height={hp(4.2)} width={hp(4.2)}/> : <Profile_Black  height={hp(4.2)} width={hp(4.2)}/>
                  }
                    <Text style={{color: focused ? Yellow : Black,fontSize:wp(3.4),...styleText.semiBold}}>
                      User
                    </Text>
                  </View>
                </View>
              );
            },
          }}
          name="User"
          component={User}
        />
      ) : null}
      <Tab.Screen
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          title: 'Yarn',
          headerBackgroundContainerStyle: {
            backgroundColor: Yellow,
          },
          headerTintColor: White,
          headerTitleStyle: {
            ...styleText.bold,
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
                <View style={{position: 'absolute',top:-2}}>
                  {focused ? <Union height={hp(2)} width={hp(6)}/> : null}
                </View>
                <View
                  style={{
                    top: '30%',
                    position: 'absolute',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                 {
                    focused ? <Yarn_Yellow  height={hp(4.2)} width={hp(4.2)}/> : <Yarn_Black  height={hp(4.2)} width={hp(4.2)}/>
                  }
                  <Text style={{color: focused ? Yellow : Black,fontSize:wp(3.4),...styleText.semiBold}}>
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
            backgroundColor: Yellow,
            zIndex: 0,
          },
          headerTintColor: White,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            ...styleText.bold,
          },
          headerLeft: () => (
            <View style={{marginLeft: '13%'}}>
             <Yarn_Logo height={hp(9)} width={wp(9)} />
            </View>
          ),
          headerBackground: () => {},
          tabBarIcon: ({color, focused}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <View style={{position: 'absolute',top:-2}}>
                  {focused ? <Union height={hp(2)} width={hp(6)}/> : null}
                </View>
                <View
                  style={{
                    top: '30%',
                    position: 'absolute',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  {
                    focused ? <Setting_Yellow  height={hp(4.2)} width={hp(4.2)}/> : <Setting_Black  height={hp(4.2)} width={hp(4.2)}/>
                  }
                  <Text style={{color: focused ? Yellow : Black,fontSize:wp(3.4),...styleText.semiBold}}>
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
