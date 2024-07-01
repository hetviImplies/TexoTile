import {createSlice, isPending} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetAllQualityAPI} from '../APIs/QualityAPI';
import axios from 'axios';
import { jsx } from 'react/jsx-runtime';
import { URL } from '../URLs/URL';
import { EndPoints } from '../URLs/EndPoints';
const initialState = {
  YarnData: null,
  YarnPending: true,
  YarnOldDt: null,
  _Quality_Data:null,
  YarnCompanyData:null,
  YarnCompanyoldData:null

};

export const GetYarnData = createAsyncThunk('get Yarn data', async () => {
  try{
  const response = await axios.get(`${URL}${EndPoints.GetYarnData}`);
  return response.data.result.data;
}catch(error){
    console.log(error);
  }
});

export const GetCompanyData = createAsyncThunk('get Company data', async () => {
  try{
  const response = await axios.get(`${URL}${EndPoints.GetCompanyData}`);
  return response.data.result;
}catch(error){
    console.log(error);
  }
});

export const GetYarn = createAsyncThunk('get one Yarn data', async id => {
  const response = await axios.get(
    `${URL}${EndPoints.GetYarn}?id=${id.id}`,
  );
  return response.data.result;
});

export const YarnDataUpdate = createAsyncThunk(
  'Yarn Data Update',
  async ({id, name, rate, isAll,qualityIds}) => {
    try{
    let obj={}
    if(isAll || qualityIds){
      if(isAll){
        obj={
          name: name,
          rate: rate,
          isAll: isAll
        }
      }
      else if(qualityIds){
        obj={
          name: name,
          rate: rate,
          qualityIds: qualityIds
        }
      }
    }else{
      obj={
        name: name,
        rate: rate
      }
    }
    const response = await axios.put(
      `${URL}${EndPoints.YarnDataUpdate}?id=${id}`,obj,{headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',}
      }
    );
    console.log(response.data,'=========efrghthyhhhh5=======');
    return response;
  }catch(error){
    console.log(error,'========error');
  }
  }
);

export const AddYarnData = createAsyncThunk('Add Yarn data', async obj => {
  console.log('hello', obj);

  try{
  const response = await axios.post(
    `${URL}${EndPoints.AddYarnData}`,
    obj,
  );}catch(error){
    console.log('error: ', error);

  }
});

export const AddYarnCompany = createAsyncThunk('Add Yarn Company', async obj => {
  try{
  const response = await axios.post(
    `${URL}${EndPoints.AddYarnCompany}`,
    obj,
  )
  console.log(response);
  ;}catch(error){
    console.log('error: ', error);

  }
});

export const GetYarnQualityData = createAsyncThunk('get Quality data from Yarn', async ({id}) => {
    console.log(id,'=====id=');
    const response = await axios.get(`${URL}${EndPoints.GetYarnQualityData}?yarn=${id}`);


    return response.data.result.data;
  });



  export const GetYarnActivity = createAsyncThunk('get Activity from Yarn', async ({id}) => {
    console.log(id,'=====id=');
    const response = await axios.get(`${URL}${EndPoints.GetYarnActivity}?yarn=${id}`);
    return response.data.result;
  });
const YarnSlice = createSlice({
  name: 'Yarn',
  initialState,
  reducers: {

    SearchData: (state, action) => {
      const dt = state.YarnData;
    const searchTerm = action.payload?.trim().toLowerCase();
    if (searchTerm === '') {
    state.YarnData = state.YarnOldDt;
    } else {
    const filteredData = dt?.filter(v => v.name.toLowerCase().includes(searchTerm));
    state.YarnData = filteredData?.length > 0? filteredData : state.YarnOldDt;
    }
    },

    SearchCompanyData: (state, action) => {
      const dt = state.YarnCompanyData;
    const search = action.payload?.trim().toLowerCase();

    if (search === '') {
    state.YarnCompanyData = state.YarnCompanyoldData;
    } else {
    const data = dt?.filter(v => v.name?.toLowerCase().includes(search));
    state.YarnCompanyData = data?.length > 0 ? data : state.YarnCompanyoldData;
    }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(GetYarnData.fulfilled, (state, action) => {
        state.YarnData = action.payload;
        state.YarnOldDt = action.payload;
        state.YarnPending = false;
      })
      .addCase(GetYarnData.pending, state => {
        state.YarnPending = true;
      })
      .addCase(GetYarnData.rejected, state => {
        state.YarnPending = false;
      });
      builder.addCase(GetYarnQualityData.fulfilled,(state,action)=>{
            state._Quality_Data=action.payload
      }).addCase(GetYarnQualityData.rejected,()=>{
        console.log("rejected");
      })
      builder.addCase(GetCompanyData.fulfilled,(state,action)=>{
        state.YarnCompanyData=action.payload
        state.YarnCompanyoldData=action.payload
      })
  },
});

export const {SearchData ,SearchCompanyData} = YarnSlice.actions;
export default YarnSlice.reducer;
