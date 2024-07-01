import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styleText } from '../assets/fonts/Fonts'
const {height,width}=Dimensions.get("window")
const ButtonPress = ({title,func}) => {
  return (
    <TouchableOpacity onPress={func} style={{height:height/15,width:"90%",alignSelf:"center",bottom:10,borderRadius:15,alignItems:"center",justifyContent:"center",backgroundColor:"#E89E46",position:"absolute",borderWidth:0}}>
        <Text style={{color:'white',fontSize:16,...styleText.medium,fontWeight:"800"}}>{title}</Text>
      </TouchableOpacity>
  )
}

export default ButtonPress

const styles = StyleSheet.create({})