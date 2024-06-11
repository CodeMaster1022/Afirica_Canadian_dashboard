import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  serviceList: [],
  serviceDetails: {},
  total_count: 0,
  status: 'idle',
  has_more: false,
  tablePage: 1,
  items_per_page: 10,
  // subjectDetails: [],
  loading: false,
  error: 'This is error',
  response: null,
  getresponse: null
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    getPaginationState: (state, action) => {
      state.tablePage = action.payload.page;
      state.total_count = action.payload.totalCount;
      state.has_more = action.payload.hasMore;
      state.items_per_page = action.payload.itemsPerPage;
    },
    getRequest: (state) => {
      state.loading = true;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSuccess: (state) => {
      state.status = 'added';
      state.loading = false;
    },
    getServiceSuccess: (state, action) => {
      state.status = 'idle';
      state.serviceList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getServiceDetailSuccess: (state, action) => {
      state.serviceDetails = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getRequest,
  getServiceSuccess,
  getMemberDetails,
  getPaginationState,
  getFailedTwo,
  getError,
  getSuccess,
  getServiceDetailSuccess
} = serviceSlice.actions;

export const serviceReducer = serviceSlice.reducer;
