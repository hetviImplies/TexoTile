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
import {useDispatch} from 'react-redux';
import {AddYarnCompany, AddYarnData} from '../Slice/YarnSlice';
const {height, width} = Dimensions.get('window');
const Add_Modal = ({visible, setValue, modal_Type}) => {
  const dispatch = useDispatch();
  const [input1, setInput1] = useState();
  const [input2, setInput2] = useState();
    const [isDisable,setIsDisable]=useState(true)

    useEffect(()=>{
        Disable()
    },[input1,input2])
    const Disable=()=>{
      if(modal_Type=="Yarn"){
        if(input1 && input2){
            setIsDisable(false)
        }else{
            setIsDisable(true)
        }
      }else{
          if(input1){
            setIsDisable(false)
        }else{
            setIsDisable(true)
        }
          } 

    }
  const HandlePress = () => {
    if (modal_Type == 'Yarn') {
      dispatch(
        AddYarnData({
          name: input1,
          rate: input2,
        }),
      ).then(a => {
        if (a.meta.requestStatus == 'fulfilled') {
          setInput1(null);
          setInput2(null);
          setValue(false);
        }
      });
    } else {
      dispatch(
        AddYarnCompany({
          name: input1,
        }),
      ).then(a => {
        if (a.meta.requestStatus == 'fulfilled') {
          setInput1(null);
          setInput2(null);
          setValue(false);
        }
      });
    }
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={styles.backgroundColor}>
        <View
          style={styles.View}>
          <View>
            <Text
              style={styles.text}>
              {modal_Type == 'Yarn' ? 'Enter Yarn Name' : 'Enter Company Name'}
            </Text>
            <TextInput
              value={input1}
              onChangeText={e => setInput1(e)}
              style={styles.textInput}
              placeholder={
                modal_Type == 'Yarn' ? 'Enter Yarn Name' : 'Enter Company Name'
              }></TextInput>
            {modal_Type == 'Yarn' ? (
              <View>
                <Text
                  style={styles.text}>
                  Enter Yarn Rate
                </Text>
                <TextInput
                  value={input2}
                  onChangeText={e => setInput2(e)}
                  style={styles.textInput}
                  placeholder="Enter Yarn Rate"></TextInput>
              </View>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '4%',
            }}>
            <TouchableOpacity
              onPress={() => setValue(false)}
              style={{
                borderWidth: 0,
                height: height / 15,
                width: width / 2.5,
                borderRadius: 10,
                backgroundColor: '#EAEAEA',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#2D303D', fontSize: 17}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
            disabled={isDisable}
              onPress={HandlePress}
              style={{
                borderWidth: 0,
                height: height / 15,
                width: width / 2.5,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '3%',
                backgroundColor: isDisable ? 'rgba(239, 164, 74, 0.6)' :'#EFA44A',
              }}>
              <Text style={{color: 'white', fontSize: 17}}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Add_Modal;

const styles = StyleSheet.create({
  textInput:{
    borderWidth: 1,
    height: height / 20,
    borderRadius: 10,
    borderColor: 'rgba(217, 217, 217, 1)',
    paddingLeft: '8%',
  },
  text:{
    marginLeft: '4%',
    fontSize: 15,
    color: '#2D303D',
    marginVertical: '2%',
  },
  backgroundColor:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  View:{
    width: width / 1.1,
    padding: '3%',
    borderRadius: 10,
    borderWidth: 0,
    flexDirection: 'column',
    backgroundColor: 'white',
  }
});
