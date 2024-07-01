import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
const {height, width} = Dimensions.get('window');
const Profile_com = ({title, value, setvalue, disable, placeholder, style}) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={e => setvalue(e)}
        editable={disable}
        value={value}
        style={[
          styles.shadow,
          title == 'Company Code' ||
          title == 'Company Name' ||
          title == 'Phone Number'
            ? {...style}
            : null,
        ]}></TextInput>
    </View>
  );
};

export default Profile_com;

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {width: 4, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
    marginHorizontal: '4%',
    paddingLeft: '5%',
    color: '#2D303D',
    fontSize: 17,
    fontWeight: '500',
    height: height / 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  text: {
    marginHorizontal: '4%',
    marginVertical: '2%',
    color: '#2D303D',
    fontSize: 14,
    fontWeight: '600',
    marginTop: '3%',
  },
});
