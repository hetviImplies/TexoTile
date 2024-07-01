import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, {useState} from 'react';
import {styleText} from '../assets/fonts/Fonts';
import RadioButtons from './RadioButton';
import { useDispatch } from 'react-redux';

const {height, width} = Dimensions.get('window');
const Proceed_Request_Modal = ({visible, setVisible , checked , setChecked ,func}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity activeOpacity={1} onPress={()=> setVisible(false)} style={styles.backgroundColor}>
        <View style={styles.modalContent}>
          {/* Text component */}
          <Text style={[styles.modalText, styleText.bold]}>
            What permission do you want to assign to this user?
          </Text>
          <View style={{borderWidth: 0.6, width: '100%',borderColor:'rgba(217, 217, 217, 0.5)'}}></View>
          <View style={{width:"100%",alignItems:"center",height:"46%",justifyContent:'space-between'}}>
            <RadioButtons
              value="View"
              status={checked === 'View' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('View')}
            />
            <RadioButtons
              value="Write"
              status={checked === 'Write' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Write')}
            />
            <RadioButtons
              value="Admin"
              status={checked === 'Admin' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Admin')}
            />
          </View>
          <TouchableOpacity disabled={checked!='' ? false : true} onPress={func} style={{height:height/14,width:width/1.3,backgroundColor:"#E89E46",borderRadius:15,alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:"white",...styleText.semiBold,fontSize:19}}>Assign</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Proceed_Request_Modal;

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: height / 2.4, // Adjust the height of the modal content as needed
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    paddingHorizontal: '8%',
    flexDirection: 'column',
    alignItems: 'center', // Center content vertically
    justifyContent:"space-between",
    paddingVertical:"5%"
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center', // Center text horizontally
    flexWrap: 'wrap', // Allow text wrapping
    color: 'rgba(45, 48, 61, 1)',
    lineHeight: 30,
  },
});
