import {createSlice, isPending} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetAllQualityAPI} from '../services/QualityAPI';
import axios from 'axios';
import {jsx} from 'react/jsx-runtime';
import {URL} from '../URLs/URL';
import {EndPoints} from '../URLs/EndPoints';
import { GetAllCompanyDataAPI, GetAllYarnDataAPI, GetOneYarnAPI, YarnDataUpdateAPI } from '../services/YarnAPI';
const initialState = {
  YarnData: [],
  YarnPending: false,
  YarnOldDt: null,
  _Quality_Data: null,
  YarnCompanyData: [],
  YarnCompanyPending: false,
  YarnCompanyoldData: null,
  activityData: null,

};

export const GetYarnData = createAsyncThunk('get Yarn data', async () => {
    const response = await GetAllYarnDataAPI()
    return response
});

export const GetCompanyData = createAsyncThunk('get Company data', async () => {
    const response = await GetAllCompanyDataAPI()
    return response;
});

export const GetYarn = createAsyncThunk('get one Yarn data', async id => {
  const response = await GetOneYarnAPI(id)
  return response;
});

export const YarnDataUpdate = createAsyncThunk(
  'Yarn Data Update',
  async ({id, name, rate, isAll, qualityIds}) => {
      let obj = {};
      if (isAll || qualityIds) {
        if (isAll) {
          obj = {
            name: name,
            rate: rate,
            isAll: isAll,
          };
        } else if (qualityIds) {
          obj = {
            name: name,
            rate: rate,
            qualityIds: qualityIds,
          };
        }
      } else {
        obj = {
          name: name,
          rate: rate,
        };
      }
      const response = await YarnDataUpdateAPI(id,obj)
      return response;
  },
);

export const AddYarnData = createAsyncThunk('Add Yarn data', async obj => {
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
});

export const AddYarnCompany = createAsyncThunk(
  'Add Yarn Company',
  async obj => {
    try {
      const response = await axios.post(
        `${URL}${EndPoints.AddYarnCompany}`,
        obj,{
          validateStatus:false
        }
      );
      return response.data
    } catch (error) {
      throw error
    }
  },
);

export const GetYarnQualityData = createAsyncThunk(
  'get Quality data from Yarn',
  async id => {
    const response = await axios.get(
      `${URL}${EndPoints.GetYarnQualityData}?yarn=${id}`,
    );
    return response.data.result.data;
  },
);

export const GetYarnActivity = createAsyncThunk(
  'get Activity from Yarn',
  async ({id}) => {
    const response = await axios.get(
      `${URL}${EndPoints.GetYarnActivity}?yarn=${id}`,
    );
    return response.data.result;
  },
);
const YarnSlice = createSlice({
  name: 'Yarn',
  initialState,
  reducers: {
    SearchData: (state, action) => {
      const dt = state.YarnData;
      const searchTerm = action.payload?.toLowerCase();
      if (searchTerm === '') {
        state.YarnData = state.YarnOldDt;
      } else {
        const filteredData = state.YarnOldDt?.filter(v =>
          v.name.toLowerCase().includes(searchTerm?.toLowerCase()),
        );
        state.YarnData = filteredData;
      }
    },

    SearchCompanyData: (state, action) => {
      const dt = state.YarnCompanyData;
      const search = action.payload?.toLowerCase();
      if (search === '') {
        state.YarnCompanyData = state.YarnCompanyoldData;
      } else {
        const data = state.YarnCompanyoldData?.filter(v => v.name?.toLowerCase().includes(search?.toLowerCase()));
        state.YarnCompanyData = data;
      }
    },
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
    builder
      .addCase(GetYarnQualityData.fulfilled, (state, action) => {
        state._Quality_Data = action.payload;
      })
      .addCase(GetYarnQualityData.rejected, () => {
        console.log('rejected');
      });
    builder
      .addCase(GetCompanyData.fulfilled, (state, action) => {
        state.YarnCompanyData = action.payload;
        state.YarnCompanyPending = false;
        state.YarnCompanyoldData = action.payload;
      })
      .addCase(GetCompanyData.pending, (state, action) => {
        state.YarnCompanyPending = true;
      })
      .addCase(GetCompanyData.rejected, (state, action) => {
        state.YarnCompanyPending = false;
      });
    builder.addCase(GetYarnActivity.fulfilled, (state, action) => {
      state.activityData = action.payload;
    });
  },
});

export const {SearchData, SearchCompanyData} = YarnSlice.actions;
export default YarnSlice.reducer;
