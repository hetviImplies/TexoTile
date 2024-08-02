import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import axios from 'axios';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';

const LoginAPI = async obj => {
  try {
    const response = await axios.post(`${URL}${EndPoints.LoginAPI}`, obj, {
      validateStatus: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const OTPAPI = async obj => {
  try {
    const response = await axios.post(`${URL}${EndPoints.OTPAPI}`, obj, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      validateStatus: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateCompanyAPI = async obj => {
  try {
    const response = await axios.post(
      `${URL}${EndPoints.CreateCompanyAPI}`,
      obj,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        validateStatus: false,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const JoinCompanyAPI = async obj => {
  try {
    const response = await axios.post(
      `${URL}${EndPoints.JoinCompanyAPI}`,
      obj,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        validateStatus: false,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserAPI = async obj => {
  try {
    const response = await axios.put(`${URL}${EndPoints.UpdateUserAPI}`, obj, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      validateStatus: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserProfile = async obj => {
  try {
    const response = await axios.get(`${URL}${EndPoints.GetUser}`, {
      validateStatus: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserLogout = async obj => {
  try {
    const response = axios.post(`${URL}${EndPoints.Logout}`, {
      validateStatus: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default LoginAPI;
