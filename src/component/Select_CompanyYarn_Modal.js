import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetCompanyData,
  GetYarnData,
  SearchCompanyData,
  SearchData,
} from '../Slice/YarnSlice';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import Add_Modal from './Add_CompanyYarn_Modal';

import {styleText} from '../assets/fonts/Fonts';
import SeachBar from './SeachBar';
import {Modal} from 'react-native';
import {Add_Black, Add_Yellow, Close_Black} from '../assets/svgs/svg';
import {hp} from '../Global_Com/responsiveScreen';
import {
  Black,
  Border_Color,
  TextInput_Border_Color,
  Transparent,
  White,
  Yellow,
} from '../Global_Com/color';
import {ConditionContext} from '../screens/ConditionContext';
import AppConstant from '../Utils/AppConstant';
const {height, width} = Dimensions.get('window');



const All_Yarn_Modal = ({
  visible,
  data,
  setValue,
  setYarn_name,
  modal_Type,
  setCompany_name,
  editData,
}) => {
  const dispatch = useDispatch();
  const [yarn, setYarn] = useState([]);
  const [selectedValueYarn, setSelectedValueYarn] = useState(null);
  const [selectedValueCompany, setSelectedValueCompany] = useState(null);
  const [yarnSearch, setYarnSearch] = useState(null);
  const [companySearch, setCompanySearch] = useState(null);
  const yarnData = useSelector(state => state.Yarn.YarnData);
  const companyData = useSelector(state => state.Yarn.YarnCompanyData);
  const CompanyPending = useSelector(state => state.Yarn.YarnCompanyPending);
  const YarnPending = useSelector(state => state.Yarn.YarnPending);
  const [showModal, setShowModal] = useState(false);
  const {condition} = useContext(ConditionContext);
  useEffect(() => {
    if (modal_Type != undefined) {
      if (modal_Type === 'Yarn') {
        dispatch(GetYarnData());
      } else {
        dispatch(GetCompanyData());
      }
    }
  }, [modal_Type, showModal]);

  useEffect(() => {
    setSelectedValueYarn(editData?.data.yarn.id);
    setSelectedValueCompany(editData?.data.company.id);
  }, [editData]);

  const OpenModal = () => {
    return (
      <Add_Modal
        visible={showModal}
        setValue={setShowModal}
        input1_name={'Enter Company Name'}
        modal_Type={modal_Type}
      />
    );
  };

  useEffect(() => {
    dispatch(SearchData(yarnSearch));
  }, [yarnSearch]);

  function DisplayData(props) {
    return (
      <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: '3%',
          paddingVertical: '2%',
          paddingBottom:hp(20)
        }}>
        {(modal_Type === 'Company'
          ? companyData
          : yarnData
        )?.map(a => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (modal_Type != 'Company') {
                  data(pr => ({
                    ...pr,
                    yarn_rate: a.rate,
                    yarn: {
                      id: a.id,
                      name: a.name,
                      rate: a.rate,
                      is_deleted: a.is_deleted,
                      created_at: a.created_at,
                      updated_at: a.updated_at,
                    },
                  }));
                  setYarnSearch(null)
                      setCompanySearch(null)
                  setYarn_name(a.name);
                  setSelectedValueYarn(a.id);
                  setValue(false);
                  dispatch(GetYarnData());
                  setYarn([]);
                } else {
                  data(pr => ({
                    ...pr,
                    company: {
                      id: a.id,
                      name: a.name,
                      is_deleted: a.is_deleted,
                      created_at: a.created_at,
                      updated_at: a.updated_at,
                    },
                  }));
                  setYarnSearch(null)
                      setCompanySearch(null)
                  setCompany_name(a.name);
                  setSelectedValueCompany(a.id);
                  setValue(false);
                  dispatch(GetCompanyData());
                  setYarn([]);
                }
              }}
              style={{
                flexDirection: 'row',
                borderWidth: 0,
                marginTop: '1%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: Black,
                  width: '33%',
                  ...styleText.semiBold,
                  fontSize: hp(1.9),
                }}>
                {a.name}
              </Text>
              {modal_Type == 'Yarn' ? (
                <Text
                  style={{
                    color: Black,
                    width: '33%',
                    ...styleText.semiBold,
                    fontSize: hp(1.9),
                  }}>
                  ₹ {a.rate}
                </Text>
              ) : null}
              <RadioButton
                color={Yellow}
                uncheckedColor="#E89E46"
                value={a.id}
                status={
                  modal_Type == 'Company'
                    ? selectedValueCompany === a.id
                      ? 'checked'
                      : 'unchecked'
                    : selectedValueYarn === a.id
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  if (modal_Type != 'Company') {
                    data(pr => ({
                      ...pr,
                      yarn_rate: a.rate,
                      yarn: {
                        id: a.id,
                        name: a.name,
                        rate: a.rate,
                        is_deleted: a.is_deleted,
                        created_at: a.created_at,
                        updated_at: a.updated_at,
                      },
                    }));
                    setYarn_name(a.name);
                    setSelectedValueYarn(a.id);
                    setValue(false);
                    setYarn([]);
                    dispatch(GetYarnData());
                    setYarn([]);
                  } else {
                    data(pr => ({
                      ...pr,
                      company: {
                        id: a.id,
                        name: a.name,
                        is_deleted: a.is_deleted,
                        created_at: a.created_at,
                        updated_at: a.updated_at,
                      },
                    }));
                    setSelectedValueCompany(a.id);
                    setCompany_name(a.name);
                    setValue(false);
                    dispatch(GetCompanyData());
                    setYarn([]);
                  }
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  useEffect(() => {
    dispatch(SearchCompanyData(companySearch));
  }, [companySearch]);

  return (
    <KeyboardAvoidingView>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.backgroundColor}>
          <View
            style={{
              position: 'absolute',
              height: height / 1.3,
              width: width,
              backgroundColor: White,
              maxHeight: height,
              top: '25%',
            }}>
            <View style={{borderWidth: 0, margin: '5%'}}>
              <View
                style={{
                  borderWidth: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{color: Black, fontSize: 18, ...styleText.semiBold}}>
                  {modal_Type == 'Yarn' ? 'Select Yarn' : 'Select Company'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '15%',
                    borderWidth: 0,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(true);
                    }}>
                    <Add_Yellow height={25} width={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setYarnSearch(null)
                      setCompanySearch(null)
                      setValue(false);
                      setYarn([]);
                    }}>
                    <Close_Black height={23} width={23} />
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
              cursorColor={Yellow}
                placeholder="Search"
                value={modal_Type == 'Yarn' ? yarnSearch : companySearch}
                onChangeText={e => {
                  if (modal_Type == 'Yarn') {
                    setYarnSearch(e);
                  } else {
                    setCompanySearch(e);
                  }
                }}
                style={styles.SearchBAr}></TextInput>
              {modal_Type === 'Company' ? (
                CompanyPending &&
                (companyData?.length === 0 || companyData?.length === 0) ? (
                  <ActivityIndicator
                    color={Yellow}
                    style={{marginTop: '50%'}}
                  />
                ) : null
              ) : YarnPending &&
                (yarnData?.length === 0 || yarnData === undefined) ? (
                <ActivityIndicator color={Yellow} style={{marginTop: '50%'}} />
              ) : null}
              {
                modal_Type==="Yarn" ?
                yarn?.length === 0 &&
              yarnData?.length === 0 &&
              YarnPending === false ? (
                <View style={{alignItems: 'center', marginVertical: '45%'}}>
                  <Text style={styles.text}>No User found</Text>
                </View>
              ) : (
                <DisplayData/>
              )
              : null}
              {
                modal_Type==="Company" ?
              companyData?.length === 0 &&
              CompanyPending === false ? (
                <View style={{alignItems: 'center', marginVertical: '45%'}}>
                  <Text style={styles.text}>No User found</Text>
                </View>
              ) : (
                <DisplayData/>
              )
              : null
              }
            </View>
            {OpenModal()}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};
export default All_Yarn_Modal;

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Transparent,
  },
  SearchBAr: {
    borderWidth: 1,
    paddingLeft: '5%',
    height: hp(6),
    borderRadius: 15,
    marginTop: '5%',
    borderColor: TextInput_Border_Color,
  },
  text: {
    color: Black,
    ...styleText.bold,
    fontSize: hp(2.4),
  },
});
