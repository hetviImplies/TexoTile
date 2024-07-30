import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-international-phone-number';
import {useDispatch} from 'react-redux';
import {LoginAuth} from '../Slice/LoginAuthSlice';
import ButtonPress from '../component/ButtonPress';
import LogoComponent from '../component/LogoComponent';
import TextComponent from '../component/TextComponent';
import Backhandler from '../component/BackHandler';
import Toast from '../../Toast';
import {hp, wp} from '../Global_Com/responsiveScreen';
import {Black, Cream_White, Red, White, Yellow} from '../Global_Com/color';
import screens from '../constants/screens';
import AppConstant from '../Utils/AppConstant';
import {GlobalStyles} from '../Global_Com/Style';
import {Down_Arrow} from '../assets/svgs/svg';
import { styleText } from '../assets/fonts/Fonts';
import Activity_Indicator from '../component/Activity_Indicator';
const {height, width} = Dimensions.get('window');

const Login = props => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [loading,setLoading]=useState(false)
  const [hasError, setHasError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toastRef = useRef(null);
  const dispatch = useDispatch();

  function handleInputValue(phoneNumber) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  useEffect(() => {
    if (isSubmitted) {
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

  const handleError = useCallback(
    message => {
      toastRef.current.error(message);
      toastRef.current.Height(-StatusBar.currentHeight);
    },
    [toastRef],
  );

  const HandlePress = () => {
    setIsSubmitted(true);
    if (inputValue !== '') {
      const cleanedPhoneNumber = inputValue.replace(/\s/g, '');
      const isValid = Boolean(cleanedPhoneNumber.match(/^([6-9]{1}[0-9]{9})$/));
      if (isValid) {
        setLoading(true)
        setError('');
        setHasError(false);
        const obj = {
          country_code: selectedCountry.callingCode.split('+')[1],
          mobile_number: inputValue.replace(/\s/g, ''),
        };
        try {
          dispatch(LoginAuth(obj)).then(async res => {
            if (res.meta.requestStatus == 'fulfilled') {
              if (
                res.payload.error === false &&
                res.payload.statusCode === 200
              ) {
                await AsyncStorage.setItem(
                  'user',
                  JSON.stringify(res.payload.result),
                );
                setLoading(false)
                setInputValue('');
                setIsSubmitted(false);
                props.navigation.navigate(screens.VerifyPhone);
              } else {
                setLoading(false)
                handleError(res.payload.message);
              }
            } else {
              setLoading(false)
              handleError("Rejected !!!");
            }
          });
        } catch (error) {
          setLoading(false)
          handleError(error);
        }
      } else {
        setLoading(false)
        setError('Please Enter Valid Number!!!');
        setHasError(true);
      }
    } else {
      setLoading(false)
      setError('Please Enter Valid Number!!!');
      setHasError(true);
    }
  };

  return (
    <View
      style={GlobalStyles.container}
      >
      {
        loading ? <Activity_Indicator /> : null
      }
      <Toast ref={toastRef} />
      <LogoComponent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        contentContainerStyle={styles.formContainer}>
        <TextComponent
          main={AppConstant.EnterPhoneNumber}
          sub={AppConstant.ConfirmationCode}
        />
        <PhoneInput
          value={inputValue}
          selectionColor={Yellow}
          placeholder="Phone Number"
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          customCaret={
            <View
              style={{
                left:
                  selectedCountry?.callingCode?.length == 3
                    ? 40
                    : selectedCountry?.callingCode?.length == 4
                    ? 50
                    : 56,
                height: 10,
                width: 10,
                position: 'absulate',
              }}>
              <Down_Arrow height={wp(2.5)} width={wp(2.5)} />
            </View>
          }
          defaultCountry="IN"
          phoneInputStyles={{
            flag: {
              display: 'none',
            },
            caret: {
              display: 'none',
              color: Black,
            },
            container: {
              backgroundColor: Cream_White,
              borderRadius: 15,
              marginTop: '5%',
              height: hp(6.7),
              borderWidth:0
            },
            divider: {
              left:
                selectedCountry?.callingCode?.length == 3
                  ? 40
                  : selectedCountry?.callingCode?.length == 4
                  ? 45
                  : 50,
              borderRightWidth:1
            },
            flagContainer: {
              backgroundColor: Cream_White,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            },
            callingCode: {
              right: 35,
              position: 'abs',
              ...styleText.semiBold
            },
            input: {
              right: 20,
            },
          }}
        />
        {hasError && <Text style={styles.error}>{error}</Text>}
      </ScrollView>

      <ButtonPress isDisable={loading} title={AppConstant.next} func={HandlePress} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White,
    borderWidth: 0,
  },
  formContainer: {
    padding: '5%',
    borderWidth: 0,
    paddingBottom: height / 5,
  },
  phoneInput: {
    flag: {
      display: 'none',
    },
    caret: {
      display: 'none',
      color: Black,
    },
    container: {
      backgroundColor: Cream_White,
      borderRadius: 15,
      marginTop: '5%',
      height: hp(6.7),
    },
    divider: {
      left: 40,
      borderWidth: 1,
    },
    flagContainer: {
      backgroundColor: Cream_White,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
    },
    callingCode: {
      right: 35,
      position: 'abs',
    },
    input: {
      right: 20,
    },
  },
  error: {
    color: Red,
    fontSize: hp(2),
    alignSelf: 'flex-end',
  },
});
