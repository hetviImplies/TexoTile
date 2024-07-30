import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';

export const GetAllQualityAPI = async () => {
  try {
    const response = await axios.get(`${URL}${EndPoints.GetQualityData}`, {
      validateStatus: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateQualityAPI = async obj => {
  try {
    const response = await axios.post(`${URL}${EndPoints.QualityCreate}`, obj, {
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        "type": "formData"
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
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
        validateStatus: false,
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
