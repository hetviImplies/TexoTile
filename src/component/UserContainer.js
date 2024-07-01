import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Timer from '../assets/svgs/Timer';
import Accept from '../assets/svgs/Accept';
import Rejecte from '../assets/svgs/Rejecte';
import { styleText } from '../assets/fonts/Fonts';
import EditUser from '../assets/svgs/EditUser';
const {height, width} = Dimensions.get('window');
const UserContainer = ({name,time,type,remove_function,setId,proceedRequest}) => {
  return (
    <View style={styles.main_Container_View}>
      <View style={{flexDirection: 'row'}}>
        <Image source={require('../assets/Image/User.jpg')} />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: '10%',
            borderWidth: 1,
            borderColor: 'white',
            justifyContent: 'center',
          }}>
          <Text style={styles.name_Text}>{name}</Text>
          {type=="pending" ? <View
            style={{
              flexDirection: 'row',
              borderWidth: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Timer />
            <Text style={{marginLeft: '5%',fontSize:13,...styleText.regular}}>{time}</Text>
          </View> : null}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '20%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={proceedRequest}>
          {type=="pending" ? <Accept /> : <EditUser/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={remove_function}>
          <Rejecte />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserContainer;

const styles = StyleSheet.create({
  main_Container_View: {
    backgroundColor: 'white',
    height: height / 10,
    margin: width / 28,
    borderRadius: 15,
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: width / 25,
    justifyContent: 'space-between',
  },
  name_Text: {
    fontSize: 16,
    color: '#2D303D',
    ...styleText.bold
  },
});
