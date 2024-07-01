import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Checkbox} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import Down_arrow from '../assets/svgs/Down_arrow';
import Mesh from '../assets/svgs/Mesh';
import CardView from './CardView';
import { isDate } from 'moment';

const {height, width} = Dimensions.get('window');
const Accordion = ({data, checkedItems, toggleCheckbox, id, from}) => {
  const [show, setShow] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [Warp_Cost, setWarp_Cost] = useState(0);
  const [Weft_Cost, setWeft_Cost] = useState(0);
  const [Warp_Weight, setWarp_Weight] = useState(0);
  const [Weft_Weight, setWeft_Weight] = useState(0);
  const [total_beam_ends, setTotal_beam_ends] = useState(0);
  const [total_Pick, setTotal_Pick] = useState(0);
  const [total_width, setTotal_width] = useState(0);
  const [warp_Data,setWarp_Data]=useState([])
  const [weft_Data,setWeft_Data]=useState([])
  const [isWarpUndefine,setIsWarpUndefine]=useState(false)
  const [isWeftUndefine,setIsWeftUndefine]=useState(false)
  const Toggle = () => {
    if (!show) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setShow(!show);
  };

  const interpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [34, warp_Data.length>0 &&weft_Data.length>0 ?395:210],

  });
  useEffect(()=>{
      const warp=data.warp_data.filter((item)=>item.yarn.id==id)
      const weft=data.weft_data.filter((item)=>item.yarn.id==id)
  setWarp_Data(warp)
  setWeft_Data(weft)
  },[id,data])
  return (
    <View style={{}}>
      <Animated.View
        style={[styles.AnimatedView,{height: interpolation,}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', flexGrow: 1}}>
            <TouchableOpacity
              onPress={Toggle}
              style={{flexDirection: 'row', borderWidth: 0}}>
              <CheckBox
                tintColors={{true : '#E89E46'}}
                value={checkedItems.includes(data.id)}
                onValueChange={() => toggleCheckbox(data.id)}
              />
              <Text
                style={{
                  color: '#2D303D',
                  fontSize: 15,
                  marginLeft: '2%',
                  marginTop: '1.2%',
                }}>
                {data.name}
              </Text>
              <View
                style={{
                  borderWidth: 0,
                  alignItems: 'flex-end',
                  flexGrow: 1,
                  marginTop: '1.2%',
                  height: height / 34,
                }}>
                <View
                  style={{
                    borderWidth: 0,
                    flexDirection: 'row',
                    marginRight: '2%',
                    height: '80%',
                  }}>
                  <Text style={{color: '#2D303D'}}>Kg : {data.weight}</Text>
                  <View
                    style={{
                      borderWidth: 0.6,
                      marginHorizontal: '4%',
                      borderColor: 'grey',
                      height: height / 35,
                    }}></View>
                  <Text style={{color: '#2D303D'}}>
                    ₹ : {data.quality_cost}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      borderWidth: 0,
                      height: height / 35,
                      marginLeft: '1.5%',
                    }}>
                    <Down_arrow />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {show ? (
              <View
                style={{
                  borderWidth: 0,
                  marginTop: '1%',
                  marginHorizontal: '2%',
                }}>
                <View style={{flexDirection: 'column', borderWidth: 0}}>

                  <CardView
                    setTotal_beam_ends={setTotal_beam_ends}
                    setWeft_Weight={setWeft_Weight}
                    Weft_Weight={Weft_Weight}
                    setWarp_Weight={setWarp_Weight}
                    Warp_Weight={Warp_Weight}
                    Weft_Cost={Weft_Cost}
                    setWeft_Cost={setWeft_Cost}
                    Warp_Cost={Warp_Cost}
                    setWarp_Cost={setWarp_Cost}
                    data={data.warp_data}
                    from={'Yarn'}
                    modal_type={'Warp'}
                    style={{paddingHorizontal: '2.5%'}}
                    data_forYarnUpdate={warp_Data}
                    setIsWarpUndefine={setIsWarpUndefine}
                    setIsWeftUndefine={setIsWeftUndefine}
                  />

                  <CardView
                    setTotal_width={setTotal_width}
                    setTotal_Pick={setTotal_Pick}
                    setWeft_Weight={setWeft_Weight}
                    Weft_Weight={Weft_Weight}
                    setWarp_Weight={setWarp_Weight}
                    Warp_Weight={Warp_Weight}
                    Weft_Cost={Weft_Cost}
                    setWeft_Cost={setWeft_Cost}
                    Warp_Cost={Warp_Cost}
                    setWarp_Cost={setWarp_Cost}
                    from={'Yarn'}
                    data={data.weft_data}
                    modal_type={'Weft'}
                    style={{paddingHorizontal: '2.5%'}}
                    data_forYarnUpdate={weft_Data}
                    setIsWarpUndefine={setIsWarpUndefine}
                    setIsWeftUndefine={setIsWeftUndefine}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  AnimatedView:{
borderWidth: 0,
    backgroundColor: 'white',
    marginHorizontal: '5%',
    marginTop: '2%',
    borderRadius: 10,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    flexDirection: 'column',
  }
});
