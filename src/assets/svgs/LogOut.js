import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const LogOut = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2D303D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.286}
      d="M5.766 6.047 2.812 9l2.954 2.953M10.688 9H2.811M10.688 15.188h3.937a.562.562 0 0 0 .563-.563V3.375a.563.563 0 0 0-.563-.563h-3.938"
    />
  </Svg>
  )
}

export default LogOut

const styles = StyleSheet.create({})