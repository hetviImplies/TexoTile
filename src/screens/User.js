import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {styleText} from '../assets/fonts/Fonts';
import SeachBar from '../component/SeachBar';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetCurrentUser,
  GetPendignRequest,
  ProceedCurrentRequest,
  ProceedPendingRequest,
  RemoveCurrentRequest,
  RemovePendingRequest,
  SearchCurrentData,
  SearchPendingData,
} from '../Slice/UserSlice';
import UserContainer from '../component/UserContainer';
import moment from 'moment';
import LogOut_Modal from '../component/LogOut_Modal';
import Proceed_Request_Modal from '../component/Proceed_Request_Modal';
import {isFulfilled} from '@reduxjs/toolkit';
import {useFocusEffect} from '@react-navigation/native';
import Activity_Indicator from '../component/Activity_Indicator';

import FlashMessage, {showMessage} from 'react-native-flash-message';
import {FoundUser, Yarn_Logo} from '../assets/svgs/svg';
import Toast from '../component/Toast';
import {hp, wp} from '../Global_Com/responsiveScreen';
import {Black, White} from '../Global_Com/color';
const {height, width} = Dimensions.get('window');

const User = props => {
  const [search, setSearch] = useState();
  const [PendignRequestData, setPendignRequestData] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [isShowRemoveCom, setIsShowRemoveCom] = useState(false);
  const [isShowRemoveCurrent, setIsShowRemoveCurrent] = useState(false);
  const [isproceedPendingRequest, setIsproceedPendingRequest] = useState(false);
  const [isproceedCurrentRequest, setIsproceedCurrentRequest] = useState(false);
  const [checked, setChecked] = useState('');
  const [loading,setLoading]=useState(false)
  const [id, setId] = useState();
  const toastRef = useRef(null);
  const dispatch = useDispatch();

  const pendignRequest = useSelector(state => state?.User?.PendignRequest);
  const pending = useSelector(state => state?.User?.pending);
  const OldPendignRequest = useSelector(state => state?.User?.OldPendignRequest);
  const OldCurrentUser = useSelector(state => state?.User?.OldCurrentUser);

  const currentUser = useSelector(state => state?.User?.CurrentUser);
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
                width: width,
                alignItems: 'center',
              }}>
              <Yarn_Logo height={hp(9)} width={wp(9)} />
              <Text
                style={{
                  ...styleText.bold,
                  fontSize: 20,
                  color: White,
                  marginLeft: '33%',
                }}>
                User
              </Text>
            </View>
          </View>
        );
      },
    });
  }, [props.navigation]);

  useEffect(() => {
    setSearch(null);
    dispatch(GetPendignRequest());
    dispatch(GetCurrentUser());
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSearch(null);
      dispatch(GetPendignRequest());
      dispatch(GetCurrentUser());
    }, []),
  );

  const handleError = useCallback(
    message => {
      toastRef.current.error(message);
      toastRef.current.Height(-StatusBar.currentHeight);
    },
    [toastRef],
  );

  const HandleSuccess = useCallback(
    message => {
      toastRef.current.success(message);
      toastRef.current.Height(-StatusBar.currentHeight);
    },
    [toastRef],
  );

  useEffect(() => {
    dispatch(SearchCurrentData(search));
    dispatch(SearchPendingData(search));
  }, [search]);

  useEffect(() => {
    setPendignRequestData(pendignRequest);
    setCurrentUserData(currentUser);
  }, [pendignRequest, currentUser]);

  function getTimeAgo(time) {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
  const DisplayPendignRequestData = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 20,
            ...styleText.bold,
            color: Black,
            marginLeft: '4%',
            marginTop: '3%',
          }}>
          Pending Request
        </Text>
        <ScrollView contentContainerStyle={{marginTop: width / 30}}>
          {PendignRequestData?.map(item => {
            return (
              <UserContainer
                remove_function={() => {
                  setId(item.id);
                  setIsShowRemoveCom(true);
                }}
                proceedRequest={() => {
                  setId(item.id);
                  setIsproceedPendingRequest(true);
                }}
                type={'pending'}
                name={item.user.name}
                time={getTimeAgo(item.created_at)}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const DisplayCurrentUserData = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 20,
            ...styleText.bold,
            color: Black,
            marginLeft: '4%',
            marginTop: '3%',
          }}>
          All User
        </Text>
        <ScrollView contentContainerStyle={{marginTop: width / 30}}>
          {currentUserData?.map(item => {
            return (
              <UserContainer
                remove_function={() => {
                  setId(item.id);
                  setIsShowRemoveCurrent(true);
                }}
                proceedRequest={() => {
                  setChecked(
                    item.role.charAt(0).toUpperCase() + item.role.slice(1),
                  );
                  setId(item.id);
                  setIsproceedCurrentRequest(true);
                }}
                type={'current'}
                name={item.name}
                time={getTimeAgo(item.created_at)}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const RemovePendingUser = () => {
    return (
      <LogOut_Modal
        visible={isShowRemoveCom}
        setVisible={setIsShowRemoveCom}
        name={'Remove Invitation'}
        subText={'Are you sure to remove this user  invitation?'}
        func={async () => {
          try {
            setLoading(true)
            await dispatch(RemovePendingRequest(id)).then(async a => {
              if (a.error) {
                setLoading(false)
                handleError(a.message);
              } else {
                setLoading(false)
                handleError(a.payload.message);
                setIsShowRemoveCom(false);
                dispatch(GetPendignRequest());
                dispatch(GetCurrentUser());
                setId(null);
              }
            });
          } catch (error) {
            setLoading(false)
            handleError(error.message);
          }
        }}
      />
    );
  };
  const RemoveCurrentUser = () => {
    return (
      <LogOut_Modal
        visible={isShowRemoveCurrent}
        setVisible={setIsShowRemoveCurrent}
        name={'Remove Invitation'}
        subText={'Are you sure to remove this user  invitation?'}
        func={async() => {
          setLoading(true)
          try {
            await dispatch(RemoveCurrentRequest(id)).then(async a => {
              if (a.error) {
                setLoading(false)
                handleError(a.message);
              } else {
                setLoading(false)
                handleError(a.payload.message);
                setIsShowRemoveCurrent(false);
                dispatch(GetPendignRequest());
                dispatch(GetCurrentUser());
                setId(null);
              }
            });
          } catch (error) {
            setLoading(false)
            handleError(error.message);
          }
        }}
      />
    );
  };
  const ProceedPendingRequests = () => {
    return (
      <Proceed_Request_Modal
        func={async () => {
          setLoading(true)
          try {
            await dispatch(
              ProceedPendingRequest(
                {
                  id: id,
                  data: {
                    role: checked.toLowerCase(),
                  },
                },
              ),
            ).then(a => {
              if (a.error) {
                setLoading(false)
                handleError(a.message);
              } else {
                setLoading(false)
                HandleSuccess(a.payload.message);
                dispatch(GetCurrentUser());
                dispatch(GetPendignRequest());
                setChecked('');
                setId(null);
                setIsproceedPendingRequest(false);
              }
            });
          } catch (error) {
            setLoading(false)
            handleError(error.message);
          }
        }}
        visible={isproceedPendingRequest}
        setVisible={setIsproceedPendingRequest}
        checked={checked}
        setChecked={setChecked}
      />
    );
  };
  const ProceedCurrentRequests = () => {
    return (
      <Proceed_Request_Modal
        func={async () => {
          setLoading(true)
          try {
            await dispatch(
              ProceedCurrentRequest({
                  id: id,
                  data: {
                    role: checked.toLowerCase(),
                  },
              },
              ),
            ).then(a => {
              if (a.error) {
                setLoading(false)
                handleError(a.message);
              } else {
                setLoading(false)
                HandleSuccess(a.payload.message);
                dispatch(GetCurrentUser());
                dispatch(GetPendignRequest());
                setChecked('');
                setId(null);
                setIsproceedCurrentRequest(false);
              }
            });
          } catch (error) {
            setLoading(false)
            handleError(error.message);
          }
        }}
        visible={isproceedCurrentRequest}
        setVisible={setIsproceedCurrentRequest}
        checked={checked}
        setChecked={setChecked}
      />
    );
  };
  return (
    <View style={styles.container}>
    {
        loading ? <Activity_Indicator/> : null
      }
      {pending ? (
        <Activity_Indicator />
      ) : (
        <View>
          {(PendignRequestData?.length > 0 ||
            currentUserData?.length > 0 ||
            search || OldCurrentUser?.length > 0 || OldPendignRequest?.length > 0) && <SeachBar setSearch={setSearch} />}
          {(PendignRequestData?.length === 0 &&
            currentUserData?.length === 0) ||
          (search &&
            !PendignRequestData?.some(item =>
              item.user.name.toLowerCase().includes(search.toLowerCase()),
            ) &&
            !currentUserData?.some(item =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            )) ? (
            <View style={{alignItems: 'center', marginVertical: hp(25)}}>
              <FoundUser height={hp(20)} width={hp(20)} />
              <Text style={styles.text}>No User found</Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {PendignRequestData?.length > 0 && <DisplayPendignRequestData />}
              {currentUserData?.length > 0 && <DisplayCurrentUserData />}
            </ScrollView>
          )}
          {RemovePendingUser()}
          {RemoveCurrentUser()}
          {ProceedPendingRequests()}
          {ProceedCurrentRequests()}
        </View>
      )}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White,
  },
  text: {
    color: Black,
    ...styleText.bold,
    fontSize: 21,
  },
});
