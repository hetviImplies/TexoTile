import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Logout } from '../Slice/LoginAuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styleText } from '../assets/fonts/Fonts';
import { hp, wp } from '../Global_Com/responsiveScreen';
import { Black, Grey_Button_Color, Transparent, White, Yellow } from '../Global_Com/color';
import AppConstant from '../Utils/AppConstant';
const {height, width} = Dimensions.get('window');
const LogOut_Modal = ({visible,setVisible,func,subText,name},props) => {


  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: Transparent,
        }}>
        <View
          style={{
            width: wp(100),
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: White,
            alignItems: 'center',
            paddingBottom:"4%"
          }}>
          <Text style={{fontSize:hp(3.5),color:Black,marginTop:'2%',...styleText.bold}}>{name}</Text>
          <Text style={{fontSize:hp(2),marginTop:'2%',...styleText.semiBold}}>{subText}</Text>
          <View style={{flexDirection:"row",marginTop:"6%"}}>
            <TouchableOpacity onPress={()=>setVisible(false)} style={{borderWidth:0,height:hp(7),width:wp(40),borderRadius:15,backgroundColor:Grey_Button_Color,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:Black,fontSize:hp(2.5),...styleText.semiBold}}>{AppConstant.NO}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={func} style={{borderWidth:0,height:hp(7),width:wp(40),borderRadius:15,justifyContent:"center",alignItems:"center",marginLeft:"3%",backgroundColor:Yellow}}>
            <Text style={{color:White,fontSize:hp(2.5),...styleText.semiBold}}>{AppConstant.YES}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogOut_Modal;

const styles = StyleSheet.create({});
