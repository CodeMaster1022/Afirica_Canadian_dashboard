import { createSlice } from '@reduxjs/toolkit';
// import { countries } from 'data/location';
const initialState = {
  search: '',
  countyName: '',
  countySearch: '',
  data: [],
  countAlbertaMember: [],
  tabnumber: 0
  // maxCount: data.length
};

const mapFilterSlice = createSlice({
  name: 'mapFilter',
  initialState,
  reducers: {
    getAlbertaMember: (state) => {
      // state.countAlbertaMember = countries.filter((city) => city.province === 'Alberta');
      state.countAlbertaMember = [];
    },
    getFilter: (state, action) => {
      state.search = action.payload;
    },
    getCountyFilter: (state, action) => {
      state.countySearch = action.payload;
    },
    getCountyName: (state, action) => {
      state.countyName = action.payload;
    },
    setTabNumber: (state, action) => {
      state.tabnumber = action.payload;
    }
  }
});
export const { getFilter, setTabNumber, getAlbertaMember, getCountyFilter, getCountyName } = mapFilterSlice.actions;
export const mapFilterReducer = mapFilterSlice.reducer;
