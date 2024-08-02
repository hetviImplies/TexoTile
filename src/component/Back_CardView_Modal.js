import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {styleText} from '../assets/fonts/Fonts';
import {Black, Transparent, White, Yellow} from '../Global_Com/color';
import AppConstant from '../Utils/AppConstant';
const {height, width} = Dimensions.get('window');
const BackModal_Detail = ({visible, setVisible, func}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.backgroundColor}>
        <View style={styles.view}>
          <Text style={{fontSize: 16, color: Black, ...styleText.semiBold}}>
            Are you sure, you want to cancle this quality details?
          </Text>
          <View style={{flexDirection: 'row', marginTop: '6%'}}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={[
                styles.btn,
                {
                  backgroundColor: '#EAEAEA',
                },
              ]}>
              <Text style={{color: Black, fontSize: 18, ...styleText.semiBold}}>
                Cancle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={func}
              style={[
                styles.btn,
                {
                  marginLeft: '3%',
                  backgroundColor: Yellow,
                },
              ]}>
              <Text style={{color: White, fontSize: 18, ...styleText.semiBold}}>
                {AppConstant.YES}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BackModal_Detail;

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Transparent,
  },
  view: {
    height: height / 5,
    padding: '5%',
    width: width / 1.1,
    borderRadius: 15,
    backgroundColor: White,
    alignItems: 'center',
  },
  btn: {
    height: height / 14,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
