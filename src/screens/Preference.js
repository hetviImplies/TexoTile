import {
  Dimensions,
  Modal,
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
  useRef,
  useState,
} from 'react';
import LogoComponent from '../component/LogoComponent';
import TextComponent from '../component/TextComponent';
import ButtonPress from '../component/ButtonPress';
import OpenModal from '../component/OpenModal';
import {useDispatch} from 'react-redux';
import {CreateAuth, GetUser, JoinAuth} from '../Slice/LoginAuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styleText} from '../assets/fonts/Fonts';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import Toast from '../../Toast';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {ConditionContext} from './ConditionContext';
import axios from 'axios';
import {hp} from '../Global_Com/responsiveScreen';
import {White, Yellow} from '../Global_Com/color';
import screens from '../constants/screens';
import AppConstant from '../Utils/AppConstant';
import {GlobalStyles} from '../Global_Com/Style';
import Activity_Indicator from '../component/Activity_Indicator';
const Preference = props => {
  const {condition, setCondition} = useContext(ConditionContext);
  const [addVisible, setAddVisible] = useState(false);
  const [joinVisible, setJoinVisible] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();
  const toastRef = useRef(null);

  useEffect(() => {
    if (!addVisible) {
      setIsDisable(true);
    }
    if (joinVisible) {
      setIsDisable(true);
    }
  }, [addVisible, joinVisible]);

  const OpenAdd = () => {
    return (
      <OpenModal
      modal={'add'}
        value={companyName}
        setValue={setCompanyName}
        isDisable={isDisable}
        setIsDisable={setIsDisable}
        visible={addVisible}
        setVisible={setAddVisible}
        mainText={AppConstant.EnterCompanyName}
        subText={AppConstant.Lorem}
        setFunc={name => {
          let nm = name.replace(/\s{2,}/g, ' '); // replace 2 or more spaces with a single space
          nm = nm.replace(/^ /, ''); // remove leading space
          nm = nm.replace(/ $/, '');
          setCompanyName(nm);
          // }
        }}
        BtnText={AppConstant.Create_Company}
        Handle={async () => {
          const obj = JSON.stringify({
            name: companyName,
          });
          setLoading(true)
          await dispatch(CreateAuth(obj))
            .then(async data => {
              if (data.payload.error) {
                setLoading(false)
                setAddVisible(!addVisible);
                handleError(data.payload.message);
                setIsDisable(true);
              } else {
                setLoading(false)
                await dispatch(GetUser()).then(res => {
                  setCondition(res.payload.result.role);
                  return props.navigation.reset({
                  index: 0,
                  routes: [{name: screens.Tabs}],
                });
                });
              }
            })
            .catch(error => {
              setLoading(false)
              handleError(error.message);
            });
        }}
        placeHolder={'Create Name'}
      />
    );
  };

  const OpenJoin = () => {
    return (
      <OpenModal
      modal={"join"}
        value={companyCode}
        setValue={setCompanyCode}
        isDisable={isDisable}
        setIsDisable={setIsDisable}
        visible={joinVisible}
        setVisible={setJoinVisible}
        mainText={AppConstant.EnterCompanyCode}
        subText={AppConstant.Lorem}
        setFunc={e => {
          let nm = e.replace(/\s+/g, ' ');
          setCompanyCode(nm);
        }}
        BtnText={AppConstant.Join_Company}
        Handle={async () => {
          setLoading(true)
          try {
            await dispatch(JoinAuth({code: companyCode.toUpperCase()})).then(
              data => {
                if (
                  data.payload.statusCode === 200 &&
                  data.payload.error === false
                ) {
                  setLoading(false)
                  return props.navigation.reset({
                  index: 0,
                  routes: [{name: screens.Request}],
                });
                } else {
                  setLoading(false)
                  setJoinVisible(!joinVisible);
                  handleError(data.payload.message);
                }
              },
            );
          } catch (error) {
            setLoading(false)
            setJoinVisible(!joinVisible);
            handleError(error.message);
          }
        }}
        placeHolder={'Join Name'}
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
  return (
    <View style={GlobalStyles.ContainerWithoutJustifty}>
      <Toast ref={toastRef} />
      {
        loading ? <Activity_Indicator/> : null
      }
      <LogoComponent />
      <View style={{margin: '5%'}}>
        <TextComponent
          main={AppConstant.Select_preference}
          sub={AppConstant.Choose_Categories}
        />

        <TouchableOpacity
          onPress={() => setAddVisible(!addVisible)}
          style={styles.BtnContainer}>
          <Text style={styles.text}>{AppConstant.Add_Company}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setJoinVisible(!joinVisible)}
          style={styles.BtnContainer}>
          <Text style={styles.text}>{AppConstant.Join_Company}</Text>
        </TouchableOpacity>
      </View>
      {OpenAdd()}
      {OpenJoin()}
    </View>
  );
};

export default Preference;

const styles = StyleSheet.create({
  BtnContainer: {
    borderWidth: 2,
    height: '15%',
    borderRadius: 15,
    marginTop: '5%',
    borderColor: Yellow,
    backgroundColor: '#FFFAF3',
    justifyContent: 'center',
  },
  text: {
    color: Yellow,
    marginLeft: '5%',
    fontSize: hp(2.2),
    ...styleText.semiBold,
  },
});
