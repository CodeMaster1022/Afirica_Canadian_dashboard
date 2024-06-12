import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventList: [],
  status: 'idle',
  eventDetails: {},
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
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSuccess: (state) => {
      state.status = 'added';
      state.loading = false;
    },
    getEventSuccess: (state, action) => {
      state.status = 'idle';
      state.eventList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getEventDetailSuccess: (state, action) => {
      state.eventDetails = action.payload;
      state.loading = false;
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
