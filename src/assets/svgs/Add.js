import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Defs, G, Image, Path, Pattern, Rect, Svg, Use } from 'react-native-svg'

const Add = (props) => {
  if(props.big){
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeMiterlimit={10}
      strokeWidth={1.714}
      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10Z"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.714}
      d="M6.833 11h8.334M11 6.833v8.334"
    />
  </Svg>
  )}else{
    return(
      <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeMiterlimit={10}
      strokeWidth={1.714}
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.714}
      d="M8.25 12h7.5M12 8.25v7.5"
    />
  </Svg>
    )
  }
}

export default Add

const styles = StyleSheet.create({})