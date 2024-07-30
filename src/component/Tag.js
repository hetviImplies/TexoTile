import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import { styleText } from '../assets/fonts/Fonts';
import { hp, wp } from '../Global_Com/responsiveScreen';
import { Grey, White, Yellow } from '../Global_Com/color';
const {height,width}=Dimensions.get("window")
const Tag = ({title, value, tag, style}) => {
  return (
    <View
      style={[
        {flexDirection: 'row', alignItems: 'center',flexWrap:"wrap"}
      ]}>
      <Text style={{...styleText.bold, fontSize: hp(2), marginRight: wp(1.5),color:Grey}}>
        {title}
      </Text>
      <View
        style={{
          borderRadius: 5,
          padding:width/60,
          backgroundColor: Yellow,
          justifyContent: 'center',
          alignItems: 'center'
          ,flexWrap:"wrap",maxWidth:width/3.2
        }}>
        <Text numberOfLines={6} style={{color: White, fontWeight: '600', fontSize: hp(2.3),...styleText.bold}}>
        {value} {tag}
        </Text>
      </View>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({});
