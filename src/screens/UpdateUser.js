import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import LogoComponent from '../component/LogoComponent';
import TextComponent from '../component/TextComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPress from '../component/ButtonPress';
import Backhandler from '../component/BackHandler';
import {useDispatch} from 'react-redux';
import {UpdateUserAuth} from '../Slice/LoginAuthSlice';
import {EndPoints} from '../URLs/EndPoints';
import {URL} from '../URLs/URL';
import {styleText} from '../assets/fonts/Fonts';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Email, Profile_Black} from '../assets/svgs/svg';
import {hp} from '../Global_Com/responsiveScreen';
import {Black, Cream_White, Red, White, Yellow} from '../Global_Com/color';
import screens from '../constants/screens';
import AppConstant from '../Utils/AppConstant';
import Toast from '../../Toast';
import {GlobalStyles} from '../Global_Com/Style';
import {emailRegex} from '../Utils/Regex';
import Activity_Indicator from '../component/Activity_Indicator';

const UpdateUser = ({navigation}) => {
  const {height, width} = Dimensions.get('window');
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [EmailError, setEmailError] = useState();
  const dispatch = useDispatch();
  const toastRef = useRef(null);
  const [loading, setLoading] = useState(false);
  let input1 = useRef(null);
  let input2 = useRef(null);


  useEffect(() => {
    ValidationForName();
  }, [name]);

  const ValidationForName = () => {
    if (name == undefined) {
      setError(false);
    } else {
      const nm = /^[a-zA-Z0-9\s]+$/.test(name);
      setError(!nm);
    }
  };

  useEffect(() => {
    if (email == '') {
      setEmailError(false);
    } else {
      const isValidEmail = emailRegex.test(email);
      setEmailError(!isValidEmail);
    }
  }, [email]);

  const handleError = useCallback(
    message => {
      toastRef.current.error(message);
      toastRef.current.Height(-StatusBar.currentHeight);
    },
    [toastRef],
  );

  const HandlePress = async () => {
    Keyboard.dismiss();
    if (
      !error &&
      name &&
      (email == '' ||
        (EmailError == false && email) ||
        (email == '' && EmailError))
    ) {
      console.log('loading', loading);
      setLoading(true);
      try {
        let newName = name.replace(/\s+/g, ' ');
        let newEmail = email.replace(/\s+/g, '');
        if(newName!==' '){
        const obj = JSON.stringify({
          name: newName.toString().trim(),
          email: newEmail == '' ? '' : newEmail.toString().trim(),
        });
        await dispatch(UpdateUserAuth(obj))
          .then(async data => {
            if (!data.payload.error) {
              setLoading(false);
              await AsyncStorage.setItem('name', name);
              return navigation.reset({
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
          });}else{
            setLoading(false)
            setError(true)
          }
      } catch (error) {
        setLoading(false);
        handleError(error.message);
      }
    } else {
      setLoading(false);
      ValidationForName();
      if (name == undefined) {
        setError(true);
      }
    }
  };
  return (
    <View
      style={GlobalStyles.ContainerWithoutJustifty}>
      <Toast ref={toastRef} />
      {loading ? <Activity_Indicator /> : null}
      <LogoComponent />
      <View style={{margin: '5%'}}>
        <TextComponent
          main={AppConstant.Welcome_back}
          sub="Please enter your details."
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: hp(1),
            borderWidth: 0,
            height: hp(70),
          }}>
          <View
            style={[
              styles.textInput_View,
              {borderColor: error ? Red : Cream_White},
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
                let newName = e; // don't use trim() here
                  if (newName.charAt(0) === ' ') {
                    // if the first character is a space, remove it
                    newName = newName.substring(1);
                  }
                  if (newName.length > 1) {
                    // if the input string has more than one character
                    newName = newName.replace(/\s{2,}/g, ' '); // replace 2 or more spaces with a single space
                  }
                setName(newName)
                }}
              style={styles.textInput}></TextInput>
          </View>
          {error ? (
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
                let email = e.replace(/\s+/g, '')
                setEmail(email)
                }}
              style={styles.textInput}></TextInput>
          </View>
          {EmailError ? (
            <Text style={styles.error_Text}>Invalid email</Text>
          ) : null}
        </ScrollView>
      </View>
      <ButtonPress
        isDisable={loading}
        title={AppConstant.Done}
        func={HandlePress}
      />
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
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
