import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DottedLine from './DottedLine';
import {Close_Black} from '../assets/svgs/svg';
import {wp} from '../Global_Com/responsiveScreen';
import {styleText} from '../assets/fonts/Fonts';
import {
  Black,
  Grey_Button_Color,
  Red,
  TextInput_Border_Color,
  Transparent,
  White,
  Yellow,
} from '../Global_Com/color';
import { DecimalNum } from '../Utils/Regex';
import Activity_Indicator from './Activity_Indicator';
const {height, width} = Dimensions.get('screen');

const AddYarnModal = ({
  value,
  setValue,
  setName,
  setRate,
  name,
  rate,
  func,
  setLoading,
  loading
}) => {
  const [show, setShow] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  useEffect(() => {
    if (name) {
      if (name.length >= 2) {
        setShow(false);
        if (name && rate) {
          setIsDisable(false);
        }
      } else {
        setShow(true);
      }
    }
  }, [name, rate])

  useEffect(() => {
    if (value === false) {
      setIsDisable(true);
    }
  }, [value]);

  return (
    <Modal animationType="slide" transparent={true} visible={value}>
      <View style={styles.backgroundColor}>

        <View style={styles.View}>
          <View style={{width: '100%', borderWidth: 0}}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: wp(4.5),
                color: Black,
                ...styleText.bold,
              }}>
              Add Yarn
            </Text>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', bottom: '8%', borderWidth: 0}}
              onPress={() => {
                setValue(false);
                setName('');
                setRate('');
                setIsDisable(true);
                setShow(false);
              }}>
              <Close_Black height={25} width={25} />
            </TouchableOpacity>
            <DottedLine />
            <View
              style={{
                flexDirection: 'column',
                borderWidth: 0,
                marginTop: '2%',
                marginHorizontal: '3%',
              }}>
              <Text
                style={{color: Black, fontSize: wp(4), ...styleText.medium}}>
                Yarn Name
              </Text>
              <TextInput
                value={name}
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
                  setName(newName);
                }}
                placeholder="Enter Yarn Name"
                style={{
                  borderWidth: 1,
                  marginVertical: '3%',
                  paddingLeft: '8%',
                  height: wp(12),
                  borderRadius: 15,
                  borderColor: TextInput_Border_Color,
                }}></TextInput>
              {show ? (
                <Text
                  style={{
                    position: 'absolute',
                    top: '33%',
                    left: '55%',
                    color: Red,
                  }}>
                  Enter atleast 2 character
                </Text>
              ) : null}
              <Text
                style={{color: Black, fontSize: wp(4), ...styleText.medium}}>
                Yarn Rate
              </Text>
              <TextInput
                keyboardType="phone-pad"
                value={rate}
                onChangeText={e => {
                  if (e === '' || DecimalNum.test(e))
                      setRate(e);
                }}
                placeholder="Enter Yarn Name"
                style={{
                  borderWidth: 1,
                  marginVertical: '3%',
                  paddingLeft: '8%',
                  height: wp(12),
                  borderRadius: 15,
                  borderColor: TextInput_Border_Color,
                }}></TextInput>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0,
                  justifyContent: 'space-between',
                  marginTop: '5%',
                }}>
                <TouchableOpacity
                  onPress={() => setValue(false)}
                  style={[styles.btn, {backgroundColor: Grey_Button_Color}]}>
                  <Text
                    style={{
                      color: Black,
                      fontSize: wp(4.5),
                      ...styleText.medium,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={func}
                  disabled={isDisable}
                  style={[
                    styles.btn,
                    {backgroundColor: Yellow, opacity: isDisable ? 0.5 : 1},
                  ]}>
                  <Text
                    style={{
                      color: White,
                      fontSize: wp(4.5),
                      ...styleText.medium,
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddYarnModal;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 0,
    width: '47%',
    height: wp(14),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Transparent,
  },
  View: {
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: White,
    alignItems: 'center',
    padding: '4%',
    paddingBottom: '3%',
    bottom: 0,
    position: 'absolute',
  },
});
