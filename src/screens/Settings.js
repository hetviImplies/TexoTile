import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Setting_com from '../component/Setting_com';
import LogOut_Modal from '../component/LogOut_Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetUser, Logout} from '../Slice/LoginAuthSlice';
import {useDispatch} from 'react-redux';
import {White} from '../Global_Com/color';
import screens from '../constants/screens';
import AppConstant from '../Utils/AppConstant';
import Toast from '../../Toast';
import { GlobalStyles } from '../Global_Com/Style';

const Settings = props => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const toastRef = useRef(null)
  const GetCompanyData = async () => {
    await dispatch(GetUser()).then(async a => {
      if (a.meta.requestStatus == 'fulfilled') {
        await props.navigation.navigate(screens.Profile_Setting, {
           data: {
             first: 'Company Code',
             Second: 'Company Name',
             Third: 'Company Address',
           },
           setData: {
             firstInput: a.payload.result.company.code,
             secondInput: a.payload.result.company.name,
             thirdInput: undefined,
           },
         });
       }
    })

  }

  const GetAccoundData = async () => {
    await dispatch(GetUser()).then(async a => {
      if (a.meta.requestStatus == 'fulfilled') {
        props.navigation.navigate(screens.Profile_Setting, {
          data: {
            first: AppConstant.Name,
            Second: 'Phone Number',
            Third: 'Email Address',
          },
          setData: {
            firstInput: a.payload.result.name,
            secondInput: a.payload.result.mobile_number,
            thirdInput: a.payload.result.email,
          },
        });
      }
    });

  };

  const handleError = useCallback((message) => {
    toastRef.current.error(message)
    toastRef.current.Height(-StatusBar.currentHeight)
  }, [toastRef]);

  const OpenModal = () => {
    return (
      <LogOut_Modal
        name={AppConstant.Logout}
        subText={AppConstant.SureLogout}
        visible={show}
        setVisible={setShow}
        func={() => {
          try{
          dispatch(Logout()).then(async a => {
            if (a.meta.requestStatus == 'fulfilled') {
              await AsyncStorage.removeItem('role');
              return props.navigation.reset({
                index: 0,
                routes: [{name: screens.Login}],
              });
            }
          });
        }catch(error){
          handleError(error)
        }
        }}
      />
    );
  };
  return (
    <View style={GlobalStyles.containerWithAlignItems}>
     <Toast ref={toastRef} />
        <Setting_com title={AppConstant.Account} func={GetAccoundData} />
        <Setting_com title={'Company Information'} func={GetCompanyData} />
        <Setting_com title={AppConstant.Logout} func={() => setShow(true)} />
        {OpenModal()}
    </View>
  );
};

export default Settings;


