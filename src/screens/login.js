import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/svgs/Logo';
import Vector from '../assets/svgs/Vector';
import PhoneInput from 'react-native-international-phone-number';
import {useDispatch} from 'react-redux';
import {LoginAuth} from '../Slice/LoginAuthSlice';
import ButtonPress from '../component/ButtonPress';
import LogoComponent from '../component/LogoComponent';
import TextComponent from '../component/TextComponent';
import Backhandler from '../component/BackHandler';
import fonts from '../assets/fonts/Fonts';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const Login = props => {
  const {height, width} = Dimensions.get('window');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toastRef = useRef(null)
  const dispatch = useDispatch();

  function handleInputValue(phoneNumber) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  useEffect(() => {
    Backhandler();
  }, []);

  useEffect(() => {
    if(isSubmitted){
    if (inputValue !== '') {
      const cleanedPhoneNumber = inputValue.replace(/\s/g, '');
      const isValid = Boolean(cleanedPhoneNumber.match(/^\d{10}$/));
      if (isValid) {
        setError('');
        setHasError(false);
      } else {
        setError('Please Enter Valid Number!!!');
        setHasError(true);
      }
    }
  }
  }, [inputValue]);

  const handleError = useCallback((message) => {
    showMessage({
      message: "Error",
      type:"danger",
      description : message,
      icon : { icon: "danger",position:"left" },
      style:{
        alignItems:"center"
      }
    });
  }, [toastRef]);

  const HandlePress = () => {
    setIsSubmitted(true);
    if (inputValue !== '') {
      const cleanedPhoneNumber = inputValue.replace(/\s/g, '');
      const isValid = Boolean(cleanedPhoneNumber.match(/^\d{10}$/));
      if (isValid) {
        setError('');
        setHasError(false);
        const obj = {
          country_code: selectedCountry.callingCode.split('+')[1],
          mobile_number: inputValue.replace(/\s/g, ''),
        };
        dispatch(LoginAuth(obj)).then(async res => {
          if (res.meta.requestStatus == 'fulfilled') {
            if (res.payload.error === false && res.payload.statusCode === 200) {
              await AsyncStorage.setItem('user', JSON.stringify(res.payload.result));
              setInputValue('');
              setIsSubmitted(false)
              props.navigation.navigate('VerifyPhone');
            } else {
              console.log('try again');
            }
          }
        });
      } else {
        setError('Please Enter Valid Number!!!');
        setHasError(true);
      }
    } else {
      setError('Please Enter Valid Number!!!');
      setHasError(true);
    }
  };

  return (
    <View style={styles.container}>
    <FlashMessage ref={toastRef} />
      <LogoComponent style={styles.logoContainer} />
      <View style={styles.formContainer}>
        <TextComponent
          main="Enter your Mobile number"
          sub="We will send you a confirmation code"
          style={styles.text}
        />
        <PhoneInput
          value={inputValue}
          placeholder='Phone Number'
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          customCaret={<Vector style={{borderWidth: 1,
    left: selectedCountry?.callingCode?.length==3 ? 40 : selectedCountry?.callingCode?.length==4 ? 45 : 50,
    height: 10,
    width: 10,
    position: "absulate",}} />}
          defaultCountry="IN"
          phoneInputStyles={styles.phoneInput}
        />
        {hasError && <Text style={styles.error}>{error}</Text>}
      </View>
      <ButtonPress title="Next" func={HandlePress} style={styles.button} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    height: 100,
    width: 300,
    alignSelf: 'center',
    marginTop: '25%',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  customCaret: {
    borderWidth: 1,
    left: 45,
    height: 10,
    width: 10,
    position: "absolute",
  },
  phoneInput: {
    flag: {
      display: 'none',
    },
    caret: {
      display: 'none',
      color: 'black',
    },
    container: {
      backgroundColor: '#FAFAFA',
      borderRadius: 15,
      marginTop: '5%',
      height: 52,
    },
    divider: {
      left: 40,
      borderWidth: 1,
    },
    flagContainer: {
      backgroundColor: '#FAFAFA',
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
    },
    callingCode: {
      right: 35,
      position:"abs"
    },
    input: {
      right: 20,
    },
  },
  error: {
    color: 'red',
    fontSize: 16,
  alignSelf:"flex-end"}
});