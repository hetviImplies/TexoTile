import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import DataNot from '../assets/svgs/DataNot';
import LeftArrow from '../assets/svgs/LeftArrow';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {GetQualityData, SearchData} from '../Slice/QualitySlice';
import DataNotFound from '../component/DataNotFound';
import Add from '../assets/svgs/Add';
import Search from '../assets/svgs/Search';
import SeachBar from '../component/SeachBar';
import { useFocusEffect } from '@react-navigation/native';
import { URL } from '../URLs/URL';
import { EndPoints } from '../URLs/EndPoints';
import Activity_Indicator from '../component/Activity_Indicator';
const {height, width} = Dimensions.get("window");
const Quality = props => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState();
  const [isRole,setIsRole]=useState()
  const Data = useSelector(state => state.Quality.QualityData);
  const pending = useSelector(state => state.Quality.QualityPending);
  const dispatch = useDispatch();
  useEffect(() => {
    HandleData();
  }, [DisplayData]);

  useEffect(() => {
    setData(Data);
  }, [Data]);

  const HandleData = () => {
    dispatch(GetQualityData());
  };

  useEffect(() => {
    dispatch(SearchData(search));
  }, [search]);

  const DisplayData = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {data?.map(item => {
          return (
            <TouchableOpacity
            disabled={isRole=='view' ? true : false}
              onPress={() => {
                props.navigation.navigate('QualityDetail', {data: item});
              }}
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#E89E46',
                borderRadius: 15,
                marginTop: '2%',
                marginHorizontal: '4%',
              }}>
              <View style={{marginHorizontal: '3%', marginVertical: '2%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#E89E46',
                      fontSize: 17,
                      fontWeight: '600',
                    }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <Text>Kg : </Text>
                    <Text style={styles.subText}>{item.weight}</Text>
                    <View style={styles.text_View}></View>
                    <Text>₹ : </Text>
                    <Text style={styles.subText}>{item.quality_cost}</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: 'rgba(45, 48, 61, 0.1)',
                    marginTop: '3%',
                  }}></View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '3%',
                    }}>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={styles.subText}>
                        {item.total_beam_ends?.split('.')[0]}
                      </Text>
                      <Text style={{fontSize: 11}}>Tar</Text>
                    </View>
                    <View style={styles.text_View}></View>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={styles.subText}>{item.total_width}</Text>
                      <Text style={{fontSize: 11}}>Width</Text>
                    </View>
                    <View style={styles.text_View}></View>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={styles.subText}>{item.total_pick}</Text>
                      <Text style={{fontSize: 11}}>Pick</Text>
                    </View>
                    <View style={styles.text_View}></View>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={styles.subText}>
                        {item.gsm
                          ? isNaN(item.gsm)
                            ? '0'
                            : parseFloat(item.gsm).toFixed(0)
                          : '0'}
                      </Text>
                      <Text style={{fontSize: 11}}>Gsm</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: 'rgba(45, 48, 61, 0.1)',
                      marginTop: '3%',
                    }}></View>

                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        height: height / 17,
                        width: width / 2.35,
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          color: '#E89E46',
                          marginBottom: '2%',
                          marginTop: '1%',
                        }}>
                        Weft
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginRight: '10%',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text>Kg : </Text>
                          <Text style={styles.subText}>
                            {item.total_weft_weight}
                          </Text>
                        </View>

                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <Text>₹ : </Text>
                            <Text style={styles.subText}>
                              {item.total_weft_cost}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(45, 48, 61, 0.1)',
                        height: height / 30,
                        alignSelf: 'center',
                      }}></View>
                    <View
                      style={{
                        height: height / 17,
                        width: width / 2.35,
                        marginLeft: '2%',
                      }}>
                      <Text
                        style={{
                          color: '#E89E46',
                          marginBottom: '2%',
                          marginTop: '1%',
                        }}>
                        Warp
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginRight: '10%',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text>Kg : </Text>
                          <Text style={styles.subText}>
                            {item.total_weft_weight}
                          </Text>
                        </View>

                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <Text>₹ : </Text>
                            <Text style={styles.subText}>
                              {item.total_warp_cost}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(GetQualityData());
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const response = axios.get(`${URL}${EndPoints.GetProfile}`).then((res)=>{
        setIsRole(res.data.result.role)
      })
    }, [])
  );

  useLayoutEffect(() => {
    if (Data?.length > 0 && isRole !== "view") {
      console.log(Data?.length, '=============', isRole);
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: '15%' }}
            onPress={() => props.navigation.navigate('QualityDetail')}>
            <Add big={true} color={'white'} />
          </TouchableOpacity>
        ),
      });
    } else {
      // Remove the headerRight option when the condition is not met
      props.navigation.setOptions({
        headerRight: null,
      });
    }
  }, [Data, props.navigation, isRole]);

  return (
    <View style={{backgroundColor: 'white',flex:1}}>
      {pending ? null : data?.length > 0 ? (
        <SeachBar setSearch={setSearch}/>
      ) : null}
      {pending ? (
       <Activity_Indicator/>
      ) : data?.length > 0 && data != null ? (
        <DisplayData />
      ) : (
        <DataNotFound
          title={'Add Quality'}
          func={() => props.navigation.navigate('QualityDetail')}
        />
      )}
    </View>
  );
};

export default Quality;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height,
  },
  shadowBox: {
    borderWidth: 0,
    marginTop: '3%',
    marginLeft: '5%',
    height: 55,
    width: 55,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: height / 50,
  },
  SearchBar: {
    borderRadius: 10,
    marginHorizontal: '4%',
    marginTop: '4%',
    backgroundColor: 'white',
    marginBottom: '2%',
    paddingLeft: '13%',
    height: height / 14,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  subText: {
    color: '#393846',
    fontWeight: '700',
    fontSize: 15,
  },
  text_View: {
    borderWidth: 1,
    borderColor: 'rgba(45, 48, 61, 0.1)',
    marginHorizontal: '6%',
  },
});
