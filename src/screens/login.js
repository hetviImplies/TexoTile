import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-international-phone-number';
import {useDispatch} from 'react-redux';
import {GetUser, LoginAuth, OTPAuth, UpdateUserAuth} from '../Slice/LoginAuthSlice';
import ButtonPress from '../component/ButtonPress';
import LogoComponent from '../component/LogoComponent';
import TextComponent from '../component/TextComponent';
import Backhandler from '../component/BackHandler';
import Toast from '../component/Toast';
import {hp, wp} from '../Global_Com/responsiveScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Black,
  Cream_White,
  Green,
  Red,
  White,
  Yellow,
} from '../Global_Com/color';
import screens from '../constants/screens';
import AppConstant from '../Utils/AppConstant';
import {GlobalStyles} from '../Global_Com/Style';
import {Down_Arrow, Email, Profile_Black} from '../assets/svgs/svg';
import {styleText} from '../assets/fonts/Fonts';
import Activity_Indicator from '../component/Activity_Indicator';
import {OtpInput} from 'react-native-otp-entry';
import {ConditionContext} from './ConditionContext';
import {emailRegex} from '../Utils/Regex';
const {height, width} = Dimensions.get('window');

const Login = props => {
  const {condition, setCondition} = useContext(ConditionContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [index, setIndex] = useState(0);
  const toastRef = useRef(null);
  const [num, setNum] = useState();
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(59);
  const [otp, setOtp] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [error2, setError2] = useState(false);
  const [EmailError, setEmailError] = useState();
  let input1 = useRef(null);
  let input2 = useRef(null);

  const Handle = async () => {
    try {
      await dispatch(GetUser()).then(async data => {
        console.log('data: ', data.payload.result.name);
        if(!data.payload.result.name){
          setIndex(2)
        }else{
          setIndex(0)
        }
    })
    } catch (error) {
      console.error('error1: ', error);
    }
  };

  const dispatch = useDispatch();

  function handleInputValue(phoneNumber) {
    setInputValue(phoneNumber);
  }

  useEffect(() => {
    Handle()
    AsyncStorage.getItem('user').then(a => {
      const dt = JSON.parse(a);
      setNum('+' + dt.country_code + ' ' + dt.mobile_number);
    });
  }, [index]);

  useEffect(() => {
    if(index===1){
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
    }
  }
  }, [sec,index]);

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }
  useEffect(() => {
    if (email == '') {
      setEmailError(false);
    } else {
      const isValidEmail = emailRegex.test(email);
      setEmailError(!isValidEmail);
    }
  }, [email]);

  useEffect(() => {
    ValidationForName();
  }, [name]);

  const ValidationForName = () => {
    if (name == undefined) {
      setError2(false);
    } else {
      const nm = /^[a-zA-Z0-9\s]+$/.test(name);
      setError2(!nm);
    }
  };

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

  const HandlePress = async () => {
    if (index === 0) {
      setIsSubmitted(true);
      if (inputValue !== '') {
        const cleanedPhoneNumber = inputValue.replace(/\s/g, '');
        const isValid = Boolean(
          cleanedPhoneNumber.match(/^([6-9]{1}[0-9]{9})$/),
        );
        if (isValid) {
          setLoading(true);
          setError('');
          setHasError(false);
          const obj = {
            country_code: selectedCountry.callingCode.split('+')[1],
            mobile_number: inputValue.replace(/\s/g, ''),
          };
          try {
            await dispatch(LoginAuth(obj)).then(async res => {
              console.log('res: ', res);
              if (res.meta.requestStatus == 'fulfilled') {
                if (
                  res.payload.error === false &&
                  res.payload.statusCode === 200
                ) {
                  await AsyncStorage.setItem(
                    'user',
                    JSON.stringify(res.payload.result),
                  );
                  setLoading(false);
                  setInputValue('');
                  setIsSubmitted(false);
                  setIndex(1);
                } else {
                  setLoading(false);
                  handleError(res.payload.message);
                }
              } else {
                setLoading(false);
                handleError(res.payload.message);
              }
            });
          } catch (error) {
            setLoading(false);
            handleError(error.message);
          }
        } else {
          setLoading(false);
          setError('Please Enter Valid Number!!!');
          setHasError(true);
        }
      } else {
        setLoading(false);
        setError('Please Enter Valid Number!!!');
        setHasError(true);
      }
    } else if (index === 1) {
      if (otp?.length === 6) {
        setLoading(true);
        const obj = await AsyncStorage.getItem('user');
        let params = JSON.parse(obj);
        try {
          const obj = {
            country_code: params.country_code,
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
                  setLoading(false);
                  return props.navigation.reset({
                    index: 0,
                    routes: [{name: screens.Tabs}],
                  });
                } else {
                  if (data.payload.result.company_owner === null) {
                    setLoading(false);
                    setOtp(null);
                    return props.navigation.reset({
                      index: 0,
                      routes: [{name: screens.Preference}],
                    });
                  } else {
                    if (data.payload.result.company_owner === true) {
                      setLoading(false);
                      return props.navigation.reset({
                        index: 0,
                        routes: [{name: screens.Tabs}],
                      }); //Tabs
                    } else {
                      setLoading(false);
                      return props.navigation.reset({
                        index: 0,
                        routes: [{name: screens.Request}],
                      });
                    }
                  }
                }
              } else {
                setLoading(false);
                setIndex(2);
              }
            })
            .catch(error => {
              setLoading(false);
              handleError(error.message);
            });
        } catch (error) {
          setLoading(false);
          handleError(error.message);
        }
      } else {
        handleError('login OTP is not allowed to be empty');
      }
    } else if (index === 2) {
      Keyboard.dismiss();
      if (
        !error2 &&
        name &&
        (email == '' ||
          (EmailError == false && email) ||
          (email == '' && EmailError))
      ) {
        setLoading(true);
        try {
          let newName = name.replace(/\s+/g, ' ');
          let newEmail = email.replace(/\s+/g, '');
          if (newName !== ' ') {
            const obj = JSON.stringify({
              name: newName.toString().trim(),
              email: newEmail == '' ? '' : newEmail.toString().trim(),
            });
            await dispatch(UpdateUserAuth(obj))
              .then(async data => {
                if (!data.payload.error) {
                  setLoading(false);
                  await AsyncStorage.setItem('name', name);
                  return props.navigation.reset({
                    index: 0,
                    routes: [{name: screens.Preference}],
                  });
                } else {
                  setLoading(false);
                  handleError(data.payload.message);
                }
              })
              .catch(error => {
                setLoading(false);
                handleError(error.message);
              });
          } else {
            setLoading(false);
            setError(true);
          }
        } catch (error) {
          setLoading(false);
          handleError(error.message);
        }
      } else {
        setLoading(false);
        ValidationForName();
        if (name == undefined) {
          setError2(true);
        }
      }
    }
  };

  const Resend = () => {
    setMin(1);
    setSec(59);
  };

  return (
    <View
      style={
        index === 2
          ? GlobalStyles.ContainerWithoutJustifty
          : GlobalStyles.container
      }>
      {loading ? <Activity_Indicator /> : null}
      <Toast ref={toastRef} />
      <LogoComponent />
      <KeyboardAwareScrollView
        alwaysBounceVertical={false}
            bounces={false}
            enableOnAndroid={true}
            contentContainerStyle={{
              paddingBottom: wp(5),
              paddingHorizontal: wp(6),
            }}
            showsVerticalScrollIndicator={false}
        >
        <TextComponent
          main={
            index === 0
              ? AppConstant.EnterPhoneNumber
              : index === 1
              ? 'Verify phone'
              : AppConstant.Welcome_back
          }
          sub={
            index === 0
              ? AppConstant.ConfirmationCode
              : index === 1
              ? 'Code is sent to ' + num + ' Please Check your inbox'
              : 'Please enter your details.'
          }
        />
        {index === 0 ? (
          <>
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
                  borderWidth: 0,
                },
                divider: {
                  left:
                    selectedCountry?.callingCode?.length == 3
                      ? 40
                      : selectedCountry?.callingCode?.length == 4
                      ? 45
                      : 50,
                  borderRightWidth: 1,
                },
                flagContainer: {
                  backgroundColor: Cream_White,
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                },
                callingCode: {
                  right: 35,
                  position: 'abs',
                  ...styleText.semiBold,
                },
                input: {
                  right: 20,
                },
              }}
            />
            {hasError && <Text style={styles.error}>{error}</Text>}
          </>
        ) : index === 1 ? (
          <>
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
                  borderWidth: 0,
                  height: 50,
                  width: 50,
                  backgroundColor: Cream_White,
                },
                pinCodeTextStyle: styles.pinCodeText,
                focusedPinCodeContainerStyle: {
                  backgroundColor: '#FFF9F2',
                  borderColor: Yellow,
                },
                focusStickStyle: {
                  backgroundColor: Yellow,
                },
              }}
            />
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                marginTop: '5%',
              }}>
              <TouchableOpacity onPress={Resend}>
                <Text style={{color: Black, ...styleText.medium}}>
                  Resend code in{' '}
                </Text>
              </TouchableOpacity>
              <Text style={{color: Yellow, ...styleText.medium}}>
                {min.toString().padStart(2, '0')}:
                {sec.toString().padStart(2, '0')} Sec
              </Text>
            </View>
          </>
        ) : (
          <>
            <View
              style={[
                styles.textInput_View,
                {borderColor: error2 ? Red : Cream_White},
              ]}>
              <Profile_Black />
              <TextInput
                selectionColor={Yellow}
                returnKeyLabel="next"
                ref={i => (input1 = i)}
                onSubmitEditing={() => input2.focus()}
                cursorColor={'#E89E46'}
                placeholder="Enter Name"
                value={name}
                onChangeText={e => {
                  let newName = e;
                  if (newName.charAt(0) === ' ') {
                    newName = newName.substring(1);
                  }
                  if (newName.length > 1) {
                    newName = newName.replace(/\s{2,}/g, ' ');
                  }
                  setName(newName);
                }}
                style={styles.textInput}></TextInput>
            </View>
            {error2 ? (
              <Text style={styles.error_Text}>Username is required</Text>
            ) : null}
            <View
              style={[
                styles.textInput_View,
                {borderColor: EmailError ? Red : Cream_White},
              ]}>
              <Email height={22} width={22} />
              <TextInput
                selectionColor={Yellow}
                ref={i => (input2 = i)}
                returnKeyLabel="done"
                placeholder="Enter Email (optional)"
                value={email}
                onChangeText={e => {
                  let email = e.replace(/\s+/g, '');
                  setEmail(email);
                }}
                style={styles.textInput}></TextInput>
            </View>
            {EmailError ? (
              <Text style={styles.error_Text}>Invalid email</Text>
            ) : null}
          </>
        )}
      </KeyboardAwareScrollView>
      <ButtonPress
        isDisable={loading}
        title={AppConstant.next}
        func={HandlePress}
      />
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
  pinCodeText: {
    color: Black,
    ...styleText.regular,
  },
  textInput_View: {
    width: '100%',
    marginTop: '5%',
    borderWidth: 1,
    height: 52,
    borderRadius: 15,
    backgroundColor: Cream_White,
    alignItems: 'center',
    paddingLeft: '7%',
    flexDirection: 'row',
  },
  textInput: {
    color: Black,
    fontSize: hp(1.8),
    ...styleText.semiBold,
    marginLeft: '5%',
    borderWidth: 0,
    flexGrow: 1,
  },
  error_Text: {color: Red, alignSelf: 'flex-end', ...styleText.semiBold},
});
