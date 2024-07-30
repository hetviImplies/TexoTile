import {
  Alert,
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
import {wp} from '../Global_Com/responsiveScreen';
import {styleText} from '../assets/fonts/Fonts';
import {
  Black,
  Grey_Button_Color,
  Transparent,
  White,
  Yellow,
} from '../Global_Com/color';
import Activity_Indicator from './Activity_Indicator';
import { DecimalNum } from '../Utils/Regex';
const {height, width} = Dimensions.get('window');
const Add_Modal = ({visible, setValue, modal_Type}) => {
  const dispatch = useDispatch();
  const [input1, setInput1] = useState();
  const [input2, setInput2] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    Disable();
  }, [input1, input2]);
  const Disable = () => {
    if (modal_Type == 'Yarn') {
      if (input1 && input2) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    } else {
      if (input1) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    }
  };
  const HandlePress = async () => {
    setIsDisable(true)
    setLoading(true)
     await dispatch((modal_Type == 'Yarn' ? AddYarnData : AddYarnCompany)
        ({
          name: input1,
          ...(modal_Type == 'Yarn' ? { rate: input2 } : null),
        }),
      ).then(a => {
        if (a.payload.error === false) {
          setIsDisable(false)
          setLoading(false)
          setInput1(null);
          setInput2(null);
          setValue(false);
        }else{
          setIsDisable(false)
          setLoading(false)
          Alert.alert(a.payload.message)
        }
      });

  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.backgroundColor}>
      {
        loading ? <Activity_Indicator/> : null
      }
        <View style={styles.View}>
          <View>
            <Text style={styles.text}>
              {modal_Type == 'Yarn' ? 'Enter Yarn Name' : 'Enter Company Name'}
            </Text>
            <TextInput
              value={input1}
              onChangeText={e => {
                let newName = e;
                if (newName.charAt(0) === ' ') {
                  newName = newName.substring(1);
                }
                if (newName.length > 1) {
                  newName = newName.replace(/\s{2,}/g, ' ');
                }
                setInput1(newName);
              }}
              style={styles.textInput}
              placeholder={
                modal_Type == 'Yarn' ? 'Enter Yarn Name' : 'Enter Company Name'
              }></TextInput>
            {modal_Type == 'Yarn' ? (
              <View>
                <Text style={styles.text}>Enter Yarn Rate</Text>
                <TextInput
                  keyboardType="number-pad"
                  value={input2}
                  onChangeText={e => {
                    if (e === '' || DecimalNum.test(e)) setInput2(e)
                    }}
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
              onPress={() => {
                setValue(false);
                setInput1(null);
                setInput2(null);
              }}
              style={{
                borderWidth: 0,
                height: height / 15,
                width: width / 2.5,
                borderRadius: 10,
                backgroundColor: Grey_Button_Color,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: Black, fontSize: wp(4.5), ...styleText.medium}}>
                Cancel
              </Text>
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
                opacity: isDisable ? 0.5 : 1,
                backgroundColor: Yellow,
              }}>
              <Text
                style={{color: White, fontSize: wp(4.5), ...styleText.medium}}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Add_Modal;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    height: height / 20,
    borderRadius: 10,
    borderColor: 'rgba(217, 217, 217, 1)',
    paddingLeft: '8%',
  },
  text: {
    marginLeft: '4%',
    fontSize: wp(4),
    color: Black,
    marginVertical: '2%',
    ...styleText.medium,
  },
  backgroundColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Transparent,
  },
  View: {
    width: width / 1.1,
    padding: '3%',
    borderRadius: 10,
    borderWidth: 0,
    flexDirection: 'column',
    backgroundColor: White,
  },
});
