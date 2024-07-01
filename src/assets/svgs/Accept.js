import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Accept = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke="#02BC7D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="m21.416 11.5-8.56 8.167-4.274-4.084"
    />
    <Path
      stroke="#02BC7D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M15 29c7.733 0 14-6.268 14-14S22.734 1 15 1C7.268 1 1 7.268 1 15s6.268 14 14 14Z"
    />
  </Svg>
  )
}

export default Accept

const styles = StyleSheet.create({})