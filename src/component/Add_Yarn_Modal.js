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
import Close from '../assets/svgs/Close';
import DottedLine from './DottedLine';
const {height, width} = Dimensions.get("screen");

const AddYarnModal = ({value, setValue, setName, setRate, name, rate,func}) => {


  const [show, setShow] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (name) {
      if (/[a-zA-z0-9]{2,}$/.test(name)) {
        setShow(false);
        if (name && rate) {
          setIsDisable(true);
        }
      } else {
        setShow(true);
      }
    }
  }, [name, rate]);


  return (
    <Modal animationType="slide" transparent={true} visible={value}>
      <View
        style={styles.backgroundColor}>
        <View
          style={styles.View}>
          <View style={{width: '100%', borderWidth: 0, flex: 1}}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                color: '#2D303D',
                fontWeight: '600',
              }}>
              Add Yarn
            </Text>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', bottom: '8%'}}
              onPress={() => {
                  setValue(false)
                  setName("")
                  setRate("")
                  setIsDisable(false)
                  setShow(false)
              }}>
              <Close color="#292D32"/>
            </TouchableOpacity>
            <DottedLine />
            <View
              style={{
                flexDirection: 'column',
                borderWidth: 0,
                marginTop: '2%',
                marginHorizontal: '3%',
              }}>
              <Text style={{color: '#2D303D'}}>Yarn Name</Text>
              <TextInput
                value={name}
                onChangeText={e => setName(e)}
                placeholder="Enter Yarn Name"
                style={{
                  borderWidth: 1,
                  marginVertical: '3%',
                  paddingLeft: '8%',
                  height: '22%',
                  borderRadius: 15,
                  borderColor: 'rgba(45, 48, 61, 0.1)',
                }}></TextInput>
              {show ? (
                <Text
                  style={{
                    position: 'absolute',
                    top: '33%',
                    left: '55%',
                    color: 'red',
                  }}>
                  Enter atleast 2 character
                </Text>
              ) : null}
              <Text style={{color: '#2D303D'}}>Yarn Rate</Text>
              <TextInput
                keyboardType="phone-pad"
                value={rate}
                onChangeText={e => setRate(e)}
                placeholder="Enter Yarn Name"
                style={{
                  borderWidth: 1,
                  marginVertical: '3%',
                  paddingLeft: '8%',
                  height: '22%',
                  borderRadius: 15,
                  borderColor: 'rgba(45, 48, 61, 0.1)',
                }}></TextInput>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                onPress={()=>setValue(false)}
                  style={[
                    styles.btn,
                    {backgroundColor: 'rgba(45, 48, 61, 0.1)'},
                  ]}>
                  <Text style={{color: '#2D303D', fontSize: 18}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={func}
                  disabled={!isDisable}
                  style={[
                    styles.btn,
                    {backgroundColor: !isDisable ? '#F9D98F' : '#E89E46'},
                  ]}>
                  <Text style={{color: 'white', fontSize: 18}}>Add</Text>
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
    height: '57%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },backgroundColor:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  View:{
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: '4%',
    paddingBottom:"15%",
    bottom:0,
    position:"absolute"
  }
});
