import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {styleText} from '../assets/fonts/Fonts';
import {useDispatch} from 'react-redux';
import {Logout} from '../Slice/LoginAuthSlice';
import UserStatus from '../component/UserStatus';
import axios from 'axios';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import {Black, White, Yellow} from '../Global_Com/color';
import screens from '../constants/screens';
import AppConstant from '../Utils/AppConstant';
import { ConditionContext } from './ConditionContext';
import Activity_Indicator from '../component/Activity_Indicator';
const {height, width} = Dimensions.get('window');
const Request = props => {
  const {condition, setCondition} = useContext(ConditionContext);
  const [index, setIndex] = useState(0);
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();
  const HandlePress = async () => {
    setLoading(true)
    try {
       await axios
        .get(`${URL}${EndPoints.GetProfile}`)
        .then(res => {
          if (
            res.data.result.company_owner === false &&
            !res.data.result.role
          ) {
            setLoading(false)
            setIndex(0);
          } else if (res.data.result.company_owner === null) {
            setLoading(false)
            setIndex(1);
          } else if (res.data.result.role) {
            setLoading(false)
            setCondition(res.data.result.role)
            setIndex(2);
            return props.navigation.reset({
              index: 0,
              routes: [{name: screens.Tabs}],
            });
          }
          return res.data.result;
        });
    } catch (error) {
      setLoading(false)
    }
  };

  useEffect(() => {
    HandlePress();
  }, []);
  return (
    <View style={styles.container}>
    {
        loading ? <Activity_Indicator/> : null
      }
      {index === 0 ? (
        <UserStatus
          type="pending"
          main="Your Request has been Pending"
          sub="Your request is now waiting for approval. You'll be notified when your request has been approved"
        />
      ) : index === 1 ? (
        <UserStatus
          type="rejected"
          sub="Your request rejected by company admin. So, please contact company admin."
        />
      ) : index === 2 ? (
        <UserStatus
          type="Accepted"
          main="Your Request has been Pending"
          sub="Your request is now waiting for approval. You'll be notified when your request has been approved"
        />
      ) : null}
      {index === 1 ? (
        <TouchableOpacity
          onPress={() => {
            props.navigation.reset({
              index: 0,
              routes: [{name: screens.Preference}],
            });
            setIndex(0)
          }}
          style={{
            borderWidth: 0,
            height: height / 14,
            width: width / 1.2,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Yellow,
            marginBottom: '5%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: White, fontSize: 19, ...styleText.semiBold}}>
            Add / Join company
          </Text>
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '5%',
          borderWidth: 0,
          width: width / 1.2,
        }}>
        <TouchableOpacity
          onPress={HandlePress}
          style={{
            borderWidth: 0,
            height: height / 15,
            width: '45%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(234, 234, 234, 1)',
          }}>
          <Text style={{color: Black, fontSize: 19, ...styleText.semiBold}}>
            {AppConstant.Status}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(Logout()).then(async a => {
              if (a.meta.requestStatus == 'fulfilled') {
                props.navigation.reset({
                  index: 0,
                  routes: [{name: screens.Quality}],
                });
                setIndex(0);
                return props.navigation.navigate(screens.Login);
              }
            });
          }}
          style={{
            borderWidth: 0,
            backgroundColor: Yellow,
            height: height / 15,
            width: '45%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: White, fontSize: 19, ...styleText.semiBold}}>
            {AppConstant.SignOut}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Request;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
