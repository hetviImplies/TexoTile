import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
const {height, width} = Dimensions.get('window');
const Information_Input = ({value, lable, setValue, style}) => {
  return (
    <KeyboardAvoidingView>
      <TextInput
        mode="outlined"
        dense
        label={lable}
        numberOfLines={1}
        keyboardType="phone-pad"
        selectionColor="#E89E46"
        value={value}
        outlineColor="rgba(45, 48, 61, 0.1)"
        activeOutlineColor="#E89E46"
        outlineStyle={{borderRadius: 15, backgroundColor: 'white',height: height / 17.5,
            width: width / 2.4,}}
        style={[
          {borderWidth:0,
            width: width / 2.5,
            marginVertical: '3%',
          },
          style,
        ]}
        onChangeText={setValue}
      />
    </KeyboardAvoidingView>
  );
};

export default Information_Input;

const styles = StyleSheet.create({});
