import {
  ActivityIndicator,
  Dimensions,
  LogBox,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import DataNotFound from '../component/DataNotFound';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddYarnData,
  GetYarnActivity,
  GetYarnData,
  GetYarnQualityData,
  SearchData,
} from '../Slice/YarnSlice';
import AddYarnModal from '../component/Add_Yarn_Modal';

import Yarn_activity from '../component/Yarn_activity_modal';

import SeachBar from '../component/SeachBar';
import axios from 'axios';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import {useFocusEffect} from '@react-navigation/native';
import Activity_Indicator from '../component/Activity_Indicator';
import {styleText} from '../assets/fonts/Fonts';
import {
  Add_White,
  Edit_Logo,
  History_Logo,
  Yarn_Logo,
} from '../assets/svgs/svg';
import {ConditionContext} from './ConditionContext';
import {hp, wp} from '../Global_Com/responsiveScreen';
import {Black, Red, White} from '../Global_Com/color';
import screens from '../constants/screens';
import Toast from '../../Toast';
import AppConstant from '../Utils/AppConstant';
const {height, width} = Dimensions.get('window');
const Yarn = ({navigation}) => {
  const dispatch = useDispatch();
  const {condition} = useContext(ConditionContext);
  const [YarnData, setYarnData] = useState(null);
  const [search, setSearch] = useState(undefined);
  const [YarnName, setYarnName] = useState();
  const [YarnRate, setYarnRate] = useState();
  const Yarndata = useSelector(state => state.Yarn.YarnData);
  const YarnPending = useSelector(state => state.Yarn.YarnPending);
  const YarnOldDt = useSelector(state => state.Yarn.YarnOldDt);
  const [showYarnModal, setShowYarnModal] = useState(false);
  const [showYarnActivityModal, setShowYarnActivityModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);
  useFocusEffect(
    useCallback(() => {
      try {
        setSearch(null);
        dispatch(GetYarnData());
      } catch (error) {
        handleError(error.message);
      }
    }, []),
  );

  useEffect(() => {
    setYarnData(Yarndata);
  }, [Yarndata]);

  useEffect(() => {
    dispatch(SearchData(search));
  }, [search]);

  useLayoutEffect(() => {
    if (Yarndata?.length > 0 && condition !== 'view' && condition !== null) {
      navigation.setOptions({
        headerRight: () => (
          <View style={{width: wp(100)}}>
            <Toast ref={toastRef} />
            <TouchableOpacity
              style={{marginLeft: wp(87)}}
              onPress={() => setShowYarnModal(true)}>
              <Add_White height={hp(7)} width={wp(7)} />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <View style={{marginLeft: '12%'}}>
            <Yarn_Logo height={hp(9)} width={wp(9)} />
          </View>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => <Toast ref={toastRef} />,
        headerLeft: () => (
          <View style={{marginLeft: '12%'}}>
            <Yarn_Logo height={hp(9)} width={wp(9)} />
          </View>
        ),
      });
    }
  }, [navigation, Yarndata, condition]);

  const OpenYarnActivity = () => {
    return (
      <Yarn_activity
        show={showYarnActivityModal}
        setShow={setShowYarnActivityModal}
      />
    );
  };

  const handleError = useCallback(
    message => {
      toastRef.current.error(message);
      toastRef.current.Height(-StatusBar.currentHeight);
    },
    [toastRef],
  );

  const OpenModal = () => {
    return (
      <AddYarnModal
        func={async () => {
          setLoading(true);
          try {
            await dispatch(
              AddYarnData({
                name: YarnName?.trim(),
                rate: YarnRate,
              }),
            ).then(a => {
              if (a.meta.requestStatus !== 'rejected') {
                if (a.payload.error === false) {
                  setLoading(false);
                  setYarnName('');
                  setYarnRate('');
                  setShowYarnModal(false);
                  dispatch(GetYarnData());
                  if (typeof a.payload === 'string') {
                    handleError(a.payload.message);
                  }
                } else {
                  setLoading(false);
                  setYarnName('');
                  setYarnRate('');
                  setShowYarnModal(false);
                  handleError(a.payload.message);
                }
              } else {
                handleError(a.payload.message);
              }
            });
          } catch (error) {
            setLoading(false);
            setYarnName('');
            setYarnRate('');
            setShowYarnModal(false);
            handleError(error.message);
          }
        }}
        setLoading={setLoading}
        loading={loading}
        value={showYarnModal}
        setValue={setShowYarnModal}
        setName={setYarnName}
        name={YarnName}
        rate={YarnRate}
        setRate={setYarnRate}
      />
    );
  };
  useEffect(() => {
    try {
      dispatch(GetYarnData());
    } catch (error) {
      handleError(error.message);
    }
  }, [DisplayData]);

  const DisplayData = () => {
    return (
      <View>
        <View style={{borderWidth: 0, marginHorizontal: '4%', marginTop: '3%'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text_heading}>Yarn Name</Text>
            <Text style={[styles.text_heading, {marginLeft: wp(17)}]}>
              Y.Rate
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}>
            {YarnData?.map(a => {
              return (
                <View style={{borderWidth: 0}}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        borderWidth: 0,
                        width: '30%',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.sub_text}>{a.name}</Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 0,
                        justifyContent: 'center',
                        height: height / 18,
                        marginLeft: wp(10.2),
                        width: wp(25),
                      }}>
                      <Text style={styles.sub_text}>₹ {a.rate}</Text>
                    </View>
                    {condition !== 'view' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: wp(10),
                          alignSelf: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={async () => {
                            await dispatch(GetYarnQualityData(a.id));
                            navigation.navigate(screens.UpdateYarn, {data: a});
                          }}>
                          <Edit_Logo height={30} width={30} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{marginLeft: '8%'}}
                          onPress={async () => {
                            await dispatch(GetYarnActivity({id: a.id}));
                            setShowYarnActivityModal(true);
                          }}>
                          <History_Logo height={30} width={30} />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                  <View
                    style={{
                      borderWidth: 0.7,
                      borderColor: Black,
                      opacity: 0.1,
                    }}></View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {(YarnData?.length > 0 && YarnData !== null) ||
      search ||
      YarnOldDt?.length > 0 ? (
        <SeachBar setSearch={setSearch} />
      ) : null}
      {loading ? <Activity_Indicator /> : null}
      {YarnPending ? (
        <Activity_Indicator />
      ) : YarnData?.length > 0 && YarnData !== null ? (
        DisplayData()
      ) : (
        <DataNotFound
          search={search}
          title={'Add Yarn'}
          func={() => setShowYarnModal(true)}
        />
      )}
      {OpenModal()}
      {OpenYarnActivity()}
    </View>
  );
};

export default Yarn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: White,
    flex: 1,
  },
  shadow: {
    shadowOffset: {width: 4, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: '4%',
    marginTop: '4%',
    backgroundColor: White,
    marginBottom: '2%',
    paddingLeft: '13%',
    height: height / 14,
  },
  scrollViewContent: {
    flexGrow: 1,
    borderWidth: 0,
    marginTop: '4%',
    paddingBottom: hp(20),
  },
  text_heading: {
    color: Black,
    fontSize: hp(2),
    ...styleText.bold,
  },
  sub_text: {
    fontSize: hp(1.9),
    color: Black,
    ...styleText.semiBold,
  },
});
