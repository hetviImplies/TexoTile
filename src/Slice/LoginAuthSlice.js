import {createSlice} from '@reduxjs/toolkit';

import {createAsyncThunk} from '@reduxjs/toolkit';
import LoginAPI, {
  CreateCompanyAPI,
  GetUserLogout,
  GetUserProfile,
  JoinCompanyAPI,
  OTPAPI,
  UpdateUserAPI,
} from '../services/LoginAPI';
import axios from 'axios';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';

export const LoginAuth = createAsyncThunk('login', async obj => {
  const response = await LoginAPI(obj);
  return response;
});

export const OTPAuth = createAsyncThunk('OTP company', async obj => {
  const response = await OTPAPI(obj);
  return response;
});

export const CreateAuth = createAsyncThunk('Create company', async obj => {
  const response = await CreateCompanyAPI(obj);
  return response;
});

export const JoinAuth = createAsyncThunk('Join company', async obj => {
    const response = await JoinCompanyAPI(obj)
    return response;
});

export const UpdateUserAuth = createAsyncThunk('Update User', async obj => {
  const response = await UpdateUserAPI(obj);
  return response;
});

export const GetUser = createAsyncThunk('Get User', async () => {
  const response = await GetUserProfile();
  return response;
});

export const Logout = createAsyncThunk('logout User', async () => {
  const response = await GetUserLogout();
  return response;
});

const initialState = {
  GetProfileData: null,
};

const LoginAuthSlice = createSlice({
  name: 'LoginAuthSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetUser.fulfilled, (state, action) => {
      state.GetProfileData = action.payload;
    });
  },
});

export const {} = LoginAuthSlice.actions;
export default LoginAuthSlice.reducer;
