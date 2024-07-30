import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { styleText } from '../assets/fonts/Fonts';
import { Accept_Logo, Close_Red, Edit_User, Timer } from '../assets/svgs/svg';
import { Black, White } from '../Global_Com/color';
import { wp } from '../Global_Com/responsiveScreen';
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
            borderColor: White,
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
            <Timer height={wp(3)} width={wp(3)}/>
            <Text style={{fontSize:13,...styleText.regular,maxWidth:width/3,marginLeft:"5%",borderWidth:0}}>{time}</Text>
          </View> : null}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '20%',
          justifyContent: 'space-between',
          alignItems:"center"
        }}>
        <TouchableOpacity onPress={proceedRequest}>
          {type=="pending" ? <Accept_Logo height={wp(7.5)} width={wp(7.5)}/> : <Edit_User height={wp(7.5)} width={wp(7.5)}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={remove_function}>
          <Close_Red height={wp(8)} width={wp(8)}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserContainer;

const styles = StyleSheet.create({
  main_Container_View: {
    backgroundColor: White,
    marginVertical:width/60,
    marginHorizontal:width/28,
    borderRadius: 15,
    shadowColor: Black,
    backgroundColor: White,
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
    color: Black,
    ...styleText.bold,
    maxWidth:wp(30)
  },
});
