import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { isNativePlatformSupported } from 'react-native-screens/lib/typescript/core';
const {height, width} = Dimensions.get('window');
import { styleText } from '../assets/fonts/Fonts';
const TextComponent = ({main, sub}) => {
  return (
    <View>
      <View style={{borderWidth: 0, width: 182}}>
        <Text style={styles.maintext}>{main}</Text>
      </View>
      <Text style={styles.subtext}>{sub}</Text>
    </View>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  maintext: {
    fontSize: 24,
    color: '#2D303D',
    ...styleText.bold,
    lineHeight:33
  },
  subtext: {
    fontSize: 16,
    color: '#565A70',
    opacity: 0.5,
    ...styleText.medium,
    lineHeight:18,
    marginTop:"2%"
  },
});
