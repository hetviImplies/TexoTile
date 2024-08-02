import {createSlice, isPending} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  CreateQualityAPI,
  GetAllQualityAPI,
  UpdateQualityAPI,
} from '../services/QualityAPI';
import axios from 'axios';
import {EndPoints} from '../URLs/EndPoints';

const initialState = {
  QualityData: null,
  QualityPending: true,
  QualityOldDt: null,
};

export const GetQualityData = createAsyncThunk('get quality data', async () => {
  const response = await GetAllQualityAPI();
  return response.result.data;
});

export const CreateQualityData = createAsyncThunk(
  'Create quality data',
  async obj => {
    try {
      const res = await CreateQualityAPI(obj);
      return res;
    } catch (error) {
      throw error;
    }
  },
);

export const UpdateQualityData =
  ({data, id}) =>
  async () => {
    try {
      const res = await UpdateQualityAPI(data, id);
      return res;
    } catch (error) {
      throw error;
    }
  };

const QualitySlice = createSlice({
  name: 'Quality',
  initialState,
  reducers: {
    SearchData: (state, action) => {
      const dt = state.QualityData;
      const search = action.payload;
      if (search === '') {
        state.QualityData = state.QualityOldDt;
      } else {
        const data = state.QualityOldDt?.filter(v =>
          v.name?.toLowerCase().includes(search?.toLowerCase()),
        );
        state.QualityData = data;
      }
    },
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
      })
      .addCase(GetQualityData.rejected, state => {
        state.QualityPending = false;
      });
  },
});

export const {SearchData} = QualitySlice.actions;
export default QualitySlice.reducer;
