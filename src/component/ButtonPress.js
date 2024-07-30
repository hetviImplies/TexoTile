import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styleText } from '../assets/fonts/Fonts'
import { hp, wp } from '../Global_Com/responsiveScreen'
import { White, Yellow } from '../Global_Com/color'
const {height,width}=Dimensions.get("window")
const ButtonPress = ({title,func,isDisable}) => {
  return (
    <TouchableOpacity disabled={isDisable} onPress={func} style={{width:"90%",alignSelf:"center",bottom:hp(1.5),borderRadius:15,alignItems:"center",justifyContent:"center",paddingVertical:"4%",backgroundColor:Yellow,position:"absolute",borderWidth:0}}>
        <Text style={{color:White,fontSize:wp(4.8),...styleText.medium}}>{title}</Text>
      </TouchableOpacity>
  )
}

export default ButtonPress

const styles = StyleSheet.create({})