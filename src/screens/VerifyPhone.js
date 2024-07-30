import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {URL} from '../URLs/URL';
import {OtpInput} from 'react-native-otp-entry';
import ButtonPress from '../component/ButtonPress';
import LogoComponent from '../component/LogoComponent';
import TextComponent from '../component/TextComponent';
import Backhandler from '../component/BackHandler';

import {EndPoints} from '../URLs/EndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';
const {height, width} = Dimensions.get('window');
import Toast from '../../Toast';
import {ConditionContext} from './ConditionContext';
import {hp} from '../Global_Com/responsiveScreen';
import {styleText} from '../assets/fonts/Fonts';
import {Black, Cream_White, Green, White, Yellow} from '../Global_Com/color';
import screens from '../constants/screens';
import AppConstant from '../Utils/AppConstant';
import {useDispatch} from 'react-redux';
import {OTPAuth} from '../Slice/LoginAuthSlice';
import { GlobalStyles } from '../Global_Com/Style';
import Activity_Indicator from '../component/Activity_Indicator';
const VerifyPhone = props => {
  const {condition, setCondition} = useContext(ConditionContext);
  const [num, setNum] = useState();
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(59);
  const [otp, setOtp] = useState();
  const [loading,setLoading]=useState(false)
  const toastRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = AsyncStorage.getItem('user').then(a => {
      const dt = JSON.parse(a);
      setNum('+' + dt.country_code + ' ' + dt.mobile_number);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
      if (sec == 0) {
        if (min == 0) {
          clearInterval(interval);
        } else {
          setSec(59);
          setMin(min - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [sec]);

  const Resend = () => {
    setMin(1);
    setSec(59);
  };

  const handleError = useCallback(
    message => {
      toastRef.current.error(message);
      toastRef.current.Height(-StatusBar.currentHeight);
    },
    [toastRef],
  );

  const HandlePress = async () => {
    if (otp?.length === 6) {
      setLoading(true)
      const obj = await AsyncStorage.getItem('user');
      let params = JSON.parse(obj);
      try {
        const obj = {
          country_code: undefined,
          mobile_number: params.mobile_number,
        };
        await dispatch(OTPAuth(obj))
          .then(async data => {
            await AsyncStorage.setItem(
              'login_token',
              data.payload.result.login_token,
            );
            setCondition(data?.payload?.result?.role);
            setOtp(null);
            Resend();
            if (data.payload.result.name) {
              if (data.payload.result.role) {
                setOtp(null);
                setLoading(false)
                return props.navigation.reset({
                  index: 0,
                  routes: [{name: screens.Tabs}],
                });
              } else {
                if (data.payload.result.company_owner === null) {
                  setLoading(false)
                  setOtp(null);return props.navigation.reset({
                    index: 0,
                    routes: [{name: screens.Preference}],
                  });
                } else {
                  if (data.payload.result.company_owner === true) {
                    setLoading(false)
                    return props.navigation.reset({
                      index: 0,
                      routes: [{name: screens.Tabs}],
                    });  //Tabs
                  } else {
                    setLoading(false)
                    return props.navigation.reset({
                      index: 0,
                      routes: [{name: screens.Request}],
                    });
                  }
                }
              }
            } else {
              setLoading(false)
              return props.navigation.reset({
                index: 0,
                routes: [{name: screens.UpdateUser}],
              });
            }
          })
          .catch(error => {
            setLoading(false)
            handleError(error.message);
          });
      } catch (error) {
        setLoading(false)
        handleError(error.message);
      }
    } else {
      handleError('login OTP is not allowed to be empty');
    }
  };

  return (
    <View
      style={GlobalStyles.container}>
      <Toast ref={toastRef} />
      {
        loading ? <Activity_Indicator/> : null
      }
      <LogoComponent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        contentContainerStyle={{
          padding: '5%',
          borderWidth: 0,
          paddingBottom: height / 7,
        }}>
        <TextComponent
          main="Verify phone"
          sub={'Code is sent to ' + num + ' Please Check your inbox'}
        />
        <OtpInput

          numberOfDigits={6}
          focusColor={Green}
          focusStickBlinkingDuration={500}
          onTextChange={text => setOtp(text)}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',

          }}

          theme={{

            containerStyle: {
              width: 350,
              alignSelf: 'center',
              marginTop: hp(3),
            },
            pinCodeContainerStyle: {
              borderWidth:0,
              height: 50,
              width: 50,
              backgroundColor: Cream_White,

            },
            pinCodeTextStyle: styles.pinCodeText,
            focusedPinCodeContainerStyle: {
              backgroundColor: '#FFF9F2',
              borderColor: Yellow,
            },
            focusStickStyle:{
              backgroundColor : Yellow
            }
          }}
        />
        <View
          style={{alignSelf: 'center', flexDirection: 'row', marginTop: '5%'}}>
          <TouchableOpacity onPress={Resend}>
            <Text style={{color: Black, ...styleText.medium}}>
              Resend code in{' '}
            </Text>
          </TouchableOpacity>
          <Text style={{color: Yellow, ...styleText.medium}}>
            {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')} Sec
          </Text>
        </View>
      </ScrollView>
      <ButtonPress isDisable={loading} title={AppConstant.next} func={HandlePress} />
    </View>
  );
};

export default VerifyPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White,
  },
  pinCodeText:{
    color : Black,
    ...styleText.regular
  }
});
