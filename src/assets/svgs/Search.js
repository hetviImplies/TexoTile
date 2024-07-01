import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Search = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2D303D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.714}
      d="M8.875 16.75a7.875 7.875 0 1 0 0-15.75 7.875 7.875 0 0 0 0 15.75ZM14.443 14.444 19 19"
    />
  </Svg>
  )
}

export default Search

const styles = StyleSheet.create({})