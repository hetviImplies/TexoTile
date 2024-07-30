import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import { FAB } from 'react-native-paper';

export const GetAllYarnDataAPI = async () => {
  try {
    const response = await axios.get(`${URL}${EndPoints.GetYarnData}`,{
      validateStatus:false
    });
    return response.data.result.data;
  } catch (error) {
    throw error
  }
};

export const GetAllCompanyDataAPI = async () => {
  try {
    const response = await axios.get(`${URL}${EndPoints.GetCompanyData}`,{
      validateStatus:false
    });
    return response.data.result;
  } catch (error) {
    throw error
  }
};

export const GetOneYarnAPI = async (id) => {
  try {
    const response = await axios.get(`${URL}${EndPoints.GetYarn}?id=${id.id}`,{
      validateStatus:false
    });
  return response.data.result;
  } catch (error) {
    throw error
  }
};

export const YarnDataUpdateAPI = async (id,obj) => {
  try {
    const response = await axios.put(
      `${URL}${EndPoints.YarnDataUpdate}?id=${id}`,obj,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        validateStatus:  false
      }
    )
    return response.data;
  } catch (error) {
    throw error
  }
};

export const AddYarnDataAPI = async (id,obj) => {
  try {
    const response = await axios.post(
      `${URL}${EndPoints.AddYarnData}`,
      obj,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          validateStatus:false
      }
    );
    return response.data
  } catch (error) {
    throw error
  }
};

export const CreateQualityAPI = async obj => {
  try {
    const response = await axios.post(`${URL}${EndPoints.QualityCreate}`, obj, {
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

export const UpdateQualityAPI = async (data, id) => {
  try {
    const res = await axios.put(
      `${URL}${EndPoints.UpdateQualityData}?id=${id}`,
      data,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        validateStatus: false,
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};