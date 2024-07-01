import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const LeftArrow = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.714}
      d="M20.25 12H3.75M10.5 5.25 3.75 12l6.75 6.75"
    />
  </Svg>
  )
}

export default LeftArrow

const styles = StyleSheet.create({})