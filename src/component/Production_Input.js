import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { Validation } from '../assets/Regex/Regex';
const {height, width} = Dimensions.get('window');
const Production_Input = ({value,setValue,lable}) => {
  return (
    <TextInput
    dense
    mode="outlined"
    label={lable}
    keyboardType='phone-pad'
    selectionColor="#E89E46"
    value={value}
    numberOfLines={1}
    outlineColor="rgba(45, 48, 61, 0.1)"
    activeOutlineColor="#E89E46"
    outlineStyle={{borderRadius: 15,backgroundColor:"white",height: height/19, width: width/2.4}}
    style={{marginHorizontal:width/50,borderWidth:0, width: width/2.4,marginVertical:width/90}}
    onChangeText={text => Validation(text,setValue,lable)}
  />
  )
}

export default Production_Input

const styles = StyleSheet.create({})