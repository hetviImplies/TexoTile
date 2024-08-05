import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';

import CardView from './CardView';
import {isDate} from 'moment';
import {hp, wp} from '../Global_Com/responsiveScreen';
import {Black, White, Yellow} from '../Global_Com/color';
import {Down_Arrow, Up_Arrow} from '../assets/svgs/svg';

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
  const [warp_Data, setWarp_Data] = useState([]);
  const [weft_Data, setWeft_Data] = useState([]);
  const [isWarpUndefine, setIsWarpUndefine] = useState(false);
  const [isWeftUndefine, setIsWeftUndefine] = useState(false);
  const [contentHeight, setContentHeight] = useState(34); // Start with a default height
  const animatedHeight = useRef(new Animated.Value(34)).current;

  useEffect(() => {
    const warp = data.warp_data.filter(item => item.yarn.id === id);
    const weft = data.weft_data.filter(item => item.yarn.id === id);
    setWarp_Data(warp);
    setWeft_Data(weft);
  }, [id, data]);

  const Toggle = () => {
    setShow(!show);
    Animated.timing(animatedHeight, {
      toValue: show ? 34 : 200,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleLayout = event => {
    const { height } = event.nativeEvent.layout;
    if (contentHeight !== height) {
      setContentHeight(height);
      animatedHeight.setValue(height); // Set initial height to content height
    }
  };

  const interpolation = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [34, 10],
  });

  return (
    <View style={{}}>
      <Animated.View style={[styles.AnimatedView, {height: interpolation}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', flexGrow: 1}}>
            <TouchableOpacity
              onPress={Toggle}
              onLayout={handleLayout}
              style={{flexDirection: 'row', borderWidth: 0}}>
              <CheckBox
                tintColors={{true: Yellow}}
                value={checkedItems.includes(data.id)}
                onValueChange={() => toggleCheckbox(data.id)}
              />
              <Text
                style={{
                  color: Black,
                  fontSize: wp(3.8),
                  marginLeft: '2%',
                  marginTop: '1.3%',
                  maxWidth:wp(20)
                }}>
                {data.name}
              </Text>
              <View
                style={{
                  borderWidth: 0,
                  alignItems: 'flex-end',
                  flexGrow: 1,
                  marginTop: '1%',
                }}>
                <View
                  style={{
                    borderWidth: 0,
                    flexDirection: 'row',
                    marginRight: '2%',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: Black, fontSize: wp(3.3),maxWidth:wp(20)}}>
                    Kg : {data.weight}
                  </Text>
                  <View
                    style={{
                      borderRightWidth: 1,
                      marginHorizontal: '4%',
                      borderColor: 'grey',
                      height: height / 35,
                    }}></View>
                  <Text style={{color: Black,maxWidth:wp(20)}}>₹ : {data.quality_cost}</Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      borderWidth: 0,
                      height: height / 35,
                      marginLeft: '1.5%',
                    }}>
                    {show ? <Up_Arrow /> : <Down_Arrow />}
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
  AnimatedView: {
    borderWidth: 0,
    backgroundColor: White,
    marginHorizontal: '5%',
    marginTop: '2%',
    borderRadius: 10,
    shadowColor: '#000',
    backgroundColor: White,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    flexDirection: 'column',
  },
});
