import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Point = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={9}
    fill="none"
    {...props}
  >
    <Path
      fill="#E89E46"
      fillRule="evenodd"
      d="M37 0H0c0 2.223 1.79 4.025 4 4.025h29c2.21 0 4-1.802 4-4.025ZM16.824 7.379c.515.964 2.837.964 3.352 0 .942-1.766 2.32-3.354 4.227-3.354H12.598c1.906 0 3.284 1.588 4.226 3.354Z"
      clipRule="evenodd"
    />
  </Svg>
  )
}

export default Point

const styles = StyleSheet.create({})