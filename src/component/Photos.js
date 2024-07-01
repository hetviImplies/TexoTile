import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const {height, width} = Dimensions.get('window');
const Photos = ({title}) => {
  return (
    <View
      style={styles.main_view}>
      <View
        style={styles.sub_view}></View>
      <Text
        style={styles.text}>
        {title}
      </Text>
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({
  main_view:{
    borderWidth: 0,
    height: height / 4,
    width: width / 2.28,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:"2%"
  },
  sub_view:{
    borderWidth: 1.5,
    height: "85%",
    width: "90%",
    borderRadius: 15,
    borderColor: 'rgba(235, 235, 235, 1)',
    backgroundColor: 'rgba(235, 235, 235, 0.3)',
  },
  text:{
    color: 'black',
    marginTop: '2%',
    fontSize: 15,
    fontWeight: '600',
  }
});
