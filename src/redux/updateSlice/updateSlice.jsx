import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updatesList: [],
  updatesDetail: [],
  loading: false,
  error: null,
  response: null,
  getresponse: null
};

const updatesSlice = createSlice({
  name: 'updates',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getUpdatesSuccess: (state, action) => {
      state.updatesList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getUpdatesDetailedSuccess: (state, action) => {
      state.updatesDetail = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getUpdatesFailed: (state, action) => {
      state.updatesList = [];
      state.updatesDetail = [];
      state.error = action.payload;
      state.loading = false;
      state.getresponse = false;
    },
    getUpdatesDetailedFailed: (state, action) => {
      state.updatesDetail = [];
      state.loading = false;
      state.error = action.payload;
      state.getresponse = false;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getRequest, getUpdatesSuccess, getUpdatesDetailedSuccess, getUpdatesFailed, getUpdatesDetailedFailed, getError } =
  updatesSlice.actions;

export const updatesReducer = updatesSlice.reducer;
