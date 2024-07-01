import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Rejecte = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F74850"
      strokeMiterlimit={10}
      strokeWidth={1.75}
      d="M15 29c7.733 0 14-6.268 14-14S22.734 1 15 1C7.268 1 1 7.268 1 15s6.268 14 14 14Z"
    />
    <Path
      stroke="#F74850"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="m19.666 10.334-9.334 9.333M19.666 19.667l-9.334-9.334"
    />
  </Svg>
  )
}

export default Rejecte

const styles = StyleSheet.create({})