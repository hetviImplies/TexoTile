import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import { styleText } from '../assets/fonts/Fonts';
const {height,width}=Dimensions.get("window")
const Tag = ({title, value, tag, style}) => {
  return (
    <View
      style={[
        {flexDirection: 'row', alignItems: 'center'}
      ]}>
      <Text style={{...styleText.bold, fontSize: 16, marginRight: width/60,color:"#565A70"}}>
        {title}
      </Text>
      <View
        style={{
          borderRadius: 5,
          padding:width/60,
          backgroundColor: '#E89E46',
          justifyContent: 'center',
          alignItems: 'center'
          ,flexWrap:"wrap",maxWidth:width/2.8
        }}>
        <Text numberOfLines={6} style={{color: 'white', fontWeight: '600', fontSize: 18,...styleText.bold}}>
        {value} {tag}
        </Text>
      </View>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({});
