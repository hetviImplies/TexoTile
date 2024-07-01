import {
  Button,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import LeftArrow from '../assets/svgs/LeftArrow';
import {RadioButton, TextInput} from 'react-native-paper';
import Save from '../assets/svgs/Save';

import Tag from '../component/Tag';
import Production_Input from '../component/Production_Input';
import Information_Input from '../component/Information_Input';
import Photos from '../component/Photos';
import YarnModal from '../component/Add_Card_Modal';
import DottedLine from '../component/DottedLine';
import {useDispatch} from 'react-redux';
import {
  CreateQualityData,
  GetQualityData,
  UpdateQualityData,
} from '../Slice/QualitySlice';
import BackModal_Detail from '../component/Back_CardView_Modal';
import {OnlyNum, RemoveZero, Validation} from '../assets/Regex/Regex';
import CardView from '../component/CardView';
import Toast from '../../Toast';
import FlashMessage from 'react-native-flash-message';
import {styleText} from '../assets/fonts/Fonts';
const {height, width} = Dimensions.get('window');
const QualityDetail = props => {
  const {data} = props.route.params;
  const [qualityName, setQualityName] = useState('');
  const [value, setValue] = useState('first');
  const [ExpenseCost, setExpenseCost] = useState(0);
  const [Expense_Cost, setExpense_Cost] = useState(0);
  const [RPM, setRPM] = useState(0);
  const [total_Efficiency, setTotal_Efficiency] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [machine, setMachine] = useState('1');
  const [labour, setLabour] = useState(0);
  const [reed, setReed] = useState('');
  const [border, setBorder] = useState('');
  const [Width, setWidth] = useState(0);
  const [nozzle, setNozzle] = useState('');
  const [pasramani, setPasramani] = useState('');
  const [steam_warp, setSteam_warp] = useState('');
  const [steam_weft, setSteam_weft] = useState('');
  const [lattice, setLattice] = useState('');
  const [gsm, setGsm] = useState('');
  const [warpShow, setWarpShow] = useState(false);
  const [weftShow, setWeftShow] = useState(false);
  const [editWarpData, setEditWarpData] = useState();
  const [editWeftData, setEditWeftData] = useState();
  const [warp_data, setWarp_Data] = useState([]);
  const [weft_data, setWeft_Data] = useState([]);
  const [modal_Type, setModal_Type] = useState();

  const [quality_cost, setQuality_Cost] = useState();
  const [quality_weight, setQuality_Weight] = useState();
  const [Warp_Cost, setWarp_Cost] = useState(0);
  const [Weft_Cost, setWeft_Cost] = useState(0);
  const [Warp_Weight, setWarp_Weight] = useState(0);
  const [Weft_Weight, setWeft_Weight] = useState(0);
  const [total_beam_ends, setTotal_beam_ends] = useState(0);
  const [total_Pick, setTotal_Pick] = useState(0);
  const [total_width, setTotal_width] = useState(0);
  const [final_Warp_Data, setFinal_Warp_Data] = useState([]);
  const [final_Weft_Data, setFinal_Weft_Data] = useState([]);
  const [isSave, setSave] = useState(false);
  const [BackModal_Visible, setBackModal_Visible] = useState(false);
  const toastRef = useRef(null);
  const dispatch = useDispatch();

  const BackModal = () => {
    return (
      <BackModal_Detail
        visible={BackModal_Visible}
        setVisible={setBackModal_Visible}
        func={() => {
          setBackModal_Visible(false);
          return props.navigation.goBack();
        }}
      />
    );
  };

  useEffect(() => {
    let total =
      RPM > 0 && total_Pick > 0 && efficiency > 0
        ? (((RPM / total_Pick / 39.37) * efficiency) / 100) * 1440 * machine
        : 0;
    setTotal_Efficiency(total.toFixed(2));
  }, [RPM, efficiency, machine, total_Pick]);

  useEffect(() => {
    setLabour(ExpenseCost * total_Efficiency);
  }, [total_Efficiency, ExpenseCost, Expense_Cost, value]);

  useEffect(() => {
    if (data != 100) {
      setQualityName(data.name);
      setWarp_Data(data.warp_data);
      setWeft_Data(data.weft_data);
      if (data.expense_type == 'Per Pick') {
        setValue('second');
        setExpense_Cost(data.cost);
      } else {
        setExpense_Cost(data.expense_cost);
      }
      setRPM(data.rpm);
      setEfficiency(data.efficiency);
      setMachine(data.machine);
      setReed(data.reed);
      setWidth(data.panno);
      setBorder(data.border);
      setNozzle(data.nozzle);
      setLattice(data.letis);
      setPasramani(data.pasramani);
      setLattice(data.letis);
      setSteam_warp(data.steam_warp);
      setSteam_weft(data.steam_weft);
      setGsm(data.gsm);
    }
  }, [data]);

  useEffect(() => {
    const updatedFinalWarpData = warp_data.map(item => {
      const {company, yarn, id, ...rest} = item;
      const Company_Id = company.id;
      const Yarn_Id = yarn.id;
      const newItem = {
        ...rest,
        company: Company_Id,
        yarn: Yarn_Id,
      };
      return newItem;
    });
    setFinal_Warp_Data(updatedFinalWarpData);
  }, [warp_data]);

  useEffect(() => {
    const updatedFinalWeftData = weft_data?.map(item => {
      const {company, yarn, id, ...rest} = item;
      const Company_Id = company.id;
      const Yarn_Id = yarn.id;
      const newItem = {
        ...rest,
        company: Company_Id,
        yarn: Yarn_Id,
      };
      return newItem;
    });
    setFinal_Weft_Data(updatedFinalWeftData);
  }, [weft_data]);

  useEffect(() => {
    setQuality_Cost(
      (
        parseFloat(Warp_Cost) +
        parseFloat(Weft_Cost) +
        parseFloat(ExpenseCost)
      ).toFixed(2),
    );
  }, [Warp_Cost, Weft_Cost, ExpenseCost]);

  useEffect(() => {
    setQuality_Weight(
      (parseFloat(Warp_Weight) + parseFloat(Weft_Weight)).toFixed(2),
    );
  }, [Warp_Weight, Weft_Weight]);
  const QualityData = {
    name: qualityName,
    weight: quality_weight,
    quality_cost: quality_cost,
    total_beam_ends: total_beam_ends.toFixed(2).toString(),
    total_pick: total_Pick.toFixed(2),
    total_width: total_width?.toFixed(2),
    total_warp_weight: Warp_Weight.toFixed(2),
    total_warp_cost: Warp_Cost.toFixed(2),
    warp_data: final_Warp_Data,
    total_weft_weight: Weft_Weight.toString(),
    total_weft_cost: Weft_Cost.toString(),
    weft_data: final_Weft_Data,
    expense_type: value == 'first' ? 'Fixed Cost' : 'Per Pick',
    cost: value == 'first' ? '0.00' : Expense_Cost,
    expense_cost: ExpenseCost.toString(),
    total_efficiency: parseFloat(total_Efficiency).toFixed(2),
    rpm: RPM,
    efficiency: parseFloat(efficiency).toFixed(2),
    machine: machine.toString(),
    panno: parseFloat(Width).toFixed(2),
    reed: reed,
    letis: lattice,
    border: border,
    nozzle: nozzle,
    pasramani: pasramani,
    steam_weft: steam_weft,
    steam_warp: steam_warp,
    gsm: gsm,
    pasramani_pattern:
      'https://res.cloudinary.com/dw0gmxhpd/image/upload/v1718174150/quality_images/puxjjvvoiyao1vvgtr3b.jpg',
    sample:
      'https://res.cloudinary.com/dw0gmxhpd/image/upload/v1718174026/quality_images/shvtxcjorgmxzpkx0ly7.jpg',
    pick_pattern:
      'https://res.cloudinary.com/dw0gmxhpd/image/upload/v1718172718/quality_images/myvrqhfncchtyexihwxe.pdf',
    latis_pattern:
      'https://res.cloudinary.com/dw0gmxhpd/image/upload/v1718172718/quality_images/myvrqhfncchtyexihwxe.pdf',
  };

  useEffect(() => {
    if (value == 'first') {
      setExpenseCost(Expense_Cost);
    } else {
      setExpenseCost((Expense_Cost * total_Pick).toFixed(0));
    }
  }, [value, Expense_Cost, ExpenseCost]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: '15%'}} onPress={HandleSave}>
          <Save />
        </TouchableOpacity>
      ),
      headerLeft: ({onPress}) => (
        <TouchableOpacity
          onPress={() => setBackModal_Visible(true)}
          style={{
            borderWidth: 0,
            alignItems: 'center',
            paddingTop: '5%',
            justifyContent: 'center',
            paddingLeft: '10%',
          }}>
          <LeftArrow color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, QualityData]);
  const WarpModal = () => {
    return (
      <YarnModal
        visible={warpShow}
        setClose={setWarpShow}
        modal_T={'Warp'}
        setData={setWarp_Data}
        data={warp_data}
        editData={editWarpData}
        EditWarpData={setEditWarpData}
        EditWeftData={setEditWeftData}
      />
    );
  };

  const WeftModal = () => {
    return (
      <YarnModal
        visible={weftShow}
        setClose={setWeftShow}
        modal_T={'Weft'}
        setData={setWeft_Data}
        data={weft_data}
        editData={editWeftData}
        EditWarpData={setEditWarpData}
        EditWeftData={setEditWeftData}
        Width={Width}
        SetWidth={setWidth}
      />
    );
  };
  const HandleSave = () => {
    setSave(true);

    if (
      QualityData.name != '' &&
      warp_data.length > 0 &&
      weft_data.length > 0
    ) {
      if (data == 100) {
        setSave(false);
        dispatch(CreateQualityData(JSON.stringify(QualityData))).then(a => {
          if (a.meta.requestStatus == 'fulfilled') {
            dispatch(GetQualityData());
            return props.navigation.navigate('Tabs');
          } else {
            console.log('non save');
          }
        });
      } else {
        setSave(false);
        dispatch(
          UpdateQualityData({data: QualityData, id: data.id, toastRef}),
        ).then(a => {
          console.log(a.message, '===========update============a');
          if (a.error) {
            handleError(a.message);
          } else {
            dispatch(GetQualityData());
            return props.navigation.navigate('Tabs');
          }
        });
      }
    }
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
  return (
    <View>
      <FlashMessage ref={toastRef} />
      <View style={{paddingBottom: '3%'}}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: '4%',
            justifyContent: 'space-between',
            borderWidth: 0,
            paddingHorizontal: '3%',
          }}>
          <Tag title="Weight" value={quality_weight} tag="Kg" />
          <Tag title="Cost" value={quality_cost} tag="₹" />
        </View>

        <TextInput
          dense
          mode="outlined"
          label="Qaulity Name"
          selectionColor="#E89E46"
          value={qualityName}
          outlineColor="grey"
          editable
          activeOutlineColor="#E89E46"
          outlineStyle={{borderRadius: 15, height: height / 19}}
          style={{
            width: width / 1.07,
            alignSelf: 'center',
          }}
          onChangeText={e => setQualityName(e)}
        />

        {isSave ? (
          qualityName == '' ? (
            <Text
              style={styles.warn_text}>
              Quality Name is required.
            </Text>
          ) : null
        ) : null}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '35%'}}>
        {WarpModal()}

        <View
          style={{
            borderWidth: 0,
            paddingBottom: '2.5%',
            borderRadius: 10,
            marginHorizontal: '3%',
            backgroundColor: 'white',
            shadowColor: '#000',
            backgroundColor: 'white',
            shadowOffset: {width: 1, height: 0},
            shadowOpacity: 0.9,
            shadowRadius: 1,
            elevation: 5,
            justifyContent: 'center',
          }}>
          <CardView
            setTotal_beam_ends={setTotal_beam_ends}
            setWeft_Weight={setWeft_Weight}
            Weft_Weight={Weft_Weight}
            setWarp_Weight={setWarp_Weight}
            Warp_Weight={Warp_Weight}
            Weft_Cost={Weft_Cost}
            setWeft_Cost={setWeft_Cost}
            Warp_Cost={Warp_Cost}
            setWarp_Cost={setWarp_Cost}
            setVisible={setWarpShow}
            data={warp_data}
            setData={setWarp_Data}
            modal_type={'Warp'}
            from={'Detail'}
            style={{marginHorizontal: '3%', paddingRight: '9%'}}
            func={() => {
              setWarpShow(true);
            }}
            setModal_Type={setModal_Type}
            setEditWarpData={setEditWarpData}
          />
        </View>
        {isSave ? (
          warp_data.length == 0 ? (
            <Text style={styles.warn_text}>warp_data is required.</Text>
          ) : null
        ) : null}

        <View style={styles.main_view}>
          <CardView
            Width={Width}
            SetWidth={setWidth}
            setTotal_width={setTotal_width}
            setTotal_Pick={setTotal_Pick}
            setWeft_Weight={setWeft_Weight}
            Weft_Weight={Weft_Weight}
            setWarp_Weight={setWarp_Weight}
            Warp_Weight={Warp_Weight}
            Weft_Cost={Weft_Cost}
            setWeft_Cost={setWeft_Cost}
            Warp_Cost={Warp_Cost}
            setWarp_Cost={setWarp_Cost}
            setVisible={setWeftShow}
            data={weft_data}
            setData={setWeft_Data}
            modal_type={'Weft'}
            from={'Detail'}
            style={{marginHorizontal: '3%', paddingRight: '9%'}}
            func={() => {
              setWeftShow(true);
              setModal_Type('Weft');
            }}
            setModal_Type={setModal_Type}
            setEditWeftData={setEditWeftData}
          />
        </View>

        {WeftModal()}
        {isSave ? (
          weft_data.length == 0 ? (
            <Text style={styles.warn_text}>weft_data is required.</Text>
          ) : null
        ) : null}

        {/* Expense */}
        <View
          style={[
            {
              marginHorizontal: '3%',
              marginTop: '3%',
              borderRadius: 10,
              backgroundColor: 'white',
              paddingBottom:"3%"
            },
            styles.shadow,
          ]}>
          {/* first three element */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '3%',
            }}>
            <Text style={styles.text}>Expense</Text>
            <RadioButton.Group
              onValueChange={newValue => setValue(newValue)}
              value={value}>
              <View style={{flexDirection: 'row', borderWidth: 0,maxWidth:width/1,flexWrap:"wrap"}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: width / 6,
                  }}>
                  <RadioButton
                    value="first"
                    color="#E89E46"
                    uncheckedColor="#E89E46"
                  />
                  <Text style={styles.text}>Fixed Cost</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: width / 12,
                  }}>
                  <RadioButton
                    value="second"
                    color="#E89E46"
                    uncheckedColor="#E89E46"
                  />
                  <Text style={styles.text}>Per Pick</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <DottedLine />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '2%',
            }}>
            <TextInput
              mode="outlined"
              label="Cost"
              keyboardType="phone-pad"
              selectionColor="#E89E46"
              value={Expense_Cost.toString()}
              numberOfLines={1}
              dense
              outlineColor="rgba(45, 48, 61, 0.1)"
              activeOutlineColor="#E89E46"
              outlineStyle={{
                borderRadius: 20,
                backgroundColor: 'white',
                height: height / 20,
                width: width / 4,
                borderWidth: 1,
              }}
              style={{
                ...styleText.semiBold,
                marginLeft: height / 66,
                width: width / 4,
              }}
              onChangeText={text => Validation(text, setExpense_Cost, 'Cost')}
            />
            {value === 'second' ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'rgba(45, 48, 61, 0.9)',
                    marginLeft: '5%',
                    marginTop: '8%',
                  }}>
                  × {total_Pick.toFixed(0)} =
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    height: height / 21,
                    width: width / 4,
                    marginLeft: '5%',
                    marginTop: '3%',
                    borderRadius: 15,
                    borderColor: 'rgba(45, 48, 61, 0.1)',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      marginHorizontal: '15%',
                      fontSize: 15,
                      color: 'black',
                    }}>
                    {ExpenseCost}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>

        {/* Production */}
        <View
          style={[
            {
              marginHorizontal: '3%',
              marginTop: '3%',
              borderRadius: 10,
              backgroundColor: 'white',
              flexDirection: 'column',
            },
            styles.shadow,
          ]}>
          {/* first three element */}
          <View
            style={{
              marginHorizontal: '3%',
              marginVertical: '2%',
              borderWidth: 0,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Production</Text>
              <Text style={styles.text}>Pick : {total_Pick}</Text>
              <Text style={styles.text}>{total_Efficiency} m/d</Text>
            </View>
          </View>
          <DottedLine />
          {/* 4 input */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              borderWidth: 0,
              marginVertical: '2%',
              justifyContent: 'center',
            }}>
            <Production_Input
              value={RPM.toString()}
              setValue={setRPM}
              lable={'RPM'}
            />
            <Production_Input
              value={efficiency.toString()}
              setValue={setEfficiency}
              lable={'Efficiency'}
            />
            <Production_Input
              value={machine.toString()}
              setValue={setMachine}
              lable={'Machine'}
            />
            <Production_Input
              value={parseFloat(labour).toFixed(2)}
              setValue={setLabour}
              lable={'Labour'}
            />
          </View>
        </View>

        {/* Imformation */}
        <View
          style={[
            {
              borderWidth: 0,
              backgroundColor: 'white',
              marginHorizontal: '3%',
              borderRadius: 10,
              marginTop: '3%',
            },
            styles.shadow,
          ]}>
          <View style={{marginHorizontal: '3%', borderWidth: 0}}>
            <Text style={[styles.text, {marginTop: '2%'}]}>Information</Text>
            <DottedLine margin={{marginVertical: '2%'}} />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: '4%',
              }}>
              <Information_Input
                style={styles.Information_Input}
                value={reed}
                setValue={setReed}
                lable={'Reed'}
              />
              <Information_Input
                style={styles.Information_Input}
                value={Width}
                setValue={setWidth}
                lable={'Width(Panno)'}
              />
              <Information_Input
                style={styles.Information_Input}
                value={border}
                setValue={setBorder}
                lable={'Border'}
              />
              <Information_Input
                style={styles.Information_Input}
                value={nozzle}
                setValue={setNozzle}
                lable={'Nozzle'}
              />
              <Information_Input
                style={styles.Information_Input}
                value={pasramani}
                setValue={setPasramani}
                lable={'Pasramani'}
              />
              <Information_Input
                style={styles.Information_Input}
                value={lattice}
                setValue={setLattice}
                lable={'Lattice'}
              />
              <Information_Input
                style={styles.Information_Input}
                value={steam_warp}
                setValue={setSteam_warp}
                lable={'Steam (warp)'}
              />
              <Information_Input
                style={styles.Information_Input}
                value={steam_weft}
                setValue={setSteam_weft}
                lable={'Steam (weft)'}
              />
              <Information_Input
                style={styles.Information_Input}
                value={gsm}
                setValue={setGsm}
                lable={'gsm'}
              />
            </View>
          </View>
        </View>

        {/* photos */}
        <View
          style={[
            {
              borderWidth: 0,
              backgroundColor: 'white',
              margin: '3%',
              borderRadius: 10,
            },
            styles.shadow,
          ]}>
          <View style={{marginHorizontal: '3%', borderWidth: 0}}>
            <Text style={[styles.text, {marginTop: '2%'}]}>Photos</Text>
            <DottedLine margin={{marginVertical: '2%'}} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Photos title={'Sample'} />
              <Photos title={'Lattice Pattern'} />
              <Photos title={'Pick Pattern'} />
              <Photos title={'Pasramani'} />
            </View>
          </View>
        </View>
        {BackModal()}
      </ScrollView>
      {/* {Yarn_Modal()} */}
    </View>
  );
};

export default QualityDetail;

const styles = StyleSheet.create({
  header: {
    height: height / 9,
    backgroundColor: '#E89E46',
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '12%',
    height: height / 9,
    marginHorizontal: '4%',
  },
  shadow: {
    shadowOffset: {width: 4, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
  text: {
    color: 'black',
    ...styleText.semiBold,
    borderWidth: 0,
    fontSize:15,
    maxWidth: width / 3.6,
    flexWrap: 'wrap',
  },
  warn_text: {
    color: 'red',
    ...styleText.semiBold,
    fontSize: 14,
    opacity: 0.7,
    alignSelf: 'flex-end',
    margin: '1%',
    marginRight: '3%',
  },
  main_view: {
    borderWidth: 0,
    paddingTop: '1%',
    paddingBottom: '2.5%',
    borderRadius: 10,
    marginHorizontal: '3%',
    marginTop: '3%',
    backgroundColor: 'white',
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 5,
    justifyContent: 'center',
  },
  Information_Input: {
    marginHorizontal: width / 50,
  },
});
