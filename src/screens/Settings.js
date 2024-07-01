import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Setting_com from '../component/Setting_com';
import User from '../assets/svgs/User';
import LogOut_Modal from '../component/LogOut_Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Logout} from '../Slice/LoginAuthSlice';
import {useDispatch} from 'react-redux';

const Settings = props => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const OpenModal = () => {
    return (
      <LogOut_Modal
      name={"Logout"}
      subText={'Are you sure, do you want to logout?'}
        visible={show}
        setVisible={setShow}
        func={() => { 
          dispatch(Logout()).then(async a => {
            if (a.meta.requestStatus == 'fulfilled') {
               props.navigation.reset({
            index: 0,
            routes: [{ name: 'Quality' }] // Replace with your initial screen name
          });
              return props.navigation.navigate('Login');
            }
          });
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Setting_com
          title={'Account'}
          func={() =>
            props.navigation.navigate('Profile_Setting', {
              data: {
                first: 'Name',
                Second: 'Phone Number',
                Third: 'Email Address',
              },
            })
          }
        />
        <Setting_com
          title={'Company Information'}
          func={() =>
            props.navigation.navigate('Profile_Setting', {
              data: {
                first: 'Company Code',
                Second: 'Company Name',
                Third: 'Company Address',
              },
            })
          }
        />
        <Setting_com title={'Logout'} func={() => setShow(true)} />
        {OpenModal()}
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
