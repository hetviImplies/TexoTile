import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Company = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="M9 16.5c4.125 0 7.5-3.375 7.5-7.5S13.125 1.5 9 1.5 1.5 4.875 1.5 9s3.375 7.5 7.5 7.5ZM9 6v3.75"
    />
    <Path
      stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.996 12h.007"
    />
  </Svg>
  )
}

export default Company

const styles = StyleSheet.create({})