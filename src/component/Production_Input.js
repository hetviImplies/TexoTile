import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { TextInput } from 'react-native-paper'

import { Border_Color, TextInput_Border_Color, White, Yellow } from '../Global_Com/color';
import { Validation } from '../Utils/Regex';
const {height, width} = Dimensions.get('window');
const Production_Input = ({value,IsDisable,setValue,lable,returnKeyType,func,onSubmitEditing,returnKeyLabel}) => {

  return (
    <TextInput
    disabled={IsDisable}
    dense
    mode="outlined"
    label={lable}
    keyboardType='phone-pad'
    selectionColor={Yellow}
    returnKeyType={returnKeyType}
    returnKeyLabel={returnKeyLabel}
    ref={func}
    value={value}
    numberOfLines={1}
    onSubmitEditing={onSubmitEditing}
    outlineColor={TextInput_Border_Color}
    activeOutlineColor="#E89E46"
    outlineStyle={{borderRadius: 15,backgroundColor:White,height: height/19, width: width/2.4}}
    style={{marginHorizontal:width/50,borderWidth:0, width: width/2.4,marginVertical:width/90}}
    onChangeText={text => Validation(text,setValue,lable)}
  />
  )
}

export default Production_Input

const styles = StyleSheet.create({})