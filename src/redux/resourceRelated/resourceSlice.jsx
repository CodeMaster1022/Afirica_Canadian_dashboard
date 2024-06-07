import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resourceList: [],
  resourceDetailes: [],
  loading: false,
  error: null,
  response: null,
  getresponse: null
};

const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getResourceSuccess: (state, action) => {
      state.resourceList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getResourceDetailedSuccess: (state, action) => {
      state.resourceDetailes = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getResourceFailed: (state, action) => {
      state.resourceDetailes = [];
      state.error = action.payload;
      state.loading = false;
      state.getresponse = false;
    },
    getResourceDetailedFailed: (state, action) => {
      state.resourceDetailes = [];
      state.loading = false;
      state.error = action.payload;
      state.getresponse = false;
    },
    getSuccess: (state) => {
      state.loading = false;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getRequest,
  getSuccess,
  getResourceSuccess,
  getResourceDetailedSuccess,
  getResourceFailed,
  getResourceDetailedFailed,
  getError
} = resourceSlice.actions;

export const resourceReducer = resourceSlice.reducer;
