import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import FoundUser from '../assets/svgs/FoundUser';
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
import { useFocusEffect } from '@react-navigation/native';
import Activity_Indicator from '../component/Activity_Indicator';
import Toast from '../../Toast';
import FlashMessage, { showMessage } from 'react-native-flash-message';
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
  const [id, setId] = useState();
  const toastRef = useRef(null)
  const dispatch = useDispatch();

  const pendignRequest = useSelector(state => state?.User?.PendignRequest);
  const pending = useSelector(state => state?.User?.pending);
  const currentUser = useSelector(state => state?.User?.CurrentUser);

  useEffect(() => {
    dispatch(GetPendignRequest());
    dispatch(GetCurrentUser());
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(GetPendignRequest());
      dispatch(GetCurrentUser());
    }, []),
  );

  const handleError = useCallback((message) => {
    showMessage({
      message: "Error",
      type:"danger",
      description : message,
      icon : { icon: "danger",position:"left" },
      style:{
        alignItems:"center"
      }
    });
  }, [toastRef]);

  const handleSuccess = useCallback((message) => {
    showMessage({
      message: "Success",
      type:"success",
      description : message,
      icon : { icon: "success",position:"left" },
      style:{
        alignItems:"center"
      }

    });
  }, [toastRef]);

  useEffect(() => {
    dispatch(SearchCurrentData(search));
    dispatch(SearchPendingData(search));
  }, [search]);

  useEffect(() => {
    setPendignRequestData(pendignRequest);
    setCurrentUserData(currentUser);
  }, [pendignRequest, currentUser]);

  function getTimeAgo(time) {
    const formattedDate = moment(time).format('DD-MM-YYYY');
    return formattedDate;
  }
  const DisplayPendignRequestData = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 20,
            ...styleText.bold,
            color: '#2D303D',
            marginLeft: '4%',
            marginTop: '3%',
          }}>
          Pending Request
        </Text>
        <ScrollView>
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
            color: '#2D303D',
            marginLeft: '4%',
            marginTop: '3%',
          }}>
          All User
        </Text>
        <ScrollView>
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
        func={() => {
          dispatch(RemovePendingRequest(JSON.stringify(id))).then(async a => {
            console.log(a,'==================a')
            if (a.error){
              handleError(a.message)
            } else{
              handleError(a.payload.message)
              setIsShowRemoveCom(false);
              dispatch(GetPendignRequest());
              dispatch(GetCurrentUser());
              setId(null);
            }
          });
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
        func={() => {
          dispatch(RemoveCurrentRequest(JSON.stringify(id))).then(async a => {
            if (a.error){
              handleError(a.message)
            } else{
              handleError(a.payload.message)
              setIsShowRemoveCurrent(false);
              dispatch(GetPendignRequest());
              dispatch(GetCurrentUser());
              setId(null);
            }
          });
        }}
      />
    );
  };
  const ProceedPendingRequests = () => {
    return (
      <Proceed_Request_Modal
        func={async () => {
          await dispatch(
            ProceedPendingRequest(
              JSON.stringify({
                id: id,
                data: {
                  role: checked.toLowerCase(),
                },
              }),
            ),
          ).then(a => {
            if (a.error){
                handleError(a.message)
            } else{
              handleSuccess(a.payload.message)
              dispatch(GetCurrentUser());
              dispatch(GetPendignRequest());
              setChecked('');
              setId(null);
              setIsproceedPendingRequest(false);
            }
          });
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
          await dispatch(
            ProceedCurrentRequest(
              JSON.stringify({
                id: id,
                data: {
                  role: checked.toLowerCase(),
                },
              }),
            ),
          ).then(a => {
            if (a.error){
                handleError(a.message)
            } else{
              handleSuccess(a.payload.message)
              dispatch(GetCurrentUser());
              dispatch(GetPendignRequest());
              setChecked('');
              setId(null);
              setIsproceedCurrentRequest(false);
            }
          });
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
    <FlashMessage ref={toastRef} />
      {pending ? (
        <Activity_Indicator/>
      ) : (
        <View>
          {(PendignRequestData?.length > 0 ||
            currentUserData?.length > 0 ||
            search) && <SeachBar setSearch={setSearch} />}
          {(PendignRequestData?.length === 0 &&
            currentUserData?.length === 0) ||
          (search &&
            !PendignRequestData?.some(item =>
              item.user.name.toLowerCase().includes(search.toLowerCase()),
            ) &&
            !currentUserData?.some(item =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            )) ? (
            <View style={{alignItems: 'center', marginVertical: '55%'}}>
              <FoundUser />
              <Text style={styles.text}>No User found</Text>
            </View>
          ) : (
            <>
              {PendignRequestData?.length > 0 && <DisplayPendignRequestData />}
              {currentUserData?.length > 0 && <DisplayCurrentUserData />}
            </>
          )}
          {RemovePendingUser()}
          {RemoveCurrentUser()}
          {ProceedPendingRequests()}
          {ProceedCurrentRequests()}
        </View>
      )}
      <Toast ref={toastRef}/>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: '#2D303D',
    ...styleText.bold,
    fontSize: 21,
  },
});
