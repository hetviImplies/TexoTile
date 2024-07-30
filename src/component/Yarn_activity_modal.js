import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DottedLine from './DottedLine';

import moment from 'moment';
import { styleText } from '../assets/fonts/Fonts';
import { Checkbox, Close_Black } from '../assets/svgs/svg';
import { Black, Transparent, White } from '../Global_Com/color';
import { useSelector } from 'react-redux';
import { hp, wp } from '../Global_Com/responsiveScreen';

const {height, width} = Dimensions.get('window');
const Yarn_activity = ({show, setShow, data}) => {

  const Data = useSelector((state)=> state.Yarn.activityData)
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View
        style={styles.backgroundColor}>
        <View
          style={styles.mainview}>
          <View style={{flexDirection: 'row', marginTop: '2%'}}>
            <Text
              style={{
                fontSize: hp(2.6),
                color: Black,
                ...styleText.bold,
                marginLeft: '6%',
              }}>
              History
            </Text>
            <TouchableOpacity
              style={{left: wp(30)}}
              onPress={() => setShow(false)}>
              <Close_Black height={wp(6)} width={wp(6)}/>
            </TouchableOpacity>
          </View>
          <DottedLine margin={{width: width / 1.1, marginTop: '3%'}} />
          <ScrollView
          showsVerticalScrollIndicator={false}
            style={{
              borderWidth: 0,
              width: width / 1.1,
              marginBottom: '2%',
              marginTop: '3%',
            }}>
            {Data?.map(a => {
              return (
                <View
                  style={styles.data_view}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{width: '33%',maxWidth:wp(20), borderWidth: 0, color: Black,
                        ...styleText.semiBold,fontSize:hp(1.8)}}>
                      {a.yarn_name}
                    </Text>
                    <Text
                      style={{width: '33%',maxWidth:wp(20),
                        ...styleText.semiBold, borderWidth: 0, color: Black,fontSize:hp(1.8)}}>
                      {a.yarn_rate}
                    </Text>
                    {a.is_reflect ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '33%',
                          borderWidth: 0,
                          justifyContent: 'flex-end',
                        }}>
                        <Text style={{color: Black,...styleText.semiBold, fontSize: hp(1.6)}}>
                          Reflected
                        </Text>
                        <Checkbox height={25} width={25} />
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '33%',
                          borderWidth: 0,
                          justifyContent: 'flex-end',
                        }}></View>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: Black, fontSize: hp(1.6),maxWidth:wp(15)}}>
                      {a.created_by.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: Black, fontSize: hp(1.6),
                          ...styleText.semiBold,maxWidth:wp(30)
                        }}>
                        {moment
                          .utc(a.updated_at)
                          .utcOffset('+05:30')
                          .format('DD/MM/YYYY HH:mm')}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default Yarn_activity;

const styles = StyleSheet.create({
  backgroundColor:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Transparent,
  },
  mainview:{
    height: height / 1.3,
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: White,
    alignItems: 'center',
    bottom:0,
    position:"absolute"

  },
  data_view:{
    borderWidth: 0,
    marginHorizontal: '2%',
    marginVertical: '2%',
    borderRadius: 10,
    padding: '2%',
    shadowColor: Black,
    backgroundColor: White,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  }
});
