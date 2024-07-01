import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'

const RadioButtons = ({value,status,onPress}) => {
  return (
    <View style={{flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"space-between"}}>
      <Text style={{fontSize:13}}>{value}</Text>
      <RadioButton
              color="#E89E36"
              uncheckedColor="rgba(45, 48, 61, 0.5)"
              value={value}
              status={status}
              onPress={onPress}
            />
    </View>
  )
}

export default RadioButtons
