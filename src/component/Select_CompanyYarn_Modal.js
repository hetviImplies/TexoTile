import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Add from '../assets/svgs/Add';
import Close from '../assets/svgs/Close';
import Search from '../assets/svgs/Search';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetCompanyData,
  GetYarnData,
  SearchCompanyData,
  SearchData,
} from '../Slice/YarnSlice';
import {RadioButton} from 'react-native-paper';
import Add_Modal from './Add_CompanyYarn_Modal';

const {height, width} = Dimensions.get('window');
const All_Yarn_Modal = ({
  visible,
  data,
  setValue,
  setYarn_name,
  modal_Type,
  setCompany_name,
  editData
}) => {
  const dispatch = useDispatch();
  const [yarn, setYarn] = useState();
  const [selectedValueYarn, setSelectedValueYarn] = useState(null);
  const [selectedValueCompany, setSelectedValueCompany] = useState(null);
  const [yarnSearch, setYarnSearch] = useState(null);
  const [companySearch, setCompanySearch] = useState(null);
  const yarnData = useSelector(state => state.Yarn.YarnData);
  const companyData = useSelector(state => state.Yarn.YarnCompanyData);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (modal_Type != undefined) {
      if (modal_Type === 'Yarn') {
        dispatch(GetYarnData()).then(a => {
          setYarn(yarnData);
        });
      }
    }
  }, [modal_Type, showModal]);


  useEffect(()=>{
    setSelectedValueYarn(editData?.data.yarn.id)
    setSelectedValueCompany(editData?.data.company.id)
  },[editData])

  useEffect(() => {
    setYarn(yarnData);
  }, [yarnData]);

  useEffect(() => {
    if (modal_Type != undefined) {
      if (modal_Type == 'Company') {
        dispatch(GetCompanyData()).then(a => {
          setYarn(companyData);
        });
      }
    }
  }, [modal_Type, showModal]);

  useEffect(() => {
    setYarn(companyData);
  }, [companyData]);

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

  useEffect(() => {
    dispatch(SearchCompanyData(companySearch));
  }, [companySearch]);


  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={styles.backgroundColor}>
        <View
          style={{
            bottom:0,position:"absolute",
            height:height/1.3,
            width: width,
            backgroundColor: 'white',
          }}>
          <View style={{borderWidth: 0, margin: '5%'}}>
            <View
              style={{
                borderWidth: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'black', fontSize: 17, fontWeight: '500'}}>
                {modal_Type == 'Yarn' ? 'Select Yarn' : 'Select Company'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '15%',
                  borderWidth: 0,
                  alignItems:"center"
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(true);
                  }}>
                  <Add width={22} height={22} color={'#E89E46'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setValue(false)}>
                  <Close color="#292D32" />
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
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

            <ScrollView>
              {yarn?.map(a => {
                return (
                  <TouchableOpacity
                  onPress={() => {
                        if (modal_Type != 'Company') {
                          data(pr => ({
                            ...pr,
                            yarn_rate : a.rate,
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
                          dispatch(GetYarnData());
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
                          setCompany_name(a.name);
                          setSelectedValueCompany(a.id);
                          setValue(false);
                          dispatch(GetCompanyData())
                        }
                      }}
                    style={{
                      flexDirection: 'row',
                      borderWidth: 0,
                      marginTop: '1%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: '#2D303D', width: '33%'}}>
                      {a.name}
                    </Text>
                    {modal_Type == 'Yarn' ? (
                      <Text style={{color: '#2D303D', width: '33%'}}>
                        ₹ {a.rate}
                      </Text>
                    ) : null}
                    <RadioButton
                      color="#E89E46"
                      uncheckedColor="#E89E46"
                      value={a.id}
                      status={
                        modal_Type == 'Company' ? selectedValueCompany===a.id ? 'checked'
                          : 'unchecked' : selectedValueYarn===a.id ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => {
                        if (modal_Type != 'Company') {
                          data(pr => ({
                            ...pr,
                            yarn_rate : a.rate,
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
                          dispatch(GetYarnData());
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
                          setCompany_name(a.name);
                          setSelectedValueCompany(a.id);
                          setValue(false);
                          dispatch(GetCompanyData())
                        }
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {OpenModal()}
        </View>
      </View>
    </Modal>
  );
};
export default All_Yarn_Modal;

const styles = StyleSheet.create({
  backgroundColor:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  SearchBAr:{
    borderWidth: 1,
    paddingLeft: '5%',
    height: height / 18,
    borderRadius: 15,
    marginTop: '5%',
    borderColor: 'rgba(45, 48, 61, 0.1)',
  }
});
