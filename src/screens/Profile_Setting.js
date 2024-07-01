import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Profile_com from '../component/Profile_com'
import Save from '../assets/svgs/Save';
import LeftArrow from '../assets/svgs/LeftArrow';
import ButtonPress from '../component/ButtonPress';
import { useDispatch } from 'react-redux';
import { GetUser, UpdateUserAuth } from '../Slice/LoginAuthSlice';
const {height, width} = Dimensions.get('window');
const Profile_Setting = (props) => {
    const [first,setFirst]=useState()
    const [second,setSecond]=useState()
    const [third,setThird]=useState()

    const dispatch=useDispatch()
    const{data}=props.route.params;
    useEffect(()=>{
        if(data.first=="Name"){
            dispatch(GetUser()).then((a)=>{
                setFirst(a.payload.result.name)
                setSecond(a.payload.result.mobile_number)
                setThird(a.payload.result.email)
            })
        }else{
            dispatch(GetUser()).then((a)=>{
                setFirst(a.payload.result.company.code)
                setSecond(a.payload.result.company.name)
            })
        }
    },[data])

    const HandlePress=()=>{
        if(data.first=="Name"){
            const obj={
                name : first,
                email : third
            }
                dispatch(UpdateUserAuth(JSON.stringify(obj))).then((a)=>{
                    console.log(a.meta);
                    if(a.meta.requestStatus=="fulfilled"){
                        return props.navigation.goBack()
                    }
                })
        }else{
            return props.navigation.goBack()
        }
    }

  return (
    <View style={{backgroundColor:"white",flex:1}}>
        <View style={styles.header}>
        <View style={styles.header_container}>
          <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <LeftArrow color={"white"}/>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
            Account
          </Text>
          <View></View>
        </View>
      </View>
      <Profile_com style={{color:"rgba(45, 48, 61, 0.3)"}} title={data.first} value={first} setvalue={setFirst} disable={data.first=="Name" ? true : false}/>
      <Profile_com style={{color:"rgba(45, 48, 61, 0.3)"}} title={data.Second} value={second} setvalue={setSecond} disable={false}/>
      <Profile_com style={{color:"rgba(86, 90, 112, 1)"}} title={data.Third} value={third} setvalue={setThird} disable={true} placeholder={data.first=="Name" ? "Enter Email (optional)" : "Enter Address"}/>
      <ButtonPress title={"Save"} func={HandlePress}/>
    </View>
  )
}

export default Profile_Setting

const styles = StyleSheet.create({
    header: {
        height: height / 14,
        backgroundColor: '#E89E46',
        justifyContent:"center"
      },
      header_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '4%'
      },
      shadow: {
        shadowOffset: {width: 4, height: 0},
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
      },
})