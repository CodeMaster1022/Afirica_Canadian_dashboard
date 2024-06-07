import { createSlice } from '@reduxjs/toolkit';
import { countries } from 'data/location';
const initialState = {
  search: '',
  countySearch: '',
  data: countries,
  countAlbertaMember: [],
  tabnumber: 0
  // maxCount: data.length
};

const mapFilterSlice = createSlice({
  name: 'mapFilter',
  initialState,
  reducers: {
    getAlbertaMember: (state) => {
      state.countAlbertaMember = countries.filter((city) => city.province === 'Alberta');
    },
    getFilter: (state, action) => {
      state.search = action.payload;
    },
    getCountyFilter: (state, action) => {
      state.countySearch = action.payload;
    },
    setTabNumber: (state, action) => {
      state.tabnumber = action.payload;
    }
  }
});
export const { getFilter, setTabNumber, getAlbertaMember, getCountyFilter } = mapFilterSlice.actions;
export const mapFilterReducer = mapFilterSlice.reducer;
