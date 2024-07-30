import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
import { Black, Yellow } from '../Global_Com/color'

const RadioButtons = ({value,status,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
      <Text style={{fontSize:13}}>{value}</Text>
      <RadioButton
              color={Yellow}
              uncheckedColor={Black}
              value={value}
              status={status}
              onPress={onPress}
            />
    </TouchableOpacity>
  )
}

export default RadioButtons
