import { Dimensions, StyleSheet, Text, View } from 'react-native'

import React from 'react'
import Logo from '../assets/svgs/Logo';
const{height,width}=Dimensions.get("window")
const LogoComponent = () => {

  return (
    <View
    style={styles.logoContainer}>
      <Logo height={80} color="#E89E46"/>
    </View>
  )
}

export default LogoComponent

const styles = StyleSheet.create({
    logoContainer: {
        height: 100,
        width: 300,
        borderWidth: 0,
        alignSelf: 'center',
        marginTop: height/6,
        alignItems: 'center',
      },
})