import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const Edit = (props) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#E89E46"
      fillRule="evenodd"
      d="M6.51 2A4.51 4.51 0 0 0 2 6.51v10.98A4.51 4.51 0 0 0 6.51 22h5.34a.85.85 0 1 0 0-1.699H6.51a2.81 2.81 0 0 1-2.811-2.81V6.51a2.81 2.81 0 0 1 2.81-2.811H17.19A2.81 2.81 0 0 1 20 6.509V12a.85.85 0 0 0 1.7 0V6.51A4.51 4.51 0 0 0 17.19 2H6.51Zm.492 9.15a.85.85 0 1 0 0 1.7h3a.85.85 0 1 0 0-1.7h-3Zm-.85-3.148c0-.47.381-.85.85-.85H13a.85.85 0 1 1 0 1.7H7.002a.85.85 0 0 1-.85-.85Zm13.28 5.29a1.334 1.334 0 0 0-1.908 0l-3.757 3.818c-.29.294-.431.706-.387 1.12l.215 1.995c.056.52.46.93.97.987l1.963.218c.407.045.812-.1 1.101-.394l3.757-3.819a1.389 1.389 0 0 0 0-1.94l-1.953-1.986Zm-4.36 4.914 3.406-3.463 1.48 1.504-3.406 3.462-1.334-.148-.146-1.355Z"
      clipRule="evenodd"
    />
  </Svg>
  )
}

export default Edit

const styles = StyleSheet.create({})