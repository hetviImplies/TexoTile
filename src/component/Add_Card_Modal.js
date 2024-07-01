import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Close from '../assets/svgs/Close';
import Down_arrow from '../assets/svgs/Down_arrow';
import Information_Input from './Information_Input';
import ButtonPress from './ButtonPress';
import DottedLine from './DottedLine';
import All_Yarn_Modal from './Select_CompanyYarn_Modal';
import Edit from '../assets/svgs/Edit';
const {height, width} = Dimensions.get('window');
import {DecimalNum} from '../assets/Regex/Regex';

const YarnModal = ({
  visible,
  editData,
  setClose,
  modal_T,
  setData,
  data,
  EditWarpData,
  EditWeftData,
  SetWidth,
  Width,
}) => {
  const [showYarnModal, setShowYarnModal] = useState(false);
  const [yarn_name, setYarn_name] = useState('Select Yarn name');
  const [yarn_Rate, setYarn_Rate] = useState();
  const [company_name, setCompany_name] = useState('Select Company name');
  const [modal_Type, setModal_Type] = useState();
  const [index, setIndex] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const [Warp_Data, setWarp_data] = useState({
    id: null,
    weight: '0.00',
    cost: '0.00',
    deniar: '',
    beam_ends: '',
    shortage: '',
    yarn_rate: '',
    tpm: Number(''),
    company: {
      id: null,
      name: '',
      is_deleted: null,
      created_at: '',
      updated_at: '',
    },
    yarn: {
      id: null,
      name: '',
      rate: '',
      is_deleted: null,
      created_at: '',
      updated_at: '',
    },
  });
  const [Weft_Data, setWeft_data] = useState({
    id: null,
    weight: '0.00',
    cost: '0.00',
    deniar: '',
    pick: '',
    width: '',
    wastage: '',
    yarn_rate: '',
    tpm: Number(''),
    company: {
      id: null,
      name: '',
      is_deleted: null,
      created_at: '',
      updated_at: '',
    },
    yarn: {
      id: null,
      name: '',
      rate: '',
      is_deleted: null,
      created_at: '',
      updated_at: '',
    },
  });

  useEffect(() => {
    if (modal_T === 'Weft') {
      const updatedWeftData = data.map(item => ({...item, width: Width}));
      setData(updatedWeftData);
    }
  }, [Width]);

  useEffect(() => {
    EraseData();
    if (modal_T == 'Warp') {
      setYarn_name(editData?.data?.yarn?.name);
      setCompany_name(editData?.data?.company?.name);
      setWarp_data(editData?.data);
      setIndex(editData?.index);
    } else {
      setYarn_name(editData?.data?.yarn?.name);
      setCompany_name(editData?.data?.company?.name);
      setWeft_data(editData?.data);
      setIndex(editData?.index);
    }
  }, [editData?.data, editData?.index]);

  useEffect(() => {
    if (editData == null) {
      EraseData();
    }
  }, [editData]);

  const Yarn_Modal = () => {
    return (
      <All_Yarn_Modal
      editData={editData}
        setYarn_name={setYarn_name}
        setCompany_name={setCompany_name}
        data={modal_T == 'Warp' ? setWarp_data : setWeft_data}
        yarn_type={modal_T}
        visible={showYarnModal}
        setValue={setShowYarnModal}
        modal_Type={modal_Type}
      />
    );
  };

  useEffect(() => {
    if (modal_T == 'Weft') {
      const newWidth = data[data.length - 1]?.width;
      const updatedWeftData = data.map(item => ({...item, width: newWidth}));
      setData(updatedWeftData);
      SetWidth(newWidth);
    }
  }, [Weft_Data]);

  const HandlePress = () => {
    if (Warp_Data.id != null || Weft_Data.id != null) {
      const isCreateData = data.find((a, i) => i == index);
      if (isCreateData != undefined) {
        if (modal_T == 'Warp') {
          const updatedData = data.map(item => {
            if (item.id === editData.data.id) {
              return {
                ...item,
                weight: Warp_Data.weight,
                cost: Warp_Data.cost,
                deniar: Number(Warp_Data.deniar).toFixed(2),
                beam_ends: Number(Warp_Data.beam_ends).toFixed(2),
                shortage: Number(Warp_Data.shortage).toFixed(2),
                yarn_rate: Number(Warp_Data.yarn_rate).toFixed(2),
                tpm: Number(Warp_Data.tpm),
                company: Warp_Data.company,
                yarn: Warp_Data.yarn,
              };
            }
            return item;
          });
          setData(updatedData);
        } else {
          const updatedData = data.map(item => {
            if (item.id === editData.data.id) {
              return {
                ...item,
                weight: Weft_Data.weight,
                cost: Weft_Data.cost,
                deniar: Weft_Data.deniar,
                pick: Weft_Data.pick,
                width: Weft_Data.width,
                wastage: Weft_Data.wastage,
                yarn_rate: Weft_Data.yarn_rate,
                tpm: Number(Weft_Data.tpm),
                company: Weft_Data.company,
                yarn: Weft_Data.yarn,
              };
            }
            item.width = Weft_Data.width;
            return item;
          });

          SetWidth(Weft_Data.width);
          setData(updatedData);
        }
      } else {
        let obj = {};
        if (modal_T == 'Warp') {
          obj = Warp_Data;
        } else {
          obj = Weft_Data;
        }
        setData([...data, obj]);
      }
      setClose(false);
      EraseData();
    } else {
      const isCreateData = data.find((a, i) => i == index);
      if (isCreateData != undefined) {
        if (modal_T == 'Warp') {
          const updatedData = data.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                weight: Warp_Data.weight,
                cost: Warp_Data.cost,
                deniar: Number(Warp_Data.deniar).toFixed(2),
                beam_ends: Warp_Data.beam_ends,
                shortage: Number(Warp_Data.shortage).toFixed(2),
                yarn_rate: Warp_Data.yarn_rate,
                tpm: Number(Warp_Data.tpm),
                company: Warp_Data.company,
                yarn: Warp_Data.yarn,
              };
            }
            return item;
          });
          setData(updatedData);
        } else {
          const updatedData = data.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                weight: Weft_Data.weight,
                cost: Weft_Data.cost,
                deniar: Weft_Data.deniar,
                pick: Weft_Data.pick,
                width: Weft_Data.width,
                wastage: Weft_Data.wastage,
                yarn_rate: Weft_Data.yarn_rate,
                tpm: Number(Weft_Data.tpm),
                company: Weft_Data.company,
                yarn: Weft_Data.yarn,
              };
            }
            item.width = Weft_Data.width;
            return item;
          });

          SetWidth(Weft_Data.width);
          setData(updatedData);
        }
      } else {
        let obj = {};
        if (modal_T == 'Warp') {
          obj = Warp_Data;
        } else {
          obj = Weft_Data;
        }
        setData([...data, obj]);
      }
    }
    setClose(false);
    EraseData();
  };
  useEffect(() => {
    if (modal_T == 'Warp') {
      if (
        Warp_Data.deniar != '' &&
        Warp_Data.beam_ends != '' &&
        Warp_Data.shortage != '' &&
        Warp_Data.yarn_rate != '' &&
        Warp_Data.company.name != '' &&
        Warp_Data.yarn.name != ''
      ) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    } else if (modal_T == 'Weft') {
      if (
        Weft_Data.deniar &&
        Weft_Data.pick &&
        Weft_Data.width &&
        Weft_Data.yarn_rate &&
        Weft_Data.wastage &&
        Weft_Data.yarn_rate &&
        Weft_Data.company.name != '' &&
        Weft_Data.yarn.name != ''
      ) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    }
    GetWeightAndCost();
  }, [
    Warp_Data.deniar,
    Warp_Data.yarn_rate,
    Weft_Data.yarn_rate,
    Warp_Data.beam_ends,
    Warp_Data.shortage,
    Warp_Data.yarn,
    Warp_Data.company,
    Weft_Data.deniar,
    Weft_Data.pick,
    Weft_Data.width,
    Weft_Data.yarn_rate,
    Weft_Data.wastage,
    Weft_Data.company,
    Weft_Data.yarn,
  ]);

  const GetWeightAndCost = () => {
    if (modal_T == 'Warp') {
      let value =
        parseFloat(Warp_Data.deniar) * parseFloat(Warp_Data.beam_ends);
      const weight =
        (((value * parseFloat(Warp_Data.shortage)) / 100 + value) / 9000000) *
        100;
      const cost =
        (((value * parseFloat(Warp_Data.shortage)) / 100 + value) / 9000000) *
        parseFloat(Warp_Data.yarn_rate);
      setWarp_data({
        ...Warp_Data,
        weight: isNaN(weight.toFixed(2)) ? '0.00' : weight.toFixed(2),
        cost: isNaN(cost.toFixed(2)) ? '0.00' : cost.toFixed(2),
      });
    } else {
      let value =
        parseFloat(Weft_Data.deniar) *
        parseFloat(Weft_Data.pick) *
        parseFloat(Weft_Data.width);
      const weight =
        (((value * parseFloat(Weft_Data.wastage)) / 100 + value) / 9000000) *
        100;
      const cost =
        (((value * parseFloat(Weft_Data.wastage)) / 100 + value) / 9000000) *
        parseFloat(Weft_Data.yarn_rate);
      const finalWeight = isNaN(weight) ? '0.00' : weight.toFixed(2);
      const finalCost = isNaN(cost) ? '0.00' : cost.toFixed(2);
      setWeft_data({
        ...Weft_Data,
        weight: finalWeight,
        cost: finalCost,
      });
    }
  };
  const EraseData = () => {
    setYarn_name('Select Yarn name');
    setCompany_name('Select Company name');
    setIndex(null);
    setIsDisable(true);
    setWarp_data({
      id: null,
      weight: '0.00',
      cost: '0.00',
      deniar: '',
      beam_ends: '',
      shortage: '',
      yarn_rate: '',
      tpm: '',
      company: {
        id: null,
        name: '',
        is_deleted: null,
        created_at: '',
        updated_at: '',
      },
      yarn: {
        id: null,
        name: '',
        rate: '',
        is_deleted: null,
        created_at: '',
        updated_at: '',
      },
    });
    setWeft_data({
      id: null,
      weight: '0.00',
      cost: '0.00',
      deniar: '',
      pick: '',
      width: '',
      wastage: '',
      yarn_rate: '',
      tpm: '',
      company: {
        id: null,
        name: '',
        is_deleted: null,
        created_at: '',
        updated_at: '',
      },
      yarn: {
        id: null,
        name: '',
        rate: '',
        is_deleted: null,
        created_at: '',
        updated_at: '',
      },
    });
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            width: width,
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 1,
              padding:"3%"
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 0,
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                {modal_T}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  borderWidth: 0,
                  justifyContent: 'center',
                }}>
                <Text>W : </Text>
                <Text numberOfLines={2}  style={{color: 'rgba(45, 48, 61, 1)',flexWrap:"wrap",borderWidth:0,maxWidth:"28%"}}>
                  {modal_T == 'Warp' ? Warp_Data.weight : Weft_Data.weight}
                </Text>
                <View style={{borderWidth: 0.7, marginHorizontal: '6%'}}></View>
                <Text>C : </Text>
                <Text style={{color: 'rgba(45, 48, 61, 1)',flexWrap:"wrap",borderWidth:0,maxWidth:"28%"}}>
                  {modal_T == 'Warp' ? Warp_Data.cost : Weft_Data.cost}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  EditWeftData(null);
                  EditWarpData(null);
                  setClose(false);
                  EraseData();
                }}>
                <Close color="#292D32" />
              </TouchableOpacity>
            </View>
            <DottedLine margin={{marginTop: '3%', marginBottom: '3%'}} />
            <Text style={{color: 'black', fontSize: 15, marginLeft: '2%'}}>
              Yarn name
            </Text>

            <TouchableOpacity
              onPress={() => {
                setShowYarnModal(true);
                setModal_Type('Yarn');
              }}
              style={{
                borderWidth: 1,
                borderColor: 'rgba(45, 48, 61, 0.1)',
                height: height / 18,
                borderRadius: 15,
                marginVertical: '2%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginHorizontal: '3%',
                }}>
                <Text>{yarn_name}</Text>
                <Down_arrow />
              </View>
            </TouchableOpacity>

            <Text style={{color: 'black', fontSize: 15, marginLeft: '2%'}}>
              Company name
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowYarnModal(true);
                setModal_Type('Company');
              }}
              style={{
                borderWidth: 1,
                borderColor: 'rgba(45, 48, 61, 0.1)',
                height: height / 18,
                borderRadius: 15,
                marginTop:"2%",
                justifyContent: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginHorizontal: '3%',
                }}>
                <Text>{company_name}</Text>
                <Down_arrow />
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                borderWidth: 0,
                alignItems: 'center',
                marginTop: '3%',
              }}>
              <Information_Input
                style={styles.Information_Input}
                lable={'Deniar'}
                value={
                  modal_T == 'Warp'
                    ? isNaN(parseFloat(Warp_Data.deniar))
                      ? ''
                      : Warp_Data.deniar
                    : isNaN(parseFloat(Weft_Data.deniar))
                    ? ''
                    : Weft_Data.deniar
                }
                setValue={
                  modal_T == 'Warp'
                    ? text => {
                        if (text === '' || DecimalNum.test(text)) {
                          setWarp_data({
                            ...Warp_Data,
                            deniar: text,
                          });
                        }
                      }
                    : text => {
                        if (text === '' || DecimalNum.test(text)) {
                          setWeft_data({
                            ...Weft_Data,
                            deniar: text,
                          });
                        }
                      }
                }
              />
              <Information_Input
                style={styles.Information_Input}
                lable={modal_T == 'Warp' ? 'Ends' : 'Pick'}
                value={
                  modal_T == 'Warp'
                    ? isNaN(parseFloat(Warp_Data.beam_ends))
                      ? ''
                      : Warp_Data.beam_ends.toString()
                    : isNaN(parseFloat(Weft_Data.pick))
                    ? ''
                    : Weft_Data.pick
                }
                setValue={
                  modal_T == 'Warp'
                    ? text => {
                        if (text === '' || DecimalNum.test(text)) {
                          setWarp_data({
                            ...Warp_Data,
                            beam_ends: text,
                          });
                        }
                      }
                    : text => {
                        if (text === '' || DecimalNum.test(text))
                          setWeft_data({
                            ...Weft_Data,
                            pick: text,
                          });
                      }
                }
              />
              <Information_Input
                style={styles.Information_Input}
                lable={modal_T == 'Warp' ? 'Shortage' : 'Width'}
                value={
                  modal_T == 'Warp'
                    ? isNaN(parseFloat(Warp_Data.shortage))
                      ? ''
                      : Warp_Data.shortage
                    : isNaN(parseFloat(Weft_Data.width))
                    ? ''
                    : Weft_Data.width
                }
                setValue={
                  modal_T == 'Warp'
                    ? text => {
                        if (text === '' || DecimalNum.test(text))
                          setWarp_data({
                            ...Warp_Data,
                            shortage: text,
                          });
                      }
                    : text => {
                        if (text === '' || DecimalNum.test(text))
                          setWeft_data({
                            ...Weft_Data,
                            width: text,
                          });
                      }
                }
              />
              <Information_Input
                style={styles.Information_Input}
                lable={'Y.Rate'}
                value={
                  modal_T == 'Warp'
                  ? isNaN(parseFloat(Warp_Data.yarn_rate))
                      ? ''
                      : Warp_Data.yarn_rate
                    : isNaN(parseFloat(Weft_Data.yarn_rate))
                    ? ''
                    : Weft_Data.yarn_rate
                }
                setValue={
                  modal_T == 'Warp'
                    ? text => {
                        if (text === '' || DecimalNum.test(text))
                          setWarp_data({
                            ...Warp_Data,
                            yarn_rate: text,
                          });
                      }
                    : text => {
                        if (text === '' || DecimalNum.test(text))
                          setWeft_data({
                            ...Weft_Data,
                            yarn_rate: text,
                          });
                      }
                }
              />
              {modal_T == 'Weft' ? (
                <Information_Input
                  style={styles.Information_Input}
                  lable={'Wastage'}
                  value={
                    isNaN(parseFloat(Weft_Data.wastage))
                      ? ''
                      : Weft_Data.wastage
                  }
                  setValue={text => {
                    if (text === '' || DecimalNum.test(text))
                      setWeft_data({
                        ...Weft_Data,
                        wastage: text,
                      });
                  }}
                />
              ) : null}
              <Information_Input
                style={styles.Information_Input}
                lable={'TPM'}
                value={
                  modal_T == 'Warp'
                    ? isNaN(parseFloat(Warp_Data.tpm))
                      ? ''
                      : Warp_Data.tpm == '0.00'
                      ? 0
                      : Warp_Data.tpm.toString().includes('.')
                      ? Warp_Data.tpm.toString()
                      : Warp_Data.tpm.toString()
                    : isNaN(parseFloat(Weft_Data.tpm))
                    ? ''
                    : Weft_Data.tpm == '0.00'
                    ? 0
                    : Weft_Data.tpm.toString().includes('.')
                    ? Weft_Data.tpm.toString()
                    : Weft_Data.tpm.toString()
                }
                setValue={
                  modal_T == 'Warp'
                    ? text => {
                        if (text === '' || DecimalNum.test(text)) {
                          setWarp_data({
                            ...Warp_Data,
                            tpm: text,
                          });
                        }
                      }
                    : text => {
                        if (text === '' || DecimalNum.test(text)) {
                          setWeft_data({
                            ...Weft_Data,
                            tpm: text,
                          });
                        }
                      }
                }
              />
            </View>

            <TouchableOpacity
              onPress={HandlePress}
              disabled={isDisable}
              style={{
                borderWidth: 0,
                marginTop: '5%',
                height: height / 15,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDisable
                  ? 'rgba(232, 158, 70, 0.6)'
                  : 'rgba(232, 158, 70, 1)',
              }}>
              <Text style={{color: 'white'}}>Done</Text>
            </TouchableOpacity>
            {Yarn_Modal()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default YarnModal;

const styles = StyleSheet.create({
  Information_Input : {
    marginHorizontal: width/35
  }
});
