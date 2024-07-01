import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Logout } from '../Slice/LoginAuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');
const LogOut_Modal = ({visible,setVisible,func,subText,name},props) => {


  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            height: height / 4.4,
            width: width,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <Text style={{fontSize:24,fontWeight:"500",color:"#2D303D",marginTop:'2%'}}>{name}</Text>
          <Text style={{fontSize:16,marginTop:'2%'}}>{subText}</Text>
          <View style={{flexDirection:"row",marginTop:"6%"}}>
            <TouchableOpacity onPress={()=>setVisible(false)} style={{borderWidth:0,height:height/13,width:width/2.4,borderRadius:15,backgroundColor:"#EAEAEA",justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:"#2D303D",fontSize:17}}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={func} style={{borderWidth:0,height:height/13,width:width/2.4,borderRadius:15,justifyContent:"center",alignItems:"center",marginLeft:"3%",backgroundColor:"#EFA44A"}}>
            <Text style={{color:"white",fontSize:17}}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogOut_Modal;

const styles = StyleSheet.create({});
