import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DottedLine = ({margin}) => {
  return (
    <View style={{borderWidth:1,borderStyle:"dashed",borderColor:"rgba(45, 48, 61, 0.1)",marginHorizontal:"3%",...margin}}></View>
  )
}

export default DottedLine

const styles = StyleSheet.create({})