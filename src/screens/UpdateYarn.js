import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LeftArrow from '../assets/svgs/LeftArrow';
import {useDispatch, useSelector} from 'react-redux';
import {GetYarn, GetYarnData, GetYarnQualityData, YarnDataUpdate} from '../Slice/YarnSlice';
import ButtonPress from '../component/ButtonPress';
import Accordion from '../component/Accordion';
import CheckBox from '@react-native-community/checkbox';
import { GetQualityData } from '../Slice/QualitySlice';
const {height, width} = Dimensions.get('window');
const UpdateYarn = ({route, navigation}) => {
  const {id} = route.params;

  const [YarnName, setYarnName] = useState();
  const [YarnRate, setYarnRate] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  const QualityData=useSelector((state)=> state.Yarn._Quality_Data)

  useEffect(() => {
    dispatch(GetYarn({id})).then(a => {
      setYarnName(a.payload.name);
      setYarnRate(a.payload.rate);
    });
  }, []);

  useEffect(()=>{
        dispatch(GetYarnQualityData({id}))
  },[])

  const toggleCheckbox = (value) => {
    if (checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter(item => item!== value));
    } else {
      setCheckedItems([...checkedItems, value]);
    }

  };

  useEffect(()=>{
    setSelectAll((checkedItems?.length === QualityData?.length));
  },[checkedItems])

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allValues = QualityData.map(option => option.id);
      setCheckedItems(allValues);
    } else {
      setCheckedItems([]);
    }
  };
  const DisplayQualityData=()=>{
    return(
        <ScrollView style={{height:height/1.73}}>
        <View style={{paddingBottom:"20%"}}>
            {
                QualityData.map((a)=>{
                    return (
                        <Accordion data={a} from="Yarn" id={id} checkedItems={checkedItems} toggleCheckbox={toggleCheckbox}/>
                        )
                })
            }
            </View>
        </ScrollView>
    )
  }

  return (
    <View style={{flex:1}}>
      <View
        style={{
          marginTop: '2%',
          marginHorizontal: '3%',
        }}>
        <Text style={{color: '#2D303D'}}>Yarn Name</Text>
        <TextInput
          value={YarnName}
          onChangeText={e => setYarnName(e)}
          placeholder="Enter Yarn Name"
          style={styles.textInput}></TextInput>
        <Text style={{color: '#2D303D'}}>Yarn Rate</Text>
        <TextInput
          value={YarnRate}
          onChangeText={e => setYarnRate(e)}
          placeholder="Enter Yarn Name"
          style={styles.textInput}></TextInput>
      </View>
      {QualityData!==null && QualityData[0]  ?
      <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:"3%"}}>
      <CheckBox
          value={selectAll}
          tintColors={{true : '#E89E46'}}
          onValueChange={toggleSelectAll}
        />
        <Text style={{color: '#2D303D'}}>Can you reflect this data with all quality?</Text>
      </View> : null}
          { QualityData!=null ? DisplayQualityData() : null}
      <ButtonPress
        title={'Update'}
        func={async () => {
        dispatch(YarnDataUpdate({
            id : id,
            name : YarnName,
            rate : YarnRate,
            isAll : selectAll,
            qualityIds : checkedItems
        })).then((a)=>{
            if(a.meta.requestStatus=='fulfilled'){
            dispatch(GetYarnData())
            dispatch(GetQualityData())
            navigation.goBack()}
        })
        }}
      />
    </View>
  );
};

export default UpdateYarn;

const styles = StyleSheet.create({
  textInput:{
    borderWidth: 1,
            marginVertical: '3%',
            paddingLeft: '8%',
            height: height/19,
            borderRadius: 15,
            backgroundColor: 'white',
            borderColor: 'rgba(45, 48, 61, 0.1)',
  }
});
