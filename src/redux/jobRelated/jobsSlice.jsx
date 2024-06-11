import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  jobsList: [],
  loading: false,
  jobsDetails: [],
  total_count: 0,
  has_more: false,
  tablePage: 1,
  items_per_page: 10,
  subloading: false,
  error: 'This is error',
  response: null,
  getresponse: null
};

const jobSlice = createSlice({
  name: 'job',
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
      state.memberLoading = true;
    },
    getjobsSuccess: (state, action) => {
      state.status = 'idle';
      state.jobsList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getSuccess: (state) => {
      state.status = 'added';
      state.loading = false;
    },
    getjobsDetailSuccess: (state, action) => {
      state.jobsDetails = action.payload;
      state.loading = false;
    },
    getFailedTwo: (state, action) => {
      state.getresponse = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getRequest, getjobsSuccess, getSuccess, getPaginationState, getFailedTwo, getError, getjobsDetailSuccess } =
  jobSlice.actions;

export const jobReducer = jobSlice.reducer;
