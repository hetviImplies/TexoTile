import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
const initialState = {
  PendignRequest: null,
  OldPendignRequest: null,
  pending: true,
  CurrentUser: null,
  OldCurrentUser: null,
};

export const GetPendignRequest = createAsyncThunk(
  'Get Pendign Request',
  async () => {
    try {
      const res = await axios.get(`${URL}${EndPoints.GetPendignRequest}`);
      // console.log('res.data.payload: ', res.data.result);
      return res.data.result;
    } catch (error) {
      console.log('error: ', error);
    }
  },
);

export const GetCurrentUser = createAsyncThunk(
  'Get Current Users',
  async () => {
    try {
      const res = await axios.get(`${URL}${EndPoints.GetCurrentUser}`);
      return res.data.result;
    } catch (error) {
      console.log('error: ', error);
    }
  },
);

export const RemovePendingRequest = createAsyncThunk('Remove Pending Request', async (id) => {
  try {
    const res = await fetch(`${URL}${EndPoints.ProceedRequest}/${id}/D`,{
      headers : {
        Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      method : "POST"
    }).then((a)=>{
      return a.json()
    })
    return res
  } catch (error) {
    console.log('error: ', error);
  }
});

export const RemoveCurrentRequest = createAsyncThunk('Remove Current Request', async (id) => {
  try {
    console.log(id, '=====1');
    const res = await fetch(`${URL}${EndPoints.RemoveRequest}/${id}`,{
      headers : {
        Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      method : "POST"
    }).then((a)=>{
      return a.json()
    })
    return res
  } catch (error) {
    console.log('error: ', error);
  }
});

export const ProceedPendingRequest = createAsyncThunk('Proceed Pending Request', async (obj) => {
  const {id,data}=JSON.parse(obj)
  try {
    const res = await fetch(`${URL}${EndPoints.ProceedRequest}/${id}/A`,{
      headers : {
        Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      method : "POST",
      body : JSON.stringify(data)
    }).then((a)=>{
      return a.json()
    })
    return res
  } catch (error) {
    console.log('error: ', error);
  }
});

export const ProceedCurrentRequest = createAsyncThunk('Proceed Current Request', async (obj) => {
  const {id,data}=JSON.parse(obj)
  console.log( id,data);
  try {
    const res = await fetch(`${URL}${EndPoints.UpdateCurrentUser}/${id}`,{
      headers : {
        Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      method : "PUT",
      body : JSON.stringify(data)
    }).then((a)=>{
      return a.json()
    })
    return res
  } catch (error) {
    console.log('error: ', error);
  }
});

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    SearchPendingData: (state, action) => {
      const dt = state.PendignRequest;
      const search = action.payload?.trim().toLowerCase();
      if (search === '') {
        state.PendignRequest = state.OldPendignRequest;
      } else {
        const data = dt?.filter(v =>
          v.user.name?.toLowerCase().includes(search),
        );
        state.PendignRequest = data;
      }
    },
    SearchCurrentData: (state, action) => {
      const dt = state.CurrentUser;
      const search = action.payload?.trim().toLowerCase();
      if (search === '') {
        state.CurrentUser = state.OldCurrentUser;
      } else {
        const data = dt?.filter(v => v.name?.toLowerCase().includes(search));
        state.CurrentUser = data;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(GetPendignRequest.fulfilled, (state, action) => {
        state.OldPendignRequest = action.payload;
        state.PendignRequest = action.payload;
        state.pending = false;
      })
      .addCase(GetPendignRequest.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(GetPendignRequest.rejected, (state, action) => {
        state.pending = false;
        console.log('Rejected !!');
      })
      .addCase(GetCurrentUser.fulfilled, (state, action) => {
        state.OldCurrentUser = action.payload;
        state.CurrentUser = action.payload;
        state.pending = false;
      })
      .addCase(GetCurrentUser.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(GetCurrentUser.rejected, (state, action) => {
        state.pending = false;
        console.log('Rejected !!');
      });
  },
});

export default UserSlice.reducer;
export const {SearchPendingData, SearchCurrentData} = UserSlice.actions;

const styles = StyleSheet.create({});
