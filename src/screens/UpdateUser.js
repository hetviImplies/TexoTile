import {Dimensions, Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LogoComponent from '../component/LogoComponent';
import TextComponent from '../component/TextComponent';
import Message from '../assets/svgs/Message';
import Profile from '../assets/svgs/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPress from '../component/ButtonPress';
import Backhandler from '../component/BackHandler';
import {useDispatch} from 'react-redux';
import {UpdateUserAuth} from '../Slice/LoginAuthSlice';
import { EndPoints } from '../URLs/EndPoints';
import { URL } from '../URLs/URL';
import { styleText } from '../assets/fonts/Fonts';
const WelcomeScreen = ({navigation}) => {
  const {height, width} = Dimensions.get('window');
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [EmailError, setEmailError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    Backhandler();
  }, []);
  console.log(error);

  useEffect(() => {
    ValidationForName()
  }, [name])


  const ValidationForName = () => {
    if(name == undefined){
      console.log('email: ', email);
      setError(false)
    }else{
      const nm = /^[a-zA-Z0-9._]{2,20}$/.test(name);
    setError(!nm)
    }
  }

  useEffect(() => {
    const emailRegex = /^(?:[\w\.-]+)?@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if(email == undefined){
      console.log('email: ', email);
      setEmailError(false)
    }else{
      const isValidEmail = emailRegex.test(email);
      setEmailError(!isValidEmail);
      console.log('isValidEmail: ', isValidEmail);
    }
  }, [email]);

  const HandlePress = async () => {
    Keyboard.dismiss();
    console.log('EmailError: ', EmailError);
    console.log('email: ',typeof email);
    if (!error && name && (email==undefined || (EmailError==false && email) || (email=='' && EmailError))) {

      console.log('EmailError: ', EmailError);

      await fetch(`${URL}${EndPoints.UpdateUserAPI}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name': name.toString(),
          'email': email==undefined ? '' : email.toString(),
        }),
      })
        .then(response => {
          return response.json();
        })
        .then(async data => {
          console.log('Response data:', data, '======');
          if (!data.error) {
            await AsyncStorage.setItem('name', name);
            return navigation.navigate('Category');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      ValidationForName()
      if(name==undefined){
      setError(true)
    }
    }
  };
  return (
    <View style={{backgroundColor: 'white',flex:1}}>
      <LogoComponent />
      <View style={{margin: '5%'}}>
        <TextComponent main="Welcome back" sub="Please enter your details." />
        <View style={{marginTop: '10%'}}>
          <View
            style={[styles.textInput_View,{borderColor:error ? "red" : "#FAFAFA"}]}>
            <Profile stroke={'black'} />
            <TextInput
            cursorColor={"#E89E46"}
              placeholder="Enter Name"
              value={name}
              onChangeText={e => setName(e)}
              style={styles.textInput}></TextInput>
          </View>
          {error ? (
          <Text style={styles.error_Text}>
            Username is required
          </Text>
        ) : null}
          <View
            style={[styles.textInput_View,{borderColor:EmailError ? "red" : "#FAFAFA"}]}>
            <Message />
            <TextInput

              placeholder="Enter Email (optional)"
              value={email}
              onChangeText={e => setEmail(e)}
              style={styles.textInput}></TextInput>
          </View>
          {EmailError ? (
          <Text style={styles.error_Text}>
            Invalid email
          </Text>
        ) : null}
        </View>

      </View>
      <ButtonPress title="Done" func={HandlePress} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  textInput_View:{
    width: '100%',
    marginTop: '5%',
    borderWidth: 1,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    paddingLeft: '7%',
    flexDirection: 'row',
  },
  textInput:{
    color: 'black',
    fontSize: 14,...styleText.semiBold,
    marginLeft: '5%',
    borderWidth:0,
    flexGrow:1
  },
  error_Text:{color: 'red', alignSelf: 'flex-end',...styleText.semiBold}
});
