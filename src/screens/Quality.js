import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {GetQualityData, SearchData} from '../Slice/QualitySlice';
import DataNotFound from '../component/DataNotFound';

import SeachBar from '../component/SeachBar';
import {useFocusEffect} from '@react-navigation/native';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import Activity_Indicator from '../component/Activity_Indicator';
import {styleText} from '../assets/fonts/Fonts';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import DottedLine from '../component/DottedLine';
import {Add_White, Yarn_Logo} from '../assets/svgs/svg';
import {ConditionContext} from './ConditionContext';
import {hp, wp} from '../Global_Com/responsiveScreen';
import {Black, White, Yellow} from '../Global_Com/color';
import screens from '../constants/screens';
import AppConstant from '../Utils/AppConstant';
import {GlobalStyles} from '../Global_Com/Style';
const {height, width} = Dimensions.get('window');
const Quality = props => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState();
  const toastRef = useRef(null);
  const Data = useSelector(state => state.Quality.QualityData);
  const QualityOldDt = useSelector(state => state.Quality.QualityOldDt);
  const pending = useSelector(state => state.Quality.QualityPending);
  const dispatch = useDispatch();
  const {condition} = useContext(ConditionContext);
  useEffect(() => {
    HandleData();
  }, [DisplayData]);

  useEffect(() => {
    setData(Data);
  }, [Data]);

  const HandleData = () => {
    try {
      dispatch(GetQualityData());
    } catch (error) {
      handleError(error);
    }
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
              disabled={
                condition === 'view' ||
                condition === null ||
                condition === 'write'
                  ? true
                  : false
              }
              onPress={() => {
                props.navigation.navigate(screens.QualityDetail, {data: item});
              }}
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: Yellow,
                borderRadius: 15,
                marginTop: '2%',
                marginHorizontal: '4%',
              }}>
              <View
                style={{
                  borderWidth: 0,
                  marginHorizontal: '3%',
                  marginVertical: '2%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Yellow,
                      fontSize: hp(2.3),
                      maxWidth: width / 3,
                      ...styleText.bold,
                    }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <Text style={{...styleText.semiBold}}>
                      {AppConstant.KG} :{' '}
                    </Text>
                    <Text style={styles.subText}>{item.weight}</Text>
                    <View style={styles.text_View}></View>
                    <Text style={{...styleText.semiBold}}>
                      {AppConstant.ruppes} :{' '}
                    </Text>
                    <Text style={styles.subText}>{item.quality_cost}</Text>
                  </View>
                </View>
                <DottedLine margin={{marginTop: '3%'}} />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '3%',
                      maxWidth: width / 1.1,
                      borderWidth: 0,
                      flexGrow: 1,
                    }}>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={styles.subText}>
                        {item.total_beam_ends?.split('.')[0]}
                      </Text>
                      <Text style={styles.subTextField}>{AppConstant.Tar}</Text>
                    </View>
                    <View style={styles.text_View}></View>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={styles.subText}>{item.total_width}</Text>
                      <Text style={styles.subTextField}>
                        {AppConstant.Width}
                      </Text>
                    </View>
                    <View style={styles.text_View}></View>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={styles.subText}>{item.total_pick}</Text>
                      <Text style={styles.subTextField}>
                        {AppConstant.Pick}
                      </Text>
                    </View>
                    <View style={styles.text_View}></View>
                    <View
                      style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={styles.subText}>
                        {item.gsm
                          ? isNaN(item.gsm)
                            ? '0'
                            : parseFloat(item.gsm).toFixed(2)
                          : '0'}
                      </Text>
                      <Text style={styles.subTextField}>{AppConstant.Gsm}</Text>
                    </View>
                  </View>
                  <DottedLine margin={{marginTop: '3%'}} />

                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: width / 2.35,
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          color: Yellow,
                          marginBottom: '2%',
                          marginTop: '1%',
                          ...styleText.semiBold,
                        }}>
                        {AppConstant.Weft}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginRight: '10%',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{...styleText.semiBold}}>Kg : </Text>
                          <Text style={styles.subText}>
                            {item.total_weft_weight}
                          </Text>
                        </View>

                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{...styleText.semiBold}}>₹ : </Text>
                            <Text style={styles.subText}>
                              {item.total_weft_cost}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: Black,
                        opacity: 0.1,
                        height: '87%',
                        marginVertical: '6%',
                        marginTop: '8%',
                        alignSelf: 'center',
                      }}></View>
                    <View
                      style={{
                        width: width / 2.35,
                        marginLeft: '2%',
                      }}>
                      <Text
                        style={{
                          color: Yellow,
                          marginBottom: '2%',
                          marginTop: '1%',
                          ...styleText.semiBold,
                        }}>
                        {AppConstant.Warp}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginRight: '10%',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text>{AppConstant.KG} : </Text>
                          <Text style={styles.subText}>
                            {item.total_weft_weight}
                          </Text>
                        </View>

                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <Text>{AppConstant.ruppes} : </Text>
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

  const handleError = useCallback(
    message => {
      showMessage({
        message: 'Error',
        type: 'danger',
        description: message,
        icon: {icon: 'danger', position: 'left'},
        style: {
          alignItems: 'center',
        },
      });
    },
    [toastRef],
  );

  useFocusEffect(
    useCallback(() => {
      try {
        setSearch(null);
        dispatch(GetQualityData());
      } catch (error) {
        handleError(error.message);
      }
    }, []),
  );

  useLayoutEffect(() => {
    if (
      QualityOldDt?.length > 0 &&
      condition !== 'view' &&
      condition !== null
    ) {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: '15%'}}
            onPress={() => props.navigation.navigate(screens.QualityDetail)}>
            <Add_White height={hp(7)} width={wp(7)} />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <View style={{marginLeft: '13%', zIndex: 0}}>
            <Yarn_Logo height={hp(9)} width={wp(9)} />
          </View>
        ),
        headerShadowVisible: () => (
          <View style={{zIndex: 5000}}>
            <FlashMessage ref={toastRef} />
          </View>
        ),
      });
    } else {
      props.navigation.setOptions({
        headerRight: null,
        headerLeft: () => (
          <View style={{marginLeft: '13%', zIndex: 0}}>
            <Yarn_Logo height={hp(9)} width={wp(9)} />
          </View>
        ),
      });
    }
  }, [Data, condition]);

  return (
    <View style={GlobalStyles.ContainerWithoutJustifty}>
      {pending ? null : data?.length > 0 ||
        search ||
        QualityOldDt?.length > 0 ? (
        <SeachBar setSearch={setSearch} />
      ) : null}
      {pending ? (
        <Activity_Indicator />
      ) : data?.length > 0 && data != null ? (
        <DisplayData />
      ) : (
        <DataNotFound
          search={search}
          title={AppConstant.Add_Quality}
          func={() => props.navigation.navigate(screens.QualityDetail)}
        />
      )}
    </View>
  );
};

export default Quality;

const styles = StyleSheet.create({
  container: {
    backgroundColor: White,
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
    shadowColor: Black,
    backgroundColor: White,
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
    backgroundColor: White,
    marginBottom: '2%',
    paddingLeft: '13%',
    height: height / 14,
    shadowColor: Black,
    backgroundColor: White,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  subText: {
    color: Black,
    fontSize: hp(1.9),
    maxWidth: width / 8,
    ...styleText.bold,
  },
  text_View: {
    borderRightWidth: 1,
    borderColor: Black,
    opacity: 0.1,
    marginHorizontal: '3%',
  },
  subTextField: {fontSize: hp(1.3), ...styleText.semiBold},
});
