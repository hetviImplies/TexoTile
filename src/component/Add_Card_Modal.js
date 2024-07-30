import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Information_Input from './Information_Input';
import DottedLine from './DottedLine';
import All_Yarn_Modal from './Select_CompanyYarn_Modal';
const {height, width} = Dimensions.get('window');
import {styleText} from '../assets/fonts/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {GetCompanyData, GetYarnData} from '../Slice/YarnSlice';
import {Close_Black, Down_Arrow} from '../assets/svgs/svg';
import {
  Black,
  Border_Color,
  TextInput_Border_Color,
  Transparent,
  White,
  Yellow,
} from '../Global_Com/color';
import {DecimalNum, OnlyNum} from '../Utils/Regex';
import {wp} from '../Global_Com/responsiveScreen';

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
  setEditWarpData,
  setEditWeftData,
}) => {
  const [showYarnModal, setShowYarnModal] = useState(false);
  const [yarn_name, setYarn_name] = useState('Select Yarn name');
  const [yarn_Rate, setYarn_Rate] = useState();
  const [company_name, setCompany_name] = useState('Select Company name');
  const [modal_Type, setModal_Type] = useState();
  const [index, setIndex] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const dispatch = useDispatch();
  let input1 = useRef(null);
  let input2 = useRef(null);
  let input3 = useRef(null);
  let input4 = useRef(null);
  let input5 = useRef(null);
  let input6 = useRef(null);

  const [Warp_Data, setWarp_data] = useState({
    id: null,
    weight: '00.00',
    cost: '00.00',
    deniar: '',
    beam_ends: '',
    shortage: '',
    yarn_rate: '',
    tpm: Number('0'),
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
    weight: '00.00',
    cost: '00.00',
    deniar: '',
    pick: '',
    width: '',
    wastage: '',
    yarn_rate: '',
    tpm: Number('0'),
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

  const DataCreate = () => {
    let obj = {};
        if (modal_T == 'Warp') {
          obj = Warp_Data;
        } else {
          obj = Weft_Data;
        }
        setData([...data, obj]);
  };

  useEffect(() => {
    if (modal_T === 'Weft') {
      const newWidth = data[data.length - 1]?.width;
      const updatedWeftData = data.map(item => ({...item, width: newWidth}));
      setData(updatedWeftData);
      SetWidth(newWidth);
    }
  }, [Weft_Data.width]);

  const HandlePress = () => {
    if (Warp_Data.id != null || Weft_Data.id != null) {
      const isCreateData = data.find((a, i) => i == index);
      if (isCreateData != undefined) {
          const updatedData = data.map(item => {
            if (item.id === editData.data.id) {
              return {
                ...item,
                weight: modal_T == 'Warp' ? Warp_Data.weight : Weft_Data.weight,
                cost: modal_T == 'Warp' ? Warp_Data.cost : Weft_Data.cost,
                deniar : modal_T == 'Warp' ? Number(Warp_Data.deniar).toFixed(2) : Weft_Data.deniar,
                ...(modal_T == 'Warp' ? { beam_ends:  Number(Warp_Data.beam_ends).toFixed(0) } : null),
                ...(modal_T == 'Warp' ? { shortage:  Number(Warp_Data.shortage).toFixed(2) } : null),
                ...(modal_T == 'Warp' ? null : { pick:  Weft_Data.pick }),
                ...(modal_T == 'Warp' ? null : { width:  Weft_Data.width }),
                ...(modal_T == 'Warp' ? null : { wastage:  Weft_Data.wastage }),
                yarn_rate : modal_T == 'Warp' ? Number(Warp_Data.yarn_rate).toFixed(2) : Weft_Data.yarn_rate,
                tpm: modal_T == 'Warp' ? Number(Warp_Data.tpm) === '' ? 0 : Number(Warp_Data.tpm) : Number(Weft_Data.tpm) === '' ? 0 : Number(Weft_Data.tpm),
                company: modal_T == 'Warp' ? Warp_Data.company : Weft_Data.company,
                yarn: modal_T == 'Warp' ? Warp_Data.yarn : Weft_Data.yarn,
              };
            }
            return item;
          });
          setData(updatedData);
      } else {
        DataCreate()
      }
    } else {
      const isCreateData = data.find((a, i) => i == index);
      if (isCreateData != undefined) {
          const updatedData = data.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                weight: modal_T == 'Warp' ? Warp_Data.weight : Weft_Data.weight,
                cost: modal_T == 'Warp' ? Warp_Data.cost : Weft_Data.cost,
                deniar : modal_T == 'Warp' ? Number(Warp_Data.deniar).toFixed(2) : Weft_Data.deniar,
                ...(modal_T == 'Warp' ? { beam_ends:  Number(Warp_Data.beam_ends).toFixed(0) } : null),
                ...(modal_T == 'Warp' ? { shortage:  Number(Warp_Data.shortage).toFixed(2) } : null),
                ...(modal_T == 'Warp' ? null : { pick:  Weft_Data.pick }),
                ...(modal_T == 'Warp' ? null : { width:  Weft_Data.width }),
                ...(modal_T == 'Warp' ? null : { wastage:  Weft_Data.wastage }),
                yarn_rate : modal_T == 'Warp' ? Number(Warp_Data.yarn_rate).toFixed(2) : Weft_Data.yarn_rate,
                tpm: modal_T == 'Warp' ? Number(Warp_Data.tpm) === '' ? 0 : Number(Warp_Data.tpm) : Number(Weft_Data.tpm) === '' ? 0 : Number(Weft_Data.tpm),
                company: modal_T == 'Warp' ? Warp_Data.company : Weft_Data.company,
                yarn: modal_T == 'Warp' ? Warp_Data.yarn : Weft_Data.yarn,
              };
            }
            return item;
          });
          setData(updatedData);
      } else {
        DataCreate()
      }
    }
    setClose(false);
    EraseData();
    setEditWarpData(null);
    setEditWeftData(null);
  };

  useEffect(() => {
    Weft_Data_Input();
  }, [
    Weft_Data.yarn_rate,
    Weft_Data.deniar,
    Weft_Data.pick,
    Weft_Data.width,
    Weft_Data.yarn_rate,
    Weft_Data.wastage,
    Weft_Data.company,
    Weft_Data.yarn,
  ]);

  const Weft_Data_Input = () => {
    if (
      Weft_Data.deniar &&
      Weft_Data.pick &&
      Weft_Data.width &&
      Weft_Data.yarn_rate &&
      Weft_Data.wastage &&
      Weft_Data.company.name != '' &&
      Weft_Data.yarn.name != ''
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  useEffect(() => {
    Weft_GetWeightAndCost();
  }, [
    Weft_Data.deniar &&
      Weft_Data.pick &&
      Weft_Data.width &&
      Weft_Data.yarn_rate &&
      Weft_Data.wastage,
  ]);

  const Weft_GetWeightAndCost = () => {
    let value =
      parseFloat(Weft_Data.deniar) *
      parseFloat(Weft_Data.pick) *
      parseFloat(Weft_Data.width);
    const weight =
      (((value * parseFloat(Weft_Data.wastage)) / 100 + value) / 9000000) * 100;
    const cost =
      (((value * parseFloat(Weft_Data.wastage)) / 100 + value) / 9000000) *
      parseFloat(Weft_Data.yarn_rate);
    const finalWeight = isNaN(weight) ? '00.00' : weight.toFixed(2);
    const finalCost = isNaN(cost) ? '00.00' : cost.toFixed(2);
    setWeft_data({
      ...Weft_Data,
      weight: finalWeight,
      cost: finalCost,
    });
  };

  useEffect(() => {
    Warp_Data_Input();
  }, [
    Warp_Data.deniar,
    Warp_Data.yarn_rate,
    Warp_Data.beam_ends,
    Warp_Data.shortage,
    Warp_Data.yarn,
    Warp_Data.company,
  ]);

  const Warp_Data_Input = () => {
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
  };

  useEffect(() => {
    Warp_GetWeightAndCost();
  }, [
    Warp_Data.deniar,
    Warp_Data.yarn_rate,
    Warp_Data.beam_ends,
    Warp_Data.shortage,
  ]);

  const Warp_GetWeightAndCost = () => {
    let value = parseFloat(Warp_Data.deniar) * parseFloat(Warp_Data.beam_ends);
    const weight =
      (((value * parseFloat(Warp_Data.shortage)) / 100 + value) / 9000000) *
      100;
    const cost =
      (((value * parseFloat(Warp_Data.shortage)) / 100 + value) / 9000000) *
      parseFloat(Warp_Data.yarn_rate);
    setWarp_data({
      ...Warp_Data,
      weight: isNaN(weight.toFixed(2)) ? '00.00' : weight.toFixed(2),
      cost: isNaN(cost.toFixed(2)) ? '00.00' : cost.toFixed(2),
    });
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
    setWeft_data({
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
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: Transparent,
        }}>
        <View
          style={{
            width: width,
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: White,
            alignItems: 'center',
          }}>
          <View
            style={{
              borderWidth: 0,
              padding: '3%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 0,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: Black,
                  fontSize: 16,
                  ...styleText.bold,
                  marginLeft: '3%',
                }}>
                {modal_T}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  borderWidth: 0,
                  justifyContent: 'center',
                }}>
                <Text style={{...styleText.semiBold, fontSize: 15}}>W : </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    color: Black,
                    flexWrap: 'wrap',
                    borderWidth: 0,
                    maxWidth: width / 5,
                    ...styleText.semiBold,
                    fontSize: 15,
                  }}>
                  {modal_T == 'Warp' ? Warp_Data.weight : Weft_Data.weight}
                </Text>
                <View
                  style={{borderRightWidth: 1, marginHorizontal: '6%'}}></View>
                <Text style={{...styleText.semiBold, fontSize: 15}}>C : </Text>
                <Text
                  style={{
                    color: Black,
                    flexWrap: 'wrap',
                    borderWidth: 0,
                    maxWidth: width / 5,
                    ...styleText.semiBold,
                    fontSize: 15,
                  }}>
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
                <Close_Black height={25} width={25} />
              </TouchableOpacity>
            </View>
            <DottedLine margin={{marginTop: '3%', marginBottom: '3%'}} />
            <Text
              style={{
                color: Black,
                fontSize: 15,
                marginLeft: '2%',
                ...styleText.medium,
              }}>
              Yarn name
            </Text>

            <TouchableOpacity
              onPress={() => {
                setShowYarnModal(true);
                setModal_Type('Yarn');
                dispatch(GetYarnData());
              }}
              style={{
                borderWidth: 1,
                borderColor: TextInput_Border_Color,
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
                <Text style={{...styleText.medium, width: wp(80)}}>
                  {yarn_name}
                </Text>
                <Down_Arrow />
              </View>
            </TouchableOpacity>

            <Text
              style={{
                color: Black,
                fontSize: 15,
                marginLeft: '2%',
                ...styleText.medium,
              }}>
              Company name
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowYarnModal(true);
                setModal_Type('Company');
                dispatch(GetCompanyData());
              }}
              style={{
                borderWidth: 1,
                borderColor: TextInput_Border_Color,
                height: height / 18,
                borderRadius: 15,
                marginTop: '2%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginHorizontal: '3%',
                }}>
                <Text style={{...styleText.medium, width: wp(80)}}>
                  {company_name}
                </Text>
                <Down_Arrow />
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
                keyboardType={'number-pad'}
                func={i => (input1 = i)}
                onSubmitEditing={() => input2.focus()}
                returnKeyType="next"
                returnKeyLabel="next"
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
                keyboardType={'number-pad'}
                func={i => (input2 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => input3.focus()}
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
                          let t = text.replace(OnlyNum, '');
                          setWarp_data({
                            ...Warp_Data,
                            beam_ends: t,
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
                keyboardType={'number-pad'}
                func={i => (input3 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => input4.focus()}
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
                keyboardType={'number-pad'}
                func={i => (input4 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => {
                  if (modal_T === 'Weft') {
                    input5.focus();
                  } else {
                    input6.focus();
                  }
                }}
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
                  keyboardType={'number-pad'}
                  func={i => (input5 = i)}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => input6.focus()}
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
                keyboardType={'number-pad'}
                func={i => (input6 = i)}
                returnKeyType="done"
                returnKeyLabel="done"
                onSubmitEditing={() => console.log('done')}
                style={styles.Information_Input}
                lable={'TPM'}
                value={
                  modal_T === 'Warp'
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
                  modal_T === 'Warp'
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
                opacity: isDisable ? 0.5 : 1,
                justifyContent: 'center',
                backgroundColor: Yellow,
              }}>
              <Text style={{color: White, fontSize: 18, ...styleText.bold}}>
                Done
              </Text>
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
  Information_Input: {
    marginHorizontal: wp(2.8),
  },
});
