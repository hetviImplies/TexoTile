import {createSlice, isPending} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetAllQualityAPI} from '../APIs/QualityAPI';
import axios from 'axios';
import { URL } from '../URLs/URL';
import { EndPoints } from '../URLs/EndPoints';
const initialState = {
  QualityData: null,
  QualityPending: true,
  QualityOldDt: null,
};

export const GetQualityData = createAsyncThunk('get quality data', async () => {
  const response = await axios.get(`${URL}${EndPoints.GetQualityData}`);
  return response.data.result.data;
});

export const CreateQualityData = createAsyncThunk(
  'Create quality data',
  async (obj) => {
    console.log(obj, '=========res')
    try{
    const res=fetch(`${URL}${EndPoints.QualityCreate}`,{
        body:obj,
        method:"POST",
        headers:{
            Accept: 'application/json',
           'Content-Type': 'application/json'
        }
    }).then((a)=>{
        return a.json()
    }).then((v)=>{
        console.log(v,'create');
    })
}catch (error) {
    console.error( error);
  }}
);

export const UpdateQualityData = ({ data, id, toastRef }) => async (dispatch) => {
  try {
    const res = await fetch(`${URL}${EndPoints.UpdateQualityData}?id=${id}`, {
      body: JSON.stringify(data),
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((a) => {
      return a.json();
    });
     // Call the toastRef success function
    return res;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to keep the promise rejected
  }
};

const QualitySlice = createSlice({
  name: 'Quality',
  initialState,
  reducers: {
    SearchData: (state, action) => {
      const dt = state.QualityData;
      const search = action.payload?.trim().toLowerCase();
      if (search === '') {
        state.QualityData = state.QualityOldDt;
      } else {
        const data = dt?.filter(v => v.name?.toLowerCase().includes(search));
        state.QualityData = data?.length > 0 ? data : state.QualityOldDt;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(GetQualityData.fulfilled, (state, action) => {
        state.QualityData = action.payload;
        state.QualityOldDt = action.payload;
        state.QualityPending = false;
      })
      .addCase(GetQualityData.pending, state => {
        state.QualityPending = true;
        console.log('state.QualityPending: ', state.QualityPending);
      })
      .addCase(GetQualityData.rejected, state => {
        state.QualityPending = false;
      });
  },
});

export const {SearchData} = QualitySlice.actions;
export default QualitySlice.reducer;
