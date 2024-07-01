import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Close = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10.25 19.5c5.088 0 9.25-4.162 9.25-9.25S15.338 1 10.25 1 1 5.162 1 10.25s4.162 9.25 9.25 9.25ZM7.634 12.868l5.236-5.236M12.87 12.868 7.634 7.632"
    />
  </Svg>
  )
}

export default Close

const styles = StyleSheet.create({})