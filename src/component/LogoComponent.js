import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { hp,wp } from '../Global_Com/responsiveScreen';

import React from 'react'
import { TexoTileLogo } from '../assets/svgs/svg';
const{height,width}=Dimensions.get("window")
const LogoComponent = () => {

  return (
    <View
    style={styles.logoContainer}>
      <TexoTileLogo height={hp(10)}/>
    </View>
  )
}

export default LogoComponent

const styles = StyleSheet.create({
    logoContainer: {
        height: hp(14),
        width: wp(30),
        borderWidth: 0,
        alignSelf: 'center',
        marginTop: hp(16),
        alignItems: 'center',
      },
})