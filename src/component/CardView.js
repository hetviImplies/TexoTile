import {
  Dimensions,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import DottedLine from './DottedLine';
import {weekdays} from 'moment';
import {styleText} from '../assets/fonts/Fonts';
import VerticalLine from './VerticalLine';
import { Add_Black, Close_Red, Mesh } from '../assets/svgs/svg';
import { wp } from '../Global_Com/responsiveScreen';
import { Black, Yellow } from '../Global_Com/color';
const {height, width} = Dimensions.get('window');
const CardView = ({
  data,
  modal_type,
  from,
  style,
  func,
  setData,
  setVisible,
  Warp_Cost,
  setWarp_Cost,
  Weft_Cost,
  setWeft_Cost,
  Warp_Weight,
  setWarp_Weight,
  Weft_Weight,
  setWeft_Weight,
  setTotal_beam_ends,
  setTotal_Pick,
  setTotal_width,
  setEditWarpData,
  setEditWeftData,
  setModal_Type,
  data_forYarnUpdate,
}) => {
  const [mainData, setMainData] = useState();
  useEffect(() => {
    if (from == 'Yarn') {
      if (data_forYarnUpdate !== undefined && data_forYarnUpdate.length > 0) {
        setMainData(data_forYarnUpdate);
      }
    } else {
      setMainData(data);
    }
  }, [data_forYarnUpdate, data]);

  const DisplayCardData = () => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            borderColor: Black,
            marginTop: '2%',
            paddingRight: '6%',
            paddingTop: '2%',flexGrow: 1,
          },
          {...style},
        ]}>
        {mainData?.map((a, i) => {
          if (a != undefined) {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (modal_type == 'Warp') {
                    setEditWarpData({
                      data: a,
                      index: i,
                    });
                    setModal_Type('Warp');
                    setVisible(true);
                  } else {
                    setEditWeftData({
                      data: a,
                      index: i,
                    });
                    setModal_Type('Weft');
                    setVisible(true);
                  }
                }}
                disabled={from == 'Yarn' ? true : false}
                style={[
                  {
                    borderWidth: 1,
                    borderColor: Yellow,
                    borderStyle: 'dashed',
                    padding: wp(2),
                    borderRadius: 10,
                    width: wp(75),
                    paddingBottom: 10,
                    marginVertical: 7,
                    marginRight: 10,
                  },
                ]}>
                <View >
                {from == 'Detail' ? (
                  <TouchableOpacity
                    onPress={() => {
                      let a = data.filter((a, index) => index != i);
                      let b = data.find((a, index) => index == i);
                      if (modal_type == 'Warp') {
                        setWarp_Cost(parseFloat(Warp_Cost) - b.cost);
                        setWarp_Weight(parseFloat(Warp_Weight) - b.weight);
                      } else {
                        setWeft_Cost(parseFloat(Weft_Cost) - b.cost);
                        setWeft_Weight(parseFloat(Weft_Weight) - b.weight);
                      }
                      setData(a);
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '98%',
                      left: '99%',
                    }}>
                    <Close_Red height={22} width={22} fill={"white"}/>
                  </TouchableOpacity>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderWidth: 0,
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        color: Black,
                        fontSize: wp(4.3),
                        ...styleText.bold,
                        width:wp(30),
                        borderWidth:0
                      }}>
                      {a?.yarn.name}
                    </Text>
                    <Text
                      style={[styles.text, {fontSize: wp(4), marginTop: '5%'}]}>
                      {a?.company.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection:"column",
                      alignItems: 'flex-end',
                      borderWidth: 0,

                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.Grey_Text}>Kg : </Text>
                      <Text style={[styles.text]}>{a?.weight}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.Grey_Text}>₹ : </Text>
                      <Text style={[styles.text,]}>{a?.cost}</Text>
                    </View>
                  </View>
                </View>
                <DottedLine
                  margin={{marginVertical: '3%', marginHorizontal: '0%'}}
                />
                <View
                  style={{
                    borderWidth: 0,
                    flexGrow: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}>
                  <View style={{flexDirection: 'column', borderWidth: 0}}>
                    <Text style={styles.Grey_Text}>{'Deniar'}</Text>
                    <Text style={styles.sub_Text}>
                      {a?.deniar.includes('.')
                        ? a.deniar.split('.')[1] == '00'
                          ? a.deniar.split('.')[0]
                          : parseFloat(a.deniar).toFixed(2)
                        : a?.deniar}
                    </Text>
                  </View>
                  <VerticalLine />

                  {modal_type == 'Weft' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'column', borderWidth: 0}}>
                        <Text style={styles.Grey_Text}>{'Pick'}</Text>
                        <Text style={styles.sub_Text}>
                          {a?.pick
                            ? a?.pick.includes('.')
                              ? a?.pick.split('.')[1] == '00'
                                ? a?.pick.split('.')[0]
                                : parseFloat(a?.pick).toFixed(2)
                              : a?.pick
                            : '0.00'}
                        </Text>
                      </View>
                      <VerticalLine />
                    </View>
                  ) : null}
                  <View style={{flexDirection: 'column', borderWidth: 0}}>
                    <Text style={styles.Grey_Text}>
                      {modal_type == 'Warp' ? 'Shortage' : 'Wastage'}
                    </Text>
                    <Text style={styles.sub_Text}>
                      {modal_type == 'Warp'
                        ? a?.shortage.includes('.')
                          ? a?.shortage.split('.')[1] == '00'
                            ? a?.shortage.split('.')[0]
                            : parseFloat(a?.shortage).toFixed(2)
                          : a?.shortage
                        : a?.wastage.includes('.')
                        ? a?.wastage.split('.')[1] == '00'
                          ? a?.wastage.split('.')[0]
                          : parseFloat(a?.wastage).toFixed(2)
                        : a?.wastage}
                    </Text>
                  </View>
                  <VerticalLine />
                  <View style={{flexDirection: 'column', borderWidth: 0}}>
                    <Text style={styles.Grey_Text}>
                      {modal_type == 'Warp' ? 'Ends' : 'Width'}
                    </Text>
                    <Text style={styles.sub_Text}>
                      {modal_type == 'Warp'
                        ? parseFloat(a?.beam_ends).toFixed(0)
                        : parseFloat(a?.width).toFixed(0)}
                    </Text>
                  </View>
                  <VerticalLine />
                  <View style={{flexDirection: 'column', borderWidth: 0}}>
                    <Text style={styles.Grey_Text}>{'Y.Rate'}</Text>
                    <Text style={styles.sub_Text}>
                      {a?.yarn_rate.includes('.')
                        ? a?.yarn_rate.split('.')[1] == '00'
                          ? a?.yarn_rate.split('.')[0]
                          : parseFloat(a?.yarn_rate).toFixed(2)
                        : a?.yarn_rate}
                    </Text>
                  </View>
                  <VerticalLine />
                  <View style={{flexDirection: 'column', borderWidth: 0}}>
                    <Text style={styles.Grey_Text}>{'TPM'}</Text>
                    <Text style={styles.sub_Text}>
                      {isNaN(a?.tpm) || a?.tpm == null
                        ? 0
                        : a?.tpm == ''
                        ? 0
                        : JSON.stringify(a?.tpm).includes('.')
                        ? a?.tpm.toString().split('.')[1] == '00'
                          ? a?.tpm.toString().split('.')[0]
                          : parseFloat(a?.tpm).toFixed(2)
                        : a?.tpm}
                    </Text>
                  </View>
                </View>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
    );
  };

  useEffect(() => {
    GetData();
  }, [data]);
  const GetData = () => {
    let cost = 0;
    let weight = 0;
    let beam_ends = 0;
    let pick = 0;
    let width = 0;
    data.map((a, i) => {
      if (modal_type == 'Warp') {
        beam_ends += parseFloat(a.beam_ends);
        cost += parseFloat(a.cost);
        weight += parseFloat(a.weight);
        setTotal_beam_ends(parseFloat(beam_ends));
        setWarp_Cost(parseFloat(cost));
        setWarp_Weight(parseFloat(weight));
      } else {
        width += parseFloat(a.width);
        pick += parseFloat(a.pick);
        cost += parseFloat(a.cost);
        weight += parseFloat(a.weight);
        setTotal_width(parseFloat(width));
        setTotal_Pick(parseFloat(pick));
        setWeft_Cost(parseFloat(cost));
        setWeft_Weight(parseFloat(weight));
      }
    });
  };
  return (
    <View>
      {mainData !== undefined ? (
        <View
          style={{
            padding: '1%',
            marginTop: '1.5%',
            flexDirection: 'row',
            marginHorizontal: '3%',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
            }}>
            <Mesh />
            <Text style={[styles.text, {paddingLeft: '3%'}]}>{modal_type}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              borderWidth: 0,
            }}>
            <Text
              style={{
                ...styleText.bold,
                fontSize: 15,
                color: Black,
                opacity: 0.5,
              }}>
              W :{' '}
            </Text>
            <Text style={[styles.text,{width: wp(10),borderWidth:0}]}>
              {modal_type == 'Warp'
                ? parseFloat(Warp_Weight).toFixed(2)
                : parseFloat(Weft_Weight).toFixed(2)}
            </Text>
            <View
              style={{
                borderRightWidth:1,
                marginHorizontal: 8,
              }}></View>
            <Text
              style={{
                ...styleText.bold,
                fontSize: 15,
                color: Black,
                opacity: 0.5,
              }}>
              C :{' '}
            </Text>
            <Text style={[styles.text,{width: wp(10),borderWidth:0}]}>
              {modal_type == 'Warp'
                ? parseFloat(Warp_Cost).toFixed(2)
                : parseFloat(Weft_Cost).toFixed(2)}
            </Text>
          </View>
          {from == 'Detail' ? (
            <TouchableOpacity onPress={func}>
              <Add_Black height={26} width={26}/>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
      {data[0] ? <DisplayCardData /> : null}
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  text: {color: 'rgba(86, 90, 112, 1)', fontSize: 15, ...styleText.bold,maxWidth:wp(25),borderWidth:0,},
  Grey_Text: {
    fontSize: wp(3),
    ...styleText.semiBold,
    color: Black,
    opacity: 0.5,


  },
  sub_Text: {
    color: Black,
    fontSize: wp(3.8),
    fontWeight: '500',
    marginTop: '5%',
    flexWrap: 'wrap',
    width: wp(9),
    ...styleText.semiBold,
    borderWidth:0
  },
});
