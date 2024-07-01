import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import LoginAPI, { CreateCompanyAPI, JoinCompanyAPI, OTPAPI, UpdateUserAPI } from "../APIs/LoginAPI";
import axios from "axios";
import { URL } from "../URLs/URL";
import { EndPoints } from "../URLs/EndPoints";
export const LoginAuth = createAsyncThunk ("login",async (obj)=>{
    const response = await LoginAPI(obj)
    console.log(response);
    return response
})

export const OTPAuth = createAsyncThunk ("OTP company",async (obj)=>{
    console.log(obj);
    const response = await OTPAPI(obj)
    return response
})

export const CreateAuth = createAsyncThunk ("Create company",async (obj)=>{
    const response = await CreateCompanyAPI(obj)
    console.log(response,'============res');
    return response
})

export const JoinAuth = createAsyncThunk('Join company', async (obj) => {
    try {
      const response = await axios.post(`${URL}${EndPoints.JoinCompanyAPI}`, JSON.stringify(obj), {
        headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json',

        },
      });
      return response.data;
    } catch (error) {
      console.error('Error: ', error);
    }
  });

export const UpdateUserAuth = createAsyncThunk ("Update User",async (obj)=>{
    console.log(obj);
    const response = await axios.put(`${URL}${EndPoints.UpdateUserAuth}`,obj,{
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
})
        console.log(response.data);
})

export const GetUser = createAsyncThunk ("Get User",async ()=>{
    const response = await axios.get(`${URL}${EndPoints.GetUser}`)
    console.log(response.data,'===123=====res');
    return response.data
})

export const Logout = createAsyncThunk ("logout User",async ()=>{
    const response = await axios.post(`${URL}${EndPoints.Logout}`)
    console.log(response.data,'===123=====res');
    return response.data
})

const initialState={

}
const LoginAuthSlice=createSlice({
    name:"LoginAuthSlice",
    initialState,
    reducers:{

    }
})

export const {} =LoginAuthSlice.actions
export default LoginAuthSlice.reducer