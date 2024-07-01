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
}) => {
  const [error, setError] = useState();
  useEffect(() => {
    if (value == '') {
      setIsDisable(true);
    } else {
      if (value.length < 2) {
        setError(true);
        setIsDisable(true);
      } else {
        setError(false);
        setIsDisable(false);
      }
    }
  }, [value]);
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity
        onPress={() => setVisible(false)}
        style={styles.backgroundColor}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => null}
          style={styles.view}>
          <Text style={styles.mainText}>{mainText}</Text>
          <Text style={styles.subText}>{subText}</Text>
          <TextInput
            onChangeText={setFunc}
            placeholder={placeHolder}
            style={styles.TextInput}></TextInput>
          {error ? (
            <Text
              style={{color: 'red', alignSelf: 'flex-end', paddingRight: '7%'}}>
              Enter atleast two characters
            </Text>
          ) : null}
          <TouchableOpacity
            disabled={isDisable}
            onPress={Handle}
            style={[
              styles.btn,
              {
                backgroundColor: isDisable
                  ? ' rgba(232, 158, 70, 0.5)'
                  : '#E89E46',
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
    borderColor: '#E89E46',
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
    color: 'white',
    fontSize:16,
    ...styleText.medium
  },
  mainText: {
    color: 'black',
    fontSize: 16,
    marginTop: '5%',
    lineHeight:21,
    ...styleText.bold,
  },
  subText: {
    color: '#565A70',
    marginTop: '1%',
    fontSize: 12,
    ...styleText.semiBold,
  },
  backgroundColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  view: {
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: '3%',
  },
});
