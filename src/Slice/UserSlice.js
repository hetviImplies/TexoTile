import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import {GetCurrentUserAPI, GetPendignRequestAPI, ProceedCurrentRequestAPI, ProceedPendingRequestAPI, RemoveCurrentRequestAPI, RemovePendingRequestAPI} from '../services/UserRequestAPI';

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
    const res = await GetPendignRequestAPI();
    return res;
  },
);

export const GetCurrentUser = createAsyncThunk(
  'Get Current Users',
  async () => {
      const res = await GetCurrentUserAPI();
      return res;
  }
);

export const RemovePendingRequest = createAsyncThunk(
  'Remove Pending Request',
  async id => {
      const res = await RemovePendingRequestAPI(id)
      return res
  },
);

export const RemoveCurrentRequest = createAsyncThunk(
  'Remove Current Request',
  async id => {
      const res = await RemoveCurrentRequestAPI(id)
      return res;
  },
);

export const ProceedPendingRequest = createAsyncThunk(
  'Proceed Pending Request',
  async obj => {
      const res = await ProceedPendingRequestAPI(obj);
      return res;
  }
);

export const ProceedCurrentRequest = createAsyncThunk(
  'Proceed Current Request',
  async obj => {
    const res = await ProceedCurrentRequestAPI(obj);
      return res;
  },
);

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    SearchPendingData: (state, action) => {
      const dt = state.PendignRequest;
      const search = action.payload?.trim()?.toLowerCase();
      if (search === '') {
        state.PendignRequest = state.OldPendignRequest;
      } else {
        const data = state.OldPendignRequest?.filter(v =>
          v.user.name?.toLowerCase().includes(search?.toLowerCase()),
        );
        state.PendignRequest = data;
      }
    },
    SearchCurrentData: (state, action) => {
      const dt = state.CurrentUser;
      const search = action.payload?.toLowerCase();
      if (search === '') {
        state.CurrentUser = state.OldCurrentUser;
      } else {
        const data = state.OldCurrentUser?.filter(v => v.name?.toLowerCase().includes(search?.toLowerCase()));
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
      });
  },
});

export default UserSlice.reducer;
export const {SearchPendingData, SearchCurrentData} = UserSlice.actions;

const styles = StyleSheet.create({});
