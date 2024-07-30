import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
const {height, width} = Dimensions.get('window');
import { styleText } from '../assets/fonts/Fonts';
import ImagePicker from 'react-native-image-crop-picker';
import { Black, Grey, Red, Transparent, White, Yellow } from '../Global_Com/color';
const Open_Image_Modal = ({visible,setVisible}) => {

    const OpenGallery = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          console.log(image);
        });
      };
      const OpenAccess = () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          console.log(image);
        });
      };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
<TouchableOpacity
        onPress={() => setVisible(false)}
        style={styles.backgroundColor}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => null}
          style={styles.view}>
            <TouchableOpacity onPress={OpenAccess} style={{backgroundColor:Red ,height:160,width:160}}>

            </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default Open_Image_Modal

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
    fontSize:16,
    ...styleText.medium
  },
  mainText: {
    color: Black,
    fontSize: 16,
    marginTop: '5%',
    lineHeight:21,
    ...styleText.bold,
  },
  subText: {
    color: Grey,
    marginTop: '1%',
    fontSize: 12,
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
})