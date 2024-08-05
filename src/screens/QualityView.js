import {
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
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
import {RadioButton, TextInput} from 'react-native-paper';

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
import CardView from '../component/CardView';

import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import {styleText} from '../assets/fonts/Fonts';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import DocumentPicker from 'react-native-document-picker';
import {Camera, Image, LeftArrow, Pdf, Save} from '../assets/svgs/svg';
import Toast from '../component/Toast';
import {hp, wp} from '../Global_Com/responsiveScreen';
import {
  Black,
  Border_Color,
  Red,
  TextInput_Border_Color,
  White,
  Yellow,
} from '../Global_Com/color';
import screens from '../constants/screens';
import AppConstant from '../Utils/AppConstant';
import Activity_Indicator from '../component/Activity_Indicator';
import {Validation_YarnData} from '../Utils/Regex';
const {height, width} = Dimensions.get('window');
const QualityDetail = props => {
  const data = props.route.params?.data;
  let QualityFormData = new FormData();

  const [loading, setLoading] = useState(false);
  const [qualityName, setQualityName] = useState('');
  const [value, setValue] = useState('first');
  const [ExpenseCost, setExpenseCost] = useState(0);
  const [Expense_Cost, setExpense_Cost] = useState(0);
  const [RPM, setRPM] = useState('0');
  const [total_Efficiency, setTotal_Efficiency] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [machine, setMachine] = useState('1');
  const [labour, setLabour] = useState(0);
  const [reed, setReed] = useState('');
  const [border, setBorder] = useState('');
  const [Width, setWidth] = useState(0);
  const [nozzle, setNozzle] = useState('');
  const [pasramani, setPasramani] = useState('');
  const [pasramani_Pattern, setPasramani_Pattern] = useState(null);
  const [sample, setSample] = useState(null);
  const [pick_Pattern, setPick_Pattern] = useState(null);
  const [steam_warp, setSteam_warp] = useState('');
  const [steam_weft, setSteam_weft] = useState('');
  const [lattice, setLattice] = useState('');
  const [lattice_Pattern, setLattice_Pattern] = useState(null);
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
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [BackModal_Visible, setBackModal_Visible] = useState(false);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const bottomSheet = useRef(null);
  const bottomSheet2 = useRef(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [photo_Index, setPhoto_Index] = useState();
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const toastRef = useRef(null);
  let P_input1 = useRef(null);
  let P_input2 = useRef(null);
  let P_input3 = useRef(null);
  let P_input4 = useRef(null);
  let input1 = useRef(null);
  let input2 = useRef(null);
  let input3 = useRef(null);
  let input4 = useRef(null);
  let input5 = useRef(null);
  let input6 = useRef(null);
  let input7 = useRef(null);
  let input8 = useRef(null);
  let input9 = useRef(null);

  const handleLayout = event => {
    const {height} = event.nativeEvent.layout;
    setScrollViewHeight(height);
  };

  const SelectDoc = async () => {
    try {
      const select_Doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      console.log('select_Doc: ', select_Doc);

      if (select_Doc?.size >= 5000000) {
        handleError('Pdf size must be less than 5MB.');
      } else {
        if (photo_Index === 0) {
          setSample(select_Doc.fileCopyUri);
        } else if (photo_Index === 1) {
          setLattice_Pattern(select_Doc.fileCopyUri);
        } else if (photo_Index === 2) {
          setPick_Pattern(select_Doc.fileCopyUri);
        } else if (photo_Index === 3) {
          setPasramani_Pattern(select_Doc.fileCopyUri);
        }
      }
      await bottomSheet.current.close();
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('user canceled the upload: ', error);
      } else {
        console.log('error: ', error);
      }
    }
  };
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
    if (data) {
      setQualityName(data?.name);
      setWarp_Data(data?.warp_data);
      setWeft_Data(data?.weft_data);
      if (data?.expense_type == AppConstant.Per_Pick) {
        setValue('second');
        setExpense_Cost(data?.cost);
      } else {
        setExpense_Cost(data?.expense_cost);
      }
      setRPM(data?.rpm);
      setEfficiency(data.efficiency);
      setMachine(data?.machine);
      setReed(data?.reed);
      setWidth(data?.panno);
      setBorder(data?.border);
      setNozzle(data?.nozzle);
      setLattice(data?.letis);
      setPasramani(data?.pasramani);
      setPasramani_Pattern(data?.pasramani_pattern);
      setSample(data?.sample);
      setLattice_Pattern(data?.latis_pattern);
      setPick_Pattern(data?.pick_pattern);
      setSteam_warp(data?.steam_warp);
      setSteam_weft(data?.steam_weft);
      setGsm(data?.gsm);
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
      // console.log('weft_data: ', weft_data);
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

  QualityFormData.append('name', qualityName);
  QualityFormData.append('weight', quality_weight);
  QualityFormData.append('quality_cost', quality_cost);
  QualityFormData.append(
    'total_beam_ends',
    total_beam_ends.toFixed(2).toString(),
  );
  QualityFormData.append('total_pick', total_Pick.toFixed(2));
  QualityFormData.append('total_width', total_width?.toFixed(2));
  QualityFormData.append('total_warp_weight', Warp_Weight.toFixed(2));
  QualityFormData.append('total_warp_cost', Warp_Cost.toFixed(2));
  QualityFormData.append('total_weft_weight', Weft_Weight.toString());
  QualityFormData.append('total_weft_cost', Weft_Cost.toString());
  QualityFormData.append(
    'expense_type',
    value == 'first' ? AppConstant.Fixed_Cost : AppConstant.Per_Pick,
  );
  QualityFormData.append(
    'total_efficiency',
    parseFloat(total_Efficiency).toFixed(2),
  );
  QualityFormData.append('efficiency', parseFloat(efficiency).toFixed(2));
  QualityFormData.append('machine', machine.toString());
  QualityFormData.append('cost', value == 'first' ? '0.00' : Expense_Cost);
  QualityFormData.append('expense_cost', ExpenseCost?.toString());
  QualityFormData.append('panno', parseFloat(Width).toFixed(2));
  QualityFormData.append('reed', reed);
  QualityFormData.append('rpm', RPM);
  QualityFormData.append('letis', lattice);
  QualityFormData.append('border', border);
  QualityFormData.append('nozzle', nozzle);
  QualityFormData.append('pasramani', pasramani);
  QualityFormData.append('steam_weft', steam_weft);
  QualityFormData.append('steam_warp', steam_warp);
  QualityFormData.append('gsm', gsm);


  pasramani_Pattern !== null
    ? QualityFormData.append(
        'pasramani_pattern',
        !pasramani_Pattern?.startsWith('http')
          ? {
              uri: pasramani_Pattern,
              type: pasramani_Pattern?.toLowerCase()?.endsWith('.pdf')
                ? 'application/pdf'
                : `image/${pasramani_Pattern?.split('.')?.pop()}`,
              name: pasramani_Pattern?.toLowerCase()?.endsWith('.pdf')
                ? 'PDF'
                : `IMAGE`,
            }
          : pasramani_Pattern,
      )
    : null;

  sample !== null
    ? QualityFormData.append(
        'sample',
        !sample?.startsWith('http')
          ? {
              uri: sample,
              type: sample?.toLowerCase()?.endsWith('.pdf')
                ? 'application/pdf'
                : `image/${sample?.split('.')?.pop()}`,
              name: sample?.toLowerCase()?.endsWith('.pdf') ? 'PDF' : `IMAGE`,
            }
          : sample,
      )
    : null;

  pick_Pattern !== null
    ? QualityFormData.append(
        'pick_pattern',
        !pick_Pattern?.startsWith('http')
          ? {
              uri: pick_Pattern,
              type: pick_Pattern?.toLowerCase()?.endsWith('.pdf')
                ? 'application/pdf'
                : `image/${pick_Pattern?.split('.')?.pop()}`,
              name: pick_Pattern?.toLowerCase()?.endsWith('.pdf')
                ? 'PDF'
                : `IMAGE`,
            }
          : pick_Pattern,
      )
    : null;

  lattice_Pattern !== null
    ? QualityFormData.append(
        'latis_pattern',
        !lattice_Pattern?.startsWith('http')
          ? {
              uri: lattice_Pattern,
              type: lattice_Pattern?.toLowerCase()?.endsWith('.pdf')
                ? 'application/pdf'
                : `image/${pasramani_Pattern?.split('.')?.pop()}`,
              name: lattice_Pattern?.toLowerCase()?.endsWith('.pdf')
                ? 'PDF'
                : `IMAGE`,
            }
          : lattice_Pattern,
      )
    : null;

  final_Warp_Data.forEach((item, index) => {
    for (const key in item) {
      QualityFormData.append(`warp_data[${index}][${key}]`, item[key]);
    }
  });

  final_Weft_Data.forEach((item, index) => {
    for (const key in item) {
      QualityFormData.append(`weft_data[${index}][${key}]`, item[key]);
    }
  });

  // const QualityData = {
  //   name: qualityName.toString(),
  //   weight: quality_weight,
  //   quality_cost: quality_cost,
  //   total_beam_ends: total_beam_ends.toFixed(2).toString(),
  //   total_pick: total_Pick.toFixed(2),
  //   total_width: total_width?.toFixed(2),
  //   total_warp_weight: Warp_Weight.toFixed(2),
  //   total_warp_cost: Warp_Cost.toFixed(2),
  //   warp_data: final_Warp_Data,
  //   total_weft_weight: Weft_Weight.toString(),
  //   total_weft_cost: Weft_Cost.toString(),
  //   weft_data: final_Weft_Data,
  //   expense_type:
  //     value == 'first' ? AppConstant.Fixed_Cost : AppConstant.Per_Pick,
  //   cost: value == 'first' ? '0.00' : Expense_Cost,
  //   expense_cost: ExpenseCost?.toString(),
  //   total_efficiency: parseFloat(total_Efficiency).toFixed(2),
  //   rpm: RPM,
  //   efficiency: parseFloat(efficiency).toFixed(2),
  //   machine: machine.toString(),
  //   panno: parseFloat(Width).toFixed(2),
  //   reed: reed,
  //   letis: lattice,
  //   border: border,
  //   nozzle: nozzle,
  //   pasramani: pasramani,
  //   steam_weft: steam_weft,
  //   steam_warp: steam_warp,
  //   gsm: gsm,
  //   ...(pasramani_Pattern ? {pasramani_pattern: pasramani_Pattern} : null),
  //   ...(sample ? {sample: sample} : null),
  //   ...(pick_Pattern ? {pick_pattern: pick_Pattern} : null),
  //   ...(lattice_Pattern ? {latis_pattern: lattice_Pattern} : null),
  // };

  useEffect(() => {
    if (value == 'first') {
      setExpenseCost(Expense_Cost);
    } else {
      setExpenseCost((Expense_Cost * total_Pick).toFixed(0));
    }
  }, [value, Expense_Cost, ExpenseCost]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <View
          style={{
            height: height / 15,
            backgroundColor: Yellow,
            flexDirection: 'row',
            width: width,
            justifyContent: 'space-between',
            borderWidth: 0,
            alignItems: 'center',
            paddingHorizontal: '5%',
          }}>
          <Toast ref={toastRef} />
          <TouchableOpacity
            onPress={() => setBackModal_Visible(true)}
            style={{marginTop: '2%'}}>
            <LeftArrow />
          </TouchableOpacity>
          <Text style={{...styleText.bold, fontSize: 20, color: White}}>
            {AppConstant.Quality_Details}
          </Text>
          <TouchableOpacity disabled={loading} style={{}} onPress={HandleSave}>
            <Save height={35} width={35} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [props.navigation, QualityFormData]);

  const WarpModal = () => {
    return (
      <YarnModal
        visible={warpShow}
        setClose={setWarpShow}
        modal_T={AppConstant.Warp}
        setData={setWarp_Data}
        data={warp_data}
        editData={editWarpData}
        EditWarpData={setEditWarpData}
        EditWeftData={setEditWeftData}
        setEditWarpData={setEditWarpData}
        setEditWeftData={setEditWeftData}
      />
    );
  };

  const WeftModal = () => {
    return (
      <YarnModal
        visible={weftShow}
        setClose={setWeftShow}
        modal_T={AppConstant.Weft}
        setData={setWeft_Data}
        data={weft_data}
        editData={editWeftData}
        EditWarpData={setEditWarpData}
        EditWeftData={setEditWeftData}
        setEditWarpData={setEditWarpData}
        setEditWeftData={setEditWeftData}
        Width={Width}
        SetWidth={setWidth}
      />
    );
  };

  const HandleSave = async () => {
    setSave(true);
    setLoading(true);
    try {
      if (qualityName != '' && warp_data.length > 0 && weft_data.length > 0) {
        if (data === undefined) {
          setSave(false);
          await dispatch(CreateQualityData(QualityFormData)).then(async a => {
            //QualityData
            if (a.payload.error) {
              setLoading(false);
              handleError(a.payload.message);
            } else {
              setLoading(false);
              await dispatch(GetQualityData());
              return props.navigation.navigate(screens.Tabs);
            }
          });
        } else {
          setSave(false);
          await dispatch(
            UpdateQualityData({data: QualityFormData, id: data.id}),
          ).then(async a => {
            if (a.error) {
              setLoading(false);
              handleError(a.message);
            } else {
              setLoading(false);
              await dispatch(GetQualityData());
              return props.navigation.reset({
                index: 0,
                routes: [{name: screens.Tabs}],
              });
            }
          });
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error...: ',error.response.data);
console.log('error...1: ',error.response.status);
console.log('error...2: ',error.response.headers);
console.log('error...3: ',error.request);
console.log('error...4', error.message);
      setLoading(false);
      handleError(error.message);
    }
  };

  const handleError = useCallback(
    message => {
      console.log('message: ', message);
      toastRef.current.error(message);
      toastRef.current.Height(-StatusBar.currentHeight);
    },
    [toastRef],
  );

  const requestCameraPermission = async callback => {
    if (Platform.OS === AppConstant.ANDROID) {
      const requestCameraPermissionstatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: AppConstant.Camera_Permission,
          message: 'This app needs access to your camera',
          buttonNeutral: AppConstant.AskMeLater,
          buttonNegative: AppConstant.CANCEL,
          buttonPositive: AppConstant.OK,
        },
      );
      setCameraPermission(
        requestCameraPermissionstatus === AppConstant.GRANTED,
      );
      console.log(
        'requestCameraPermissionstatus: ',
        requestCameraPermissionstatus,
      );

      if (requestCameraPermissionstatus === AppConstant.GRANTED) {
        setCameraPermission(true);
        callback(true);
      } else {
        setCameraPermission(false);
        callback(false);
      }
    } else {
      // iOS permission handling
      const cameraPermissionStatus =
        await ImagePicker.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus === AppConstant.GRANTED);
    }
  };

  const handleTakePhoto = async () => {
    if (!cameraPermission) {
      await requestCameraPermission(async granted => {
        if (granted) {
          const options = {
            title: 'Take a Photo',
            takePhotoButtonTitle: 'Take a Photo',
            mediaType: 'photo',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };

          launchCamera(options, async response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = response?.assets[0].uri;
              if (photo_Index === 0) {
                setSample(source);
              } else if (photo_Index === 1) {
                setLattice_Pattern(source);
              } else if (photo_Index === 2) {
                setPick_Pattern(source);
              } else if (photo_Index === 3) {
                setPasramani_Pattern(source);
              }
              await bottomSheet2.current.close();
            }
          });
        } else {
          Alert.alert('Camera permission denied');
          await bottomSheet2.current.close();
        }
      });
    } else {
      const options = {
        title: 'Take a Photo',
        takePhotoButtonTitle: 'Take a Photo',
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchCamera(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          console.log('response: ', response);
          const source = response?.assets[0].uri;
          if (photo_Index === 0) {
            setSample(source);
          } else if (photo_Index === 1) {
            setLattice_Pattern(source);
          } else if (photo_Index === 2) {
            setPick_Pattern(source);
          } else if (photo_Index === 3) {
            setPasramani_Pattern(source);
          }
          await bottomSheet2.current.close();
        }
      });
    }
  };

  const handleChoosePhoto = async () => {
    if (!galleryPermission) {
      await requestGalleryPermission(async granted => {
        if (granted) {
          const options = {
            title: 'Select Image',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          launchImageLibrary(options, async response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = response?.assets[0].uri;
              if (photo_Index === 0) {
                setSample(source);
              } else if (photo_Index === 1) {
                setLattice_Pattern(source);
              } else if (photo_Index === 2) {
                setPick_Pattern(source);
              } else if (photo_Index === 3) {
                setPasramani_Pattern(source);
              }
              await bottomSheet2.current.close();
            }
          });
        } else {
          Alert.alert('Gallery permission denied');
          await bottomSheet2.current.close();
        }
      });
    } else {
      const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, async response => {
        console.log('response: ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = response?.assets[0].uri;
          if (photo_Index === 0) {
            setSample(source);
          } else if (photo_Index === 1) {
            setLattice_Pattern(source);
          } else if (photo_Index === 2) {
            setPick_Pattern(source);
          } else if (photo_Index === 3) {
            setPasramani_Pattern(source);
          }
          await bottomSheet2.current.close();
        }
      });
    }
  };

  const requestGalleryPermission = async callback => {
    if (Platform.OS === AppConstant.ANDROID) {
      const galleryPermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Gallery Permission',
          message: 'This app needs access to your gallery',
          buttonNeutral: AppConstant.AskMeLater,
          buttonNegative: AppConstant.CANCEL,
          buttonPositive: AppConstant.OK,
        },
      );
      if (galleryPermissionStatus === AppConstant.GRANTED) {
        setGalleryPermission(true);
        callback(true);
      } else {
        setGalleryPermission(false);
        callback(false);
      }
    } else {
      // iOS permission handling
      const galleryPermissionStatus =
        await ImagePicker.requestPhotoLibraryPermission();
      setGalleryPermission(galleryPermissionStatus === AppConstant.GRANTED);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{paddingBottom: '3%'}}>
        {loading ? <Activity_Indicator /> : null}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: '4%',
            justifyContent: 'space-between',
            paddingHorizontal: '3%',
            flexGrow: 1,
            maxWidth: width,
            flexWrap: 'wrap',
          }}>
          <Tag
            title={AppConstant.Weight}
            value={quality_weight}
            tag={AppConstant.KG}
          />
          <Tag
            title={AppConstant.Cost}
            value={quality_cost}
            tag={AppConstant.ruppes}
          />
        </View>

        <TextInput
          dense
          mode="outlined"
          label="Qaulity Name"
          selectionColor={Yellow}
          value={qualityName}
          outlineColor={Border_Color}
          editable
          activeOutlineColor={Yellow}
          outlineStyle={{borderRadius: 15, height: hp(5.55)}}
          style={{
            width: wp(94),
            alignSelf: 'center',
          }}
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
            setQualityName(newName);
          }}
        />

        {isSave ? (
          qualityName == '' ? (
            <Text style={styles.warn_text}>Quality Name is required.</Text>
          ) : null
        ) : null}
      </View>
      <ScrollView
        onLayout={handleLayout}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '3%'}}>
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
            modal_type={AppConstant.Warp}
            from={AppConstant.Detail}
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
            modal_type={AppConstant.Weft}
            from={AppConstant.Detail}
            style={{marginHorizontal: '3%', paddingRight: '9%'}}
            func={() => {
              setWeftShow(true);
              setModal_Type(AppConstant.Weft);
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
              backgroundColor: White,
              paddingBottom: '3%',
            },
            styles.shadow,
          ]}>
          {/* first three element */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '3%',
              borderWidth: 0,
            }}>
            <Text style={styles.text}>{AppConstant.Expense}</Text>
            <RadioButton.Group
              onValueChange={newValue => setValue(newValue)}
              value={value}>
              <View
                style={{
                  flexDirection: 'row',
                  maxWidth: wp(90),
                  flexWrap: 'wrap',
                }}>
                <TouchableOpacity
                  onPress={() => setValue('first')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 0,
                    marginLeft: wp(14),
                  }}>
                  <RadioButton
                    value="first"
                    color={Yellow}
                    uncheckedColor={Yellow}
                  />
                  <Text
                    style={{
                      color: Black,
                      ...styleText.semiBold,
                      fontSize: hp(1.9),
                      maxWidth: wp(20),
                      borderWidth: 0,
                      flexWrap: 'wrap',
                    }}>
                    {AppConstant.Fixed_Cost}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setValue('second')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: width / 12,
                  }}>
                  <RadioButton
                    value="second"
                    color={Yellow}
                    uncheckedColor={Yellow}
                  />
                  <Text
                    style={{
                      color: Black,
                      ...styleText.semiBold,
                      fontSize: hp(1.9),
                      maxWidth: wp(20),
                      flexWrap: 'wrap',
                    }}>
                    {AppConstant.Per_Pick}
                  </Text>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>
          </View>
          <DottedLine margin={{marginHorizontal: '3%'}} />
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
              selectionColor={Yellow}
              value={Expense_Cost?.toString()}
              numberOfLines={1}
              dense
              outlineColor="rgba(45, 48, 61, 0.1)"
              activeOutlineColor={Yellow}
              outlineStyle={{
                borderRadius: 15,
                backgroundColor: White,
                height: hp(5),
                width: width / 4,
                borderWidth: 1,
              }}
              style={{
                ...styleText.semiBold,
                marginLeft: height / 66,
                width: width / 4,
              }}
              onChangeText={text =>
                Validation_YarnData(text, setExpense_Cost, AppConstant.Cost)
              }
            />
            {value === 'second' ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Black,
                    marginLeft: '5%',
                    marginTop: '8%',
                  }}>
                  × {total_Pick.toFixed(0)} =
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    height: hp(5),
                    width: width / 4,
                    marginLeft: '5%',
                    marginTop: '3%',
                    borderRadius: 15,
                    borderColor: TextInput_Border_Color,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      marginHorizontal: '15%',
                      fontSize: 15,
                      color: Black,
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
              backgroundColor: White,
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
              <Text style={styles.text}>{AppConstant.Production}</Text>
              <Text style={styles.text}>
                {AppConstant.Pick} : {total_Pick}
              </Text>
              <Text style={styles.text}>
                {total_Efficiency} {AppConstant.MD}
              </Text>
            </View>
          </View>
          <DottedLine margin={{marginHorizontal: '3%'}} />
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
              IsDisable={false}
              func={i => (P_input1 = i)}
              onSubmitEditing={() => P_input2.focus()}
              returnKeyType="next"
              returnKeyLabel="next"
              value={RPM.toString()}
              setValue={setRPM}
              lable={AppConstant.RPM}
            />
            <Production_Input
              IsDisable={false}
              func={i => (P_input2 = i)}
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => P_input3.focus()}
              value={efficiency.toString()}
              setValue={setEfficiency}
              lable={AppConstant.Efficiency}
            />
            <Production_Input
              IsDisable={false}
              func={i => (P_input3 = i)}
              returnKeyType="done"
              returnKeyLabel="done"
              onSubmitEditing={() => console.log('Form submitted')}
              value={machine.toString()}
              setValue={setMachine}
              lable={AppConstant.Machine}
            />
            <Production_Input
              IsDisable={true}
              func={i => (P_input4 = i)}
              returnKeyType="done"
              returnKeyLabel="done"
              onSubmitEditing={() => console.log('Form submitted')}
              value={parseFloat(labour).toFixed(2)}
              setValue={setLabour}
              lable={AppConstant.Labour}
            />
          </View>
        </View>

        {/* Imformation */}
        <View
          style={[
            {
              borderWidth: 0,
              backgroundColor: White,
              marginHorizontal: '3%',
              borderRadius: 10,
              marginTop: '3%',
            },
            styles.shadow,
          ]}>
          <View style={{marginHorizontal: '3%', borderWidth: 0}}>
            <Text style={[styles.text, {marginTop: '2%'}]}>
              {AppConstant.Information}
            </Text>
            <DottedLine margin={{marginVertical: '2%'}} />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: '4%',
              }}>
              <Information_Input
                keyboardType={'default'}
                func={i => (input1 = i)}
                onSubmitEditing={() => input2.focus()}
                returnKeyType="next"
                returnKeyLabel="next"
                style={styles.Information_Input}
                value={reed}
                setValue={setReed}
                lable={AppConstant.Reed}
              />
              <Information_Input
                keyboardType={'number-pad'}
                func={i => (input2 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => input3.focus()}
                style={styles.Information_Input}
                value={Width}
                setValue={setWidth}
                lable={`${AppConstant.Width}(${AppConstant.Panno})`}
              />

              <Information_Input
                keyboardType={'default'}
                func={i => (input3 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => input4.focus()}
                style={styles.Information_Input}
                value={border}
                setValue={setBorder}
                lable={AppConstant.Border}
              />
              <Information_Input
                keyboardType={'default'}
                func={i => (input4 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => input5.focus()}
                style={styles.Information_Input}
                value={nozzle}
                setValue={setNozzle}
                lable={AppConstant.Nozzle}
              />
              <Information_Input
                keyboardType={'default'}
                func={i => (input5 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => input6.focus()}
                style={styles.Information_Input}
                value={pasramani}
                setValue={setPasramani}
                lable={AppConstant.Pasramani}
              />
              <Information_Input
                keyboardType={'default'}
                func={i => (input6 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => input7.focus()}
                style={styles.Information_Input}
                value={lattice}
                setValue={setLattice}
                lable={AppConstant.Lattice}
              />
              <Information_Input
                keyboardType={'default'}
                func={i => (input7 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => input8.focus()}
                style={styles.Information_Input}
                value={steam_warp}
                setValue={setSteam_warp}
                lable={AppConstant.Steam_Warp}
              />
              <Information_Input
                keyboardType={'default'}
                func={i => (input8 = i)}
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => input9.focus()}
                style={styles.Information_Input}
                value={steam_weft}
                setValue={setSteam_weft}
                lable={AppConstant.Steam_Weft}
              />
              <Information_Input
                keyboardType={'default'}
                func={i => (input9 = i)}
                returnKeyType="done"
                returnKeyLabel="done"
                onSubmitEditing={() => console.log('done')}
                style={styles.Information_Input}
                value={gsm}
                setValue={setGsm}
                lable={AppConstant.Gsm}
              />
            </View>
          </View>
        </View>

        {/* photos */}
        <View
          style={[
            {
              borderWidth: 0,
              backgroundColor: White,
              margin: '3%',
              borderRadius: 10,
            },
            styles.shadow,
          ]}>
          <View style={{marginHorizontal: '3%', borderWidth: 0}}>
            <Text style={[styles.text, {marginTop: '2%'}]}>
              {AppConstant.Photos}
            </Text>
            <DottedLine margin={{marginVertical: '2%'}} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Photos
                photo={sample}
                title={AppConstant.Sample}
                onPress={() => {
                  if (sample) {
                    props.navigation.navigate(screens.ImageView, {
                      image: sample,
                      Title: AppConstant.Sample,
                    });
                  } else {
                    setPhoto_Index(0);
                    bottomSheet.current.show();
                  }
                }}
                onPressDelete={() => {
                  setSample(null);
                }}
              />
              <Photos
                photo={lattice_Pattern}
                title={AppConstant.Lattice_Pattern}
                onPress={() => {
                  if (lattice_Pattern) {
                    props.navigation.navigate(screens.ImageView, {
                      image: lattice_Pattern,
                      Title: AppConstant.Lattice_Pattern,
                    });
                  } else {
                    setPhoto_Index(1);
                    bottomSheet.current.show();
                  }
                }}
                onPressDelete={() => {
                  setLattice_Pattern(null);
                }}
              />
              <Photos
                photo={pick_Pattern}
                title={AppConstant.Pick_Pattern}
                onPress={() => {
                  if (pick_Pattern) {
                    props.navigation.navigate(screens.ImageView, {
                      image: pick_Pattern,
                      Title: AppConstant.Pick_Pattern,
                    });
                  } else {
                    setPhoto_Index(2);
                    bottomSheet.current.show();
                  }
                }}
                onPressDelete={() => {
                  setPick_Pattern(null);
                }}
              />
              <Photos
                photo={pasramani_Pattern}
                title={AppConstant.Pasramani}
                onPress={() => {
                  if (pasramani_Pattern) {
                    props.navigation.navigate(screens.ImageView, {
                      image: pasramani_Pattern,
                      Title: AppConstant.Pasramani_Pattern,
                    });
                  } else {
                    setPhoto_Index(3);
                    bottomSheet.current.show();
                  }
                }}
                onPressDelete={() => {
                  setPasramani_Pattern(null);
                }}
              />
            </View>
          </View>
        </View>
        {BackModal()}
      </ScrollView>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={180}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              bottomSheet.current.close();
              bottomSheet2.current.show();
            }}
            style={{alignItems: 'center', padding: '10%'}}>
            <Image height={85} width={85} />
            <Text style={{...styleText.bold, color: Black, fontSize: 15}}>
              {AppConstant.Image}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={SelectDoc}
            style={{alignItems: 'center', padding: '10%'}}>
            <Pdf height={85} width={85} />
            <Text style={{...styleText.bold, color: Black, fontSize: 15}}>
              {AppConstant.Pdf}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <BottomSheet hasDraggableIcon ref={bottomSheet2} height={180}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
          }}>
          <TouchableOpacity
            onPress={handleTakePhoto}
            style={{alignItems: 'center', padding: '7%', paddingBottom: '10%'}}>
            <Camera height={100} width={100} />
            <Text
              style={{
                ...styleText.bold,
                color: Black,
                fontSize: 15,
                position: 'absolute',
                bottom: 32,
              }}>
              {AppConstant.Camera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={{alignItems: 'center', padding: '7%'}}>
            <Image height={85} width={85} />
            <Text style={{...styleText.bold, color: Black, fontSize: 15}}>
              {AppConstant.Gallery}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      {/* {Yarn_Modal()} */}
    </View>
  );
};

export default QualityDetail;

const styles = StyleSheet.create({
  header: {
    height: height / 9,
    backgroundColor: Yellow,
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
    color: Black,
    ...styleText.semiBold,
    fontSize: hp(2),
    maxWidth: wp(25),
    flexWrap: 'wrap',
  },
  warn_text: {
    color: Red,
    ...styleText.semiBold,
    fontSize: hp(1.8),
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
    backgroundColor: White,
    shadowColor: Black,
    backgroundColor: White,
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
