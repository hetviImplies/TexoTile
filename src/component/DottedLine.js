import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Border_Color } from '../Global_Com/color'

const DottedLine = ({margin}) => {
  return (
    <View style={{borderTopWidth:1,borderStyle:"dashed",borderColor:Border_Color,opacity:0.2,...margin}}></View>
  )
}

export default DottedLine

const styles = StyleSheet.create({})