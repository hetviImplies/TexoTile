import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { URL } from '../URLs/URL';
import Logo from '../assets/svgs/Logo';
import {OtpInput} from 'react-native-otp-entry';
import ButtonPress from '../component/ButtonPress';
import LogoComponent from '../component/LogoComponent';
import TextComponent from '../component/TextComponent';
import Backhandler from '../component/BackHandler';
import {useDispatch} from 'react-redux';
import {OTPAuth} from '../Slice/LoginAuthSlice';
import { EndPoints } from '../URLs/EndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Toast from '../../Toast';
const VerifyPhone = props => {
  const {height, width} = Dimensions.get("screen");
  const [num, setNum] = useState();
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(59);
  const [otp, setOtp] = useState(null);
  const toastRef = useRef(null)
  useEffect(() => {
    const data = AsyncStorage.getItem('user').then(a => {
      const dt = JSON.parse(a);
      setNum('+' + dt.country_code + ' ' + dt.mobile_number);
    });
  }, []);

  useEffect(() => {
    Backhandler();
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

  const handleError = useCallback((message) => {
    toastRef.current.error(message)
    toastRef.current.Height(-30)
  }, [toastRef]);

  const HandlePress = async () => {
    if (otp?.length===6) {
      const obj = await AsyncStorage.getItem('user');
      let params = JSON.parse(obj);
      await fetch(`${URL}${EndPoints.OTPAPI}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country_code: params.country_code,
          mobile_number: params.mobile_number,
        }),
      })
        .then(response => response.json())
        .then(async(data) => {
          console.log('Response data:', data.result,'=======data41584156894')
          await AsyncStorage.setItem("login_token",data.result.login_token)
          console.log('data.result: ', data.result);
          setOtp(null)
          Resend()
          if(data.result.name){
            if(data.result.role){
              setOtp(null)
            return props.navigation.navigate("Tabs")
            }else{
              if(data.result.company_owner===null){
              setOtp(null)
              return props.navigation.navigate("Category")
              }else{
                if(data.result.company_owner===true){
                  return props.navigation.navigate("Tabs")
                }else{
                  return props.navigation.navigate("Request")
                }
              }
            }
        }else{
          return props.navigation.navigate("WelcomeScreen")
        }
      })
        .catch(error => {
          console.error('Error:', error);
        });
    }else{
      handleError("login OTP is not allowed to be empty")
    }
  };

  return (
    <View style={{backgroundColor: 'white',flex:1}}>
      <Toast ref={toastRef}/>
      <LogoComponent />
      <View style={{margin: '5%'}}>
        <TextComponent
          main="Verify phone"
          sub={'Code is sent to ' + num + ' Please Check your inbox'}
        />
        <OtpInput
          numberOfDigits={6}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onFilled={text => setOtp(text)}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
          theme={{
            containerStyle: {
              width: 350,
              alignSelf: 'center',
              marginTop: '10%',
            },
            pinCodeContainerStyle: {
              height: 50,
              width: 50,
              backgroundColor: '#FAFAFA',
            },
            pinCodeTextStyle: styles.pinCodeText,
            focusedPinCodeContainerStyle: {
              backgroundColor: '#FFF9F2',
              borderColor: '#E89E46',
            },
          }}
        />
        <View
          style={{alignSelf: 'center', flexDirection: 'row', marginTop: '5%'}}>
          <TouchableOpacity onPress={Resend}>
            <Text style={{color: 'black'}}>Resend code in </Text>
          </TouchableOpacity>
          <Text style={{color: '#E89E46'}}>
            {min}:{sec} Sec
          </Text>
        </View>
      </View>
      <ButtonPress title="Next" func={HandlePress} />
    </View>
  );
};

export default VerifyPhone;

const styles = StyleSheet.create({
  logoContainer: {
    height: 100,
    width: 300,
    borderWidth: 0,
    alignSelf: 'center',
    marginTop: '25%',
    alignItems: 'center',
  },
});
