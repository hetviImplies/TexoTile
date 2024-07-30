import {URL} from '../URLs/URL';

import {EndPoints} from '../URLs/EndPoints';
import axios from 'axios';

export const GetPendignRequestAPI = async () => {
  try {
    const res = await axios.get(`${URL}${EndPoints.GetPendignRequest}`, {
      validateStatus: false,
    });
    return res.data.result;
  } catch (error) {
    throw error;
  }
};

export const GetCurrentUserAPI = async () => {
  try {
    const res = await axios.get(`${URL}${EndPoints.GetCurrentUser}`, {
      validateStatus: false,
    });
    return res.data.result;
  } catch (error) {
    throw error;
  }
};

export const RemovePendingRequestAPI = async id => {
  try {
    const res = await axios.post(`${URL}${EndPoints.ProceedRequest}/${id}/D`)
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const RemoveCurrentRequestAPI = async id => {
  try {
    const res = await axios.post(`${URL}${EndPoints.RemoveRequest}/${id}`)
    return res.data;
  } catch (error) {
    throw error
  }
};

export const ProceedPendingRequestAPI = async obj => {
  const {id, data} = obj;
  try {
    const res = await axios.post(`${URL}${EndPoints.ProceedRequest}/${id}/A`, data,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      validateStatus:false
    })
    return res.data;
  } catch (error) {
    throw error
  }
};

export const ProceedCurrentRequestAPI = async obj => {
  const {id, data} = obj;
  try {
    const res = await axios.put(`${URL}${EndPoints.UpdateCurrentUser}/${id}`, data,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      validateStatus:false
    })
    return res.data;
  } catch (error) {
    throw error
  }
};


