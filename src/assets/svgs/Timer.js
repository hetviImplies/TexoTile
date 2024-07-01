import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Timer = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2D303D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      strokeWidth={0.75}
      d="M9.625 5a4.625 4.625 0 1 1-9.25 0 4.625 4.625 0 0 1 9.25 0Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#2D303D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      strokeWidth={0.75}
      d="M6.717 6.472 4.832 5.347V2.924"
    />
  </Svg>
  )
}

export default Timer

const styles = StyleSheet.create({})