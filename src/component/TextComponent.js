import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { isNativePlatformSupported } from 'react-native-screens/lib/typescript/core';
const {height, width} = Dimensions.get('window');
import { styleText } from '../assets/fonts/Fonts';
import { hp, normalize } from '../Global_Com/responsiveScreen';
import { Black, Grey } from '../Global_Com/color';
const TextComponent = ({main, sub}) => {
  return (
    <View>
      <View style={{borderWidth: 0, maxWidth: hp(30)}}>
        <Text style={styles.maintext}>{main}</Text>
      </View>
      <Text style={styles.subtext}>{sub}</Text>
    </View>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  maintext: {
    fontSize: hp(3.3),
    color: Black,
    ...styleText.bold,
    lineHeight:hp(4)
  },
  subtext: {
    fontSize: hp(2),
    color: Grey,
    opacity: 0.5,
    ...styleText.medium,
    lineHeight:hp(3),
    marginTop:"2%"
  },
});
