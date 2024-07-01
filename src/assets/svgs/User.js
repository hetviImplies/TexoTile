import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const User = (props) => {
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
      strokeMiterlimit={10}
      strokeWidth={1.286}
      d="M9 11.25a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
    />
    <Path
      stroke="#2D303D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.286}
      d="M2.18 15.187a7.875 7.875 0 0 1 13.64 0"
    />
  </Svg>
  )
}

export default User

const styles = StyleSheet.create({})