import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LogoComponent from '../component/LogoComponent';
import TextComponent from '../component/TextComponent';
import ButtonPress from '../component/ButtonPress';
import OpenModal from '../component/OpenModal';
import {useDispatch} from 'react-redux';
import {CreateAuth, JoinAuth} from '../Slice/LoginAuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styleText} from '../assets/fonts/Fonts';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import Toast from '../../Toast';
const Category = props => {
  const {height, width} = Dimensions.get('window');
  const [addVisible, setAddVisible] = useState(false);
  const [joinVisible, setJoinVisible] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const dispatch = useDispatch();
  const toastRef = useRef(null)
  const OpenAdd = () => {
    return (
      <OpenModal
        value={companyName}
        setValue={setCompanyName}
        isDisable={isDisable}
        setIsDisable={setIsDisable}
        visible={addVisible}
        setVisible={setAddVisible}
        mainText={'Please enter your company name'}
        subText={'Lorem Ipsum is simply dummy text'}
        setFunc={e => setCompanyName(e)}
        BtnText={'Create Company'}
        Handle={async () => {
          await fetch(`${URL}${EndPoints.CreateCompany}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: companyName,
            }),
          })
            .then(response => {
              return response.json();
            })
            .then(data => {
              return props.navigation.navigate('Tabs');
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }}
        placeHolder={'Create Name'}
      />
    );
  };

  const OpenJoin = () => {
    return (
      <OpenModal
        value={companyCode}
        setValue={setCompanyCode}
        isDisable={isDisable}
        setIsDisable={setIsDisable}
        visible={joinVisible}
        setVisible={setJoinVisible}
        mainText={'Please enter your company code'}
        subText={'Lorem Ipsum is simply dummy text'}
        setFunc={e => setCompanyCode(e)}
        BtnText={'Join Company'}
        Handle={async() => {
          try {
            let response = await dispatch(JoinAuth({code: companyCode.toUpperCase()}))
            console.log('response123: ', response);
            if(response.payload.statusCode===200){
                  props.navigation.navigate("Request")
            }
          } catch (error) {
            console.log(error, 'error');
          }
        }}
        placeHolder={'Join Name'}
      />
    );
  };

  return (
    <View style={{backgroundColor: 'white', height: height}}>
    <Toast ref={toastRef} />
      <LogoComponent />
      <View style={{margin: '5%'}}>
        <TextComponent
          main="Select any of these preference"
          sub="Please choose your desire categories"
        />

        <TouchableOpacity
          onPress={() => setAddVisible(!addVisible)}
          style={styles.BtnContainer}>
          <Text style={styles.text}>Add Company</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setJoinVisible(!joinVisible)}
          style={styles.BtnContainer}>
          <Text style={styles.text}>Join Company</Text>
        </TouchableOpacity>
      </View>
      {OpenAdd()}
      {OpenJoin()}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  BtnContainer: {
    borderWidth: 2,
    height: '15%',
    borderRadius: 15,
    marginTop: '5%',
    borderColor: '#E89E46',
    backgroundColor: '#FFFAF3',
    justifyContent: 'center',
  },
  text: {
    color: '#E89E46',
    marginLeft: '5%',
    fontSize:16,
    ...styleText.semiBold,
  },
});
