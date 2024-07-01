import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Down_arrow = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      stroke="#130F26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="M11.25 1.375 6 6.625.75 1.375"
    />
  </Svg>
  )
}

export default Down_arrow

const styles = StyleSheet.create({})