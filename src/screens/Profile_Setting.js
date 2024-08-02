import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Profile_com from '../component/Profile_com';
import ButtonPress from '../component/ButtonPress';
import {useDispatch} from 'react-redux';
import {GetUser, UpdateUserAuth} from '../Slice/LoginAuthSlice';
import {Black, Red, White, Yellow} from '../Global_Com/color';
import AppConstant from '../Utils/AppConstant';
import {useFocusEffect} from '@react-navigation/native';
import {styleText} from '../assets/fonts/Fonts';
import {GlobalStyles} from '../Global_Com/Style';
import {hp, wp} from '../Global_Com/responsiveScreen';
import {emailRegex} from '../Utils/Regex';
import Activity_Indicator from '../component/Activity_Indicator';
import Toast from '../component/Toast';
import {LeftArrow, Yarn_Logo} from '../assets/svgs/svg';

const Profile_Setting = props => {
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [error,setError]=useState(false)
  console.log('error: ', error);
  const [EmailError, setEmailError] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {data, setData} = props.route.params;
  const toastRef = useRef();
  useFocusEffect(
    useCallback(() => {
      setEmailError(false);
      setFirst(setData.firstInput);
      setSecond(setData.secondInput);
      setThird(setData.thirdInput);
    }, [data, setData]),
  );

  const handleError = useCallback(
    message => {
      toastRef.current.error(message);
      toastRef.current.Height(-StatusBar.currentHeight + wp(4));
    },
    [toastRef],
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <View>
            <Toast ref={toastRef} />
            <View
              style={{
                paddingLeft: '5%',
                flexDirection: 'row',
                borderWidth: 0,
                width: wp(100),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true)
                  props.navigation.goBack();
                  setLoading(false)
                }}>
                <LeftArrow />
              </TouchableOpacity>
              <Text
                style={{
                  ...styleText.bold,
                  fontSize: 20,
                  color: White,
                  marginLeft: data.first === 'Name' ? '33%' : '23%',
                }}>
                {data.first === 'Name' ? AppConstant.Account : 'Company Detail'}
              </Text>
            </View>
          </View>
        );
      },
    });
  }, [props.navigation,data]);

  const HandlePress = async () => {
    try {
      if (data.first == AppConstant.Name) {
        if (EmailError === false) {
          setLoading(true);
          const obj = {
            name: first,
            email: third,
          };
          await dispatch(UpdateUserAuth(JSON.stringify(obj))).then(a => {
            if (a.payload.error === false) {
              setLoading(false);
              props.navigation.goBack();
            } else {
              setLoading(false);
              handleError(a.payload.message);
            }
          });
        }
      } else {
        props.navigation.goBack();
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    if (
      (third === '' && data.Third !== 'Company Address' && first) ||
      (data.Third === 'Company Address')
    ) {
      setEmailError(false);
      setError(false)
    } else {
      const isValidEmail = emailRegex.test(third?.trim());
      if(third!==''){
        setEmailError(!isValidEmail);
      }
      setError(first==='')
    }
  }, [third,first]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={GlobalStyles.ContainerWithoutJustifty}>
        {loading ? <Activity_Indicator /> : null}

        <Profile_com
          email={{borderColor: error ? Red : White, borderWidth: 1}}
          title={data.first}
          value={first}
          setvalue={setFirst}
          disable={data.first == AppConstant.Name ? true : false}
          placeholder={
            data.first === AppConstant.Name
              ? AppConstant.EnterName
              : AppConstant.EnterCode
          }
        />
        {error ? (
          <Text
            style={{
              color: Red,
              alignSelf: 'flex-end',
              marginTop: '2%',
              marginRight: '5%',
            }}>
            Name is required
          </Text>
        ) : null}
        <Profile_com
          title={data.Second}
          value={second}
          setvalue={setSecond}
          disable={false}
          placeholder={
            data.first === AppConstant.Name
              ? AppConstant.Enter_Phone_Number
              : AppConstant.Enter_Company_Name
          }
        />
        <Profile_com
          email={{borderColor: EmailError ? Red : White, borderWidth: 1}}
          title={data.Third}
          value={third}
          setvalue={setThird}
          disable={true}
          placeholder={
            data.first === AppConstant.Name
              ? 'Enter Email (optional)'
              : AppConstant.EnterAddress
          }
        />
        {EmailError ? (
          <Text
            style={{
              color: Red,
              alignSelf: 'flex-end',
              marginTop: '2%',
              marginRight: '5%',
            }}>
            Invalid email
          </Text>
        ) : null}
        <ButtonPress title={AppConstant.Save} func={HandlePress} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Profile_Setting;
