import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Black } from '../Global_Com/color';

const VerticalLine = () => {
  return (
    <View
      style={{
        borderColor: Black,
        opacity:0.1,
        borderRightWidth:1,
        marginHorizontal: 2,
      }}></View>
  );
};

export default VerticalLine;

const styles = StyleSheet.create({});
