import {
  Dimensions,
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
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetYarn,
  GetYarnData,
  GetYarnQualityData,
  YarnDataUpdate,
} from '../Slice/YarnSlice';
import ButtonPress from '../component/ButtonPress';
import Accordion from '../component/Accordion';
import CheckBox from '@react-native-community/checkbox';
import {GetQualityData} from '../Slice/QualitySlice';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {styleText} from '../assets/fonts/Fonts';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
const {height, width} = Dimensions.get('window');
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import {ConditionContext} from './ConditionContext';
import {hp, wp} from '../Global_Com/responsiveScreen';
import {
  Black,
  TextInput_Border_Color,
  White,
  Yellow,
} from '../Global_Com/color';
import Toast from '../../Toast';
import Activity_Indicator from '../component/Activity_Indicator';
import {DecimalNum} from '../Utils/Regex';
const UpdateYarn = ({route, navigation}) => {
  const {data} = route.params;

  const {condition} = useContext(ConditionContext);
  const [YarnName, setYarnName] = useState();
  const [YarnRate, setYarnRate] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const toastRef = useRef(null);
  const dispatch = useDispatch();
  const QualityData = useSelector(state => state.Yarn._Quality_Data);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setYarnName(data.name);
    setYarnRate(data.rate);
  }, []);

  const handleError = useCallback(
    message => {
      toastRef.current.error(message);
      toastRef.current.Height(-StatusBar.currentHeight);
    },
    [toastRef],
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerShown: true,
        headerTitleAlign: 'center',
        headerBackgroundContainerStyle: {
          backgroundColor: Yellow,
        },
        headerTitleStyle: {
          ...styleText.bold,
        },
        title: 'Update Yarn',
        headerTintColor: White,
        headerBackground: () => {},
        headerRight: () => <Toast ref={toastRef} />,
      },
      [navigation],
    );
  });

  useEffect(() => {
    dispatch(GetYarnQualityData(data.id));
  }, []);

  const toggleCheckbox = value => {
    if (checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter(item => item !== value));
    } else {
      setCheckedItems([...checkedItems, value]);
    }
  };

  useEffect(() => {
    setSelectAll(checkedItems?.length === QualityData?.length);
  }, [checkedItems]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allValues = QualityData.map(option => option.id);
      setCheckedItems(allValues);
    } else {
      setCheckedItems([]);
    }
  };

  const DisplayQualityData = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{height: hp(3), borderWidth: 0}}>
        <View style={{paddingBottom: '20%'}}>
          {QualityData.map(a => {
            return (
              <Accordion
                data={a}
                from="Yarn"
                id={data?.id}
                checkedItems={checkedItems}
                toggleCheckbox={toggleCheckbox}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      {loading ? <Activity_Indicator /> : null}
      <View
        style={{
          marginTop: '2%',
          marginHorizontal: '3%',
        }}>
        <Text style={{color: Black, ...styleText.regular, fontSize: hp(2)}}>
          Yarn Name
        </Text>
        <TextInput
          value={YarnName}
          onChangeText={e => {
            let newName = e; // don't use trim() here
            if (newName.charAt(0) === ' ') {
              // if the first character is a space, remove it
              newName = newName.substring(1);
            }
            if (newName.length > 1) {
              // if the input string has more than one character
              newName = newName.replace(/\s{2,}/g, ' '); // replace 2 or more spaces with a single space
            }
            setYarnName(newName);
          }}
          placeholder="Enter Yarn Name"
          style={styles.textInput}></TextInput>
        <Text style={{color: Black, ...styleText.regular, fontSize: hp(2)}}>
          Yarn Rate
        </Text>
        <TextInput
          keyboardType="number-pad"
          value={YarnRate}
          onChangeText={e => {
            if (e === '' || DecimalNum.test(e)) setYarnRate(e);
          }}
          placeholder="Enter Yarn Name"
          style={styles.textInput}></TextInput>
      </View>
      {QualityData !== null &&
      QualityData[0] &&
      condition !== 'write' &&
      condition !== 'view' ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: '3%',
          }}>
          <CheckBox
            value={selectAll}
            tintColors={{true: Yellow}}
            onValueChange={toggleSelectAll}
          />
          <Text style={{color: Black, ...styleText.regular, fontSize: wp(4)}}>
            Can you reflect this data with all quality?
          </Text>
        </View>
      ) : null}
      {QualityData !== null && condition !== 'write' && condition !== 'view'
        ? DisplayQualityData()
        : null}
        <ButtonPress
  title={'Update'}
  func={async () => {
    try {
      setLoading(true);
      const response = await dispatch(
        YarnDataUpdate({
          id: data.id,
          name: YarnName,
          rate: YarnRate,
          isAll: selectAll,
          qualityIds: checkedItems,
        }),
      );
      const { payload } = response;
      if (payload.error === false) {
        setLoading(false);
        dispatch(GetYarnData());
        dispatch(GetQualityData());
        navigation.goBack();
      } else {
        throw new Error(payload.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message);
    }
  }}
/>
    </View>
  );
};

export default UpdateYarn;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    marginVertical: '3%',
    paddingLeft: '8%',
    height: hp(5.5),
    borderRadius: 15,
    backgroundColor: White,
    borderColor: TextInput_Border_Color,
  },
});
