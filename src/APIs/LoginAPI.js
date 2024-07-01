import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
const LoginAPI = async obj => {
  const response = await axios.post(`${URL}${EndPoints.LoginAPI}`, obj);
  return response.data;
};
export const CreateCompanyAPI = async obj => {
  const response = await fetch(`${URL}${EndPoints.CreateCompanyAPI}`, {
    method: 'POST',
    body: obj,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const OTPAPI = async obj => {
  const response = await fetch(`${URL}${EndPoints.OTPAPI}`, {
    method: 'POST',
    body: obj,
  });
  return response;
};

export const JoinCompanyAPI = async obj => {

const response = await fetch(`${URL}${EndPoints.JoinCompanyAPI}`, {
  method: 'POST',
  body: JSON.stringify(obj),
  headers: {
    'Content-Type': 'application/json',
  },
}).then((a)=>{
  return a.json()
}).then((v)=>{
  console.log('v: ', v);

})

  return response;
};

export const UpdateUserAPI = async obj => {
  const response = await axios.put(
    `${URL}${EndPoints.UpdateUserAPI}`,
    obj,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};

export default LoginAPI;
