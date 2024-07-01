import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Right_arrow = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2D303D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.286}
      d="M.75 1.375 6.375 7 .75 12.625"
    />
  </Svg>
  )
}

export default Right_arrow

const styles = StyleSheet.create({})