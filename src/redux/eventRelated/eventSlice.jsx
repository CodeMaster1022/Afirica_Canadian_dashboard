import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventList: [],
  eventDetails: [],
  total_count: 0,
  has_more: false,
  tablePage: 1,
  items_per_page: 10,
  // subjectDetails: [],
  loading: false,
  error: 'This is error',
  response: null,
  getresponse: null
};

const eventSlice = createSlice({
  name: 'event',
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
    getSuccess: (state) => {
      state.loading = false;
    },
    getEventSuccess: (state, action) => {
      state.eventList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getEventDetailSuccess: (state, action) => {
      state.eventDetails = action.payload;
      loading = false;
    }
  }
});

export const {
  getRequest,
  getActivateSuccess,
  getEventSuccess,
  getMemberDetails,
  getPaginationState,
  getFailedTwo,
  getError,
  getSuccess,
  getEventDetailSuccess
} = eventSlice.actions;

export const eventReducer = eventSlice.reducer;
