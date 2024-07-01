import {
  ActivityIndicator,
  Dimensions,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import DataNot from '../assets/svgs/DataNot';
import DataNotFound from '../component/DataNotFound';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddYarnData,
  GetYarnActivity,
  GetYarnData,
  SearchData,
} from '../Slice/YarnSlice';
import Edit from '../assets/svgs/Edit';
import Recent from '../assets/svgs/Recent';
import AddYarnModal from '../component/Add_Yarn_Modal';
import Add from '../assets/svgs/Add';
import Yarn_activity from '../component/Yarn_activity_modal';
import Search from '../assets/svgs/Search';
import SeachBar from '../component/SeachBar';
import axios from 'axios';
import { URL } from '../URLs/URL';
import { EndPoints } from '../URLs/EndPoints';
import { useFocusEffect } from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
const Yarn = ({navigation}) => {
  const dispatch = useDispatch();
  const [YarnData, setYarnData] = useState(null);
  const [search, setSearch] = useState();
  const [YarnName, setYarnName] = useState();
  const [YarnRate, setYarnRate] = useState();
  const Yarndata = useSelector(state => state.Yarn.YarnData);
  const YarnPending = useSelector(state => state.Yarn.YarnPending);
  const [showYarnModal, setShowYarnModal] = useState(false);
  const [yarn_activity, setYarn_activity] = useState();
  const [showYarnActivityModal, setShowYarnActivityModal] = useState(false);
  const [isRole,setIsRole]=useState()



  useFocusEffect(
    useCallback(() => {
      const response = axios.get(`${URL}${EndPoints.GetProfile}`).then((res)=>{
        setIsRole(res.data.result.role)
      })
    }, [])
  );

  useEffect(() => {
    setYarnData(Yarndata);
  }, [Yarndata]);

  useEffect(() => {
    dispatch(SearchData(search));
  }, [search]);

  useLayoutEffect(() => {
    if(Yarndata?.length > 0 && isRole !== "view"){
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: '15%'}}
            onPress={() => setShowYarnModal(true)}>
            <Add  big={true} color={'white'}/>
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: null,
      });
    }
  }, [navigation, Yarndata, isRole]);
  console.log(isRole,'=================================isRole from yaarne');

  const OpenYarnActivity = () => {
    return (
      <Yarn_activity
        show={showYarnActivityModal}
        setShow={setShowYarnActivityModal}
        data={yarn_activity}
      />
    );
  };

  const OpenModal = () => {
    return (
      <AddYarnModal
        func={() => {
          dispatch(
            AddYarnData({
              name: YarnName,
              rate: YarnRate,
            }),
          ).then(a => {
            if (a.meta.requestStatus == 'fulfilled') {
              setYarnName('');
              setYarnRate('');
              setShowYarnModal(false);
              dispatch(GetYarnData());
            }
          });
        }}
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
    dispatch(GetYarnData());
  }, []);

  const DisplayData = () => {
    return (
      <View>
        <View style={{borderWidth: 0, marginHorizontal: '4%', marginTop: '3%'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text_heading}>Yarn Name</Text>
            <Text style={[styles.text_heading, {marginLeft: width / 5}]}>
              Y.Rate
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {YarnData?.map(a => {
              return (
                <View style={{borderWidth: 0}}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        borderWidth: 0,
                        width: width / 3.5,
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.sub_text}>{a.name}</Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 0,
                        justifyContent: 'center',
                        height: height / 18,
                        marginLeft: width / 10,
                        width: width / 4.5,
                      }}>
                      <Text style={styles.sub_text}>₹ {a.rate}</Text>
                    </View>
                    {isRole!=='view' ? <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: width / 7,
                        alignSelf: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('UpdateYarn', {id: a.id})
                        }>
                        <Edit />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{marginLeft: '8%'}}
                        onPress={() => {
                          dispatch(GetYarnActivity({id: a.id})).then(a => {
                            setYarn_activity(a.payload);
                          });
                          setShowYarnActivityModal(true);
                        }}>
                        <Recent />
                      </TouchableOpacity>
                    </View> : null}
                  </View>
                  <View
                    style={{
                      borderWidth: 0.7,
                      borderColor: '#rgba(45, 48, 61, 0.1)',
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
      {YarnData?.length > 0 && YarnData != null ? (
        <SeachBar setSearch={setSearch}/>
      ) : null}

      {YarnPending ? (
        <ActivityIndicator size={40}  style={{marginVertical: height / 2.5}} color={"#E89E46"} />
      ) : YarnData?.length > 0 && YarnData != null ? (
        DisplayData()
      ) : (
        <DataNotFound title={'Add Yarn'} func={() => setShowYarnModal(true)} />
      )}
      {OpenModal()}

      {OpenYarnActivity()}
    </View>
  );
};

export default Yarn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    marginBottom: '2%',
    paddingLeft: '13%',
    height: height / 14,
  },
  scrollViewContent: {
    flexGrow: 1,
    borderWidth: 0,
    marginTop: '4%',
    paddingBottom: '25%', // Adjust based on tab bar height

  },
  text_heading: {
    color: '#2D303D',
    fontSize: 15,
    fontWeight: '500',
  },
  sub_text: {
    fontSize: 14,
    color: '#2D303D',
  },
});
