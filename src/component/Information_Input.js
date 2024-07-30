import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {White, Yellow} from '../Global_Com/color';
import { DecimalNum } from '../Utils/Regex';

const {height, width} = Dimensions.get('window');
const Information_Input = ({
  value,
  lable,
  setValue,
  style,
  returnKeyType,
  func,
  onSubmitEditing,
  returnKeyLabel,
  keyboardType,
}) => {
  return (
    <KeyboardAvoidingView>
      <TextInput
        mode="outlined"
        dense
        ref={func}
        label={lable}
        onSubmitEditing={onSubmitEditing}
        numberOfLines={1}
        keyboardType={keyboardType}
        returnKeyLabel={returnKeyLabel}
        selectionColor={Yellow}
        returnKeyType={returnKeyType}
        enablesReturnKeyAutomatically={true}
        value={value}
        outlineColor="rgba(45, 48, 61, 0.1)"
        activeOutlineColor={Yellow}
        outlineStyle={{
          borderRadius: 15,
          backgroundColor: White,
          height: height / 17.5,
          width: width / 2.4,
        }}
        style={[
          {
            borderWidth: 0,
            width: width / 2.5,
            marginVertical: '3%',
          },
          style,
        ]}
        onChangeText={text => {
          if (keyboardType === 'default') {
            setValue(text);
          } else {
            if (text === '' || DecimalNum.test(text)) {
              setValue(text);
            }
          }
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default Information_Input;

const styles = StyleSheet.create({});
