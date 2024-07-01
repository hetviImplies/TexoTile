import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Recent = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    data-name="24x24/On Light/Recent"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path
      fill="#E89E46"
      d="M11.25 21a.75.75 0 0 1 .75-.75 8.25 8.25 0 1 0-6.189-2.795v-2.637a.75.75 0 0 1 1.5 0v4.243a.75.75 0 0 1-.751.75H2.318a.75.75 0 0 1 0-1.5h2.25a9.75 9.75 0 1 1 7.433 3.44.75.75 0 0 1-.751-.751Zm2.875-4.814-2.657-2.655a.754.754 0 0 1-.22-.531V7.8a.75.75 0 1 1 1.5 0v4.889l2.436 2.436a.75.75 0 1 1-1.061 1.06Z"
    />
  </Svg>
  )
}

export default Recent

const styles = StyleSheet.create({})