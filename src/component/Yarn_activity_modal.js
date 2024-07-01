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
import Close from '../assets/svgs/Close';
import DottedLine from './DottedLine';
import Checkbox from '../assets/svgs/Checkbox';
import moment from 'moment';

const {height, width} = Dimensions.get('window');
const Yarn_activity = ({show, setShow, data}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View
        style={styles.backgroundColor}>
        <View
          style={styles.mainview}>
          <View style={{flexDirection: 'row', marginTop: '2%'}}>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                fontWeight: '700',
                marginLeft: '6%',
              }}>
              History
            </Text>
            <TouchableOpacity
              style={{left: width / 3}}
              onPress={() => setShow(false)}>
              <Close color="#292D32" />
            </TouchableOpacity>
          </View>
          <DottedLine margin={{width: width / 1.1, marginTop: '3%'}} />
          <ScrollView
            style={{
              borderWidth: 0,
              width: width / 1.1,
              marginBottom: '2%',
              marginTop: '2%',
            }}>
            {data?.map(a => {
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
                      style={{width: '33%', borderWidth: 0, color: '#2D303D'}}>
                      {a.yarn_name}
                    </Text>
                    <Text
                      style={{width: '33%', borderWidth: 0, color: '#2D303D'}}>
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
                        <Text style={{color: '#2D303D', fontSize: 12}}>
                          Reflected
                        </Text>
                        <Checkbox />
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
                    <Text style={{color: '#2D303D', fontSize: 12}}>
                      {a.created_by.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#2D303D',
                          fontSize: 12,
                          fontWeight: '600',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainview:{
    height: height / 1.3,
    width: width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    bottom:0,
    position:"absolute"

  },
  data_view:{
    borderWidth: 0,
    marginHorizontal: '3%',
    marginVertical: '2%',
    borderRadius: 10,
    padding: '2%',
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  }
});
