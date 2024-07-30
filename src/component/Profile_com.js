import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {styleText} from '../assets/fonts/Fonts';
import {Black, White, Yellow} from '../Global_Com/color';
const {height, width} = Dimensions.get('window');
const Profile_com = ({
  title,
  value,
  setvalue,
  disable,
  placeholder,
  style,
  email,
}) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <TextInput
      selectionColor={Yellow}
        placeholder={placeholder}
        onChangeText={e => {
          let newName = e; // don't use trim() here
            if (newName.charAt(0) === ' ') {
              // if the first character is a space, remove it
              newName = newName.substring(1);
            }
            if (newName.length > 1) {
              // if the input string has more than one character
              newName = newName.replace(/\s{2,}/g, ' '); // replace 2 or more spaces with a single space
            }
          setvalue(newName);
        }}
        editable={disable}
        value={value}
        style={[
          {},
          styles.shadow,
          title == 'Company Code' ||
          title == 'Company Name' ||
          title == 'Phone Number'
            ? {
                color:
                  title == 'Company Code' || 'Company Name' || 'Phone Number'
                    ? 'rgba(45, 48, 61, 0.6)'
                    : null,
              }
            : null,
          title === 'Email Address' || title === 'Name' ? {...email} : null,
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
    color: Black,
    fontSize: 17,
    fontWeight: '500',
    height: height / 15,
    borderRadius: 10,
    backgroundColor: White,
  },
  text: {
    marginHorizontal: '4%',
    marginVertical: '3%',
    color: Black,
    fontSize: 16,
    marginTop: '3%',
    ...styleText.bold,
  },
});
