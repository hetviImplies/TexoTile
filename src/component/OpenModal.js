import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styleText} from '../assets/fonts/Fonts';
import {hp} from '../Global_Com/responsiveScreen';
import {
  Black,
  Grey,
  Red,
  Transparent,
  White,
  Yellow,
} from '../Global_Com/color';
const {height, width} = Dimensions.get('window');
const OpenModal = ({
  isDisable,
  setIsDisable,
  value,
  visible,
  setVisible,
  mainText,
  subText,
  setFunc,
  BtnText,
  Handle,
  placeHolder,
  modal,
}) => {
  const [error, setError] = useState();
  const [caperror, setCapError] = useState();
  console.log('isDisable: ', isDisable);

  useEffect(() => {
    if (value === '') {
      setIsDisable(true);
    } else {
      if (value.length < 2) {
        setError(true);
        setCapError(false);
        setIsDisable(true);
      } else {
        if (modal === 'join') {
          if (/^[A-Z0-9]+$/.test(value)) {
            console.log('/^[A-Z]+$/.test(value): ', /^[A-Z]+$/.test(value));
            setCapError(false);
            setError(false);
            setIsDisable(false);
          } else {
            console.log('/^[A-Z]+$/.test(value): ', /^[A-Z]+$/.test(value));
            setIsDisable(true);
            setCapError(true);
            setError(false);
          }
        } else {
          setCapError(false);
          setError(false);
          setIsDisable(false);
        }
      }
    }
  }, [value]);
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity
        onPress={() => {
          setError(false);
          setVisible(false);
        }}
        style={styles.backgroundColor}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => null}
          style={styles.view}>
          <Text style={styles.mainText}>{mainText}</Text>
          <Text style={styles.subText}>{subText}</Text>
          <TextInput
            selectionColor={Yellow}
            onChangeText={setFunc}
            placeholder={placeHolder}
            style={styles.TextInput}></TextInput>
          {error ? (
            <Text
              style={{color: Red, alignSelf: 'flex-end', paddingRight: '7%'}}>
              Enter atleast two characters
            </Text>
          ) : null}
          {caperror ? (
            <Text
              style={{color: Red, alignSelf: 'flex-end', paddingRight: '7%'}}>
              Code must be Uppercase
            </Text>
          ) : null}
          <TouchableOpacity
            disabled={isDisable}
            onPress={Handle}
            style={[
              styles.btn,
              {
                opacity: isDisable ? 0.5 : 1,
                backgroundColor: Yellow,
              },
            ]}>
            <Text style={styles.btnText}>{BtnText}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default OpenModal;

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 1,
    paddingLeft: '3%',
    height: height / 15,
    marginTop: '4%',
    borderRadius: 15,
    width: '90%',
    borderColor: Yellow,
    backgroundColor: '#FFFAF3',
    justifyContent: 'center',
    marginHorizontal: '3%',
  },
  btn: {
    height: height / 15,
    width: '90%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
  },
  btnText: {
    color: White,
    fontSize: 16,
    ...styleText.medium,
  },
  mainText: {
    color: Black,
    fontSize: hp(2),
    marginTop: '5%',
    lineHeight: 21,
    ...styleText.bold,
  },
  subText: {
    color: Grey,
    marginTop: '1%',
    fontSize: hp(1.6),
    ...styleText.semiBold,
  },
  backgroundColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Transparent,
  },
  view: {
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: White,
    alignItems: 'center',
    padding: '3%',
  },
});
