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
import Toast from '../component/Toast';
import {GlobalStyles} from '../Global_Com/Style';
import Activity_Indicator from '../component/Activity_Indicator';

const Settings = props => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);
  const GetCompanyData = async () => {
    setLoading(true);
    try {
      await dispatch(GetUser()).then(async a => {
        if (a.payload.error === false) {
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
        } else {
          handleError(a.payload.message);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      handleError(error.message);
    }
  };

  const GetAccoundData = async () => {
    setLoading(true);
    try {
      await dispatch(GetUser()).then(async a => {
        if (a.payload.error === false) {
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
        } else {
          handleError(a.payload.message);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      handleError(error.message);
    }
  };

  const handleError = useCallback(
    message => {
      toastRef.current.error(message);
      toastRef.current.Height(-StatusBar.currentHeight);
    },
    [toastRef],
  );

  const OpenModal = () => {
    return (
      <LogOut_Modal
        name={AppConstant.Logout}
        subText={AppConstant.SureLogout}
        visible={show}
        setVisible={setShow}
        func={() => {
          try {
            dispatch(Logout()).then(async a => {
              if (a.meta.requestStatus == 'fulfilled') {
                await AsyncStorage.removeItem('role');
                return props.navigation.reset({
                  index: 0,
                  routes: [{name: screens.Login}],
                });
              }
            });
          } catch (error) {
            handleError(error);
          }
        }}
      />
    );
  };
  return (
    <View style={GlobalStyles.containerWithAlignItems}>
      <Toast ref={toastRef} />
      {loading ? <Activity_Indicator /> : null}
      <Setting_com title={AppConstant.Account} func={GetAccoundData} />
      <Setting_com title={'Company Information'} func={GetCompanyData} />
      <Setting_com title={AppConstant.Logout} func={() => setShow(true)} />
      {OpenModal()}
    </View>
  );
};

export default Settings;
