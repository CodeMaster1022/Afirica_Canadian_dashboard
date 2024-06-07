import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusList: [],
  statusDetailes: [],
  statusLoading: false,
  error: null,
  response: null,
  total_count: 0,
  has_more: false,
  tablePage: 1,
  items_per_page: 5,
  getresponse: null
};

const statusSlice = createSlice({
  name: 'status',
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
    getStatusSuccess: (state, action) => {
      state.statusList = action.payload;
      state.statusLoading = false;
      state.error = false;
      state.getresponse = null;
    },
    getStatusDetailedSuccess: (state, action) => {
      state.statusDetailes = action.payload;
      state.statusLoading = false;
      state.error = false;
      state.getresponse = null;
    },
    getStatusFailed: (state, action) => {
      state.statusList = [];
      state.statusDetailes = [];
      state.error = action.payload;
      state.statusLoading = false;
      state.getresponse = false;
    },
    getStatusDetailedFailed: (state, action) => {
      state.statusDetailes = [];
      state.statusLoading = false;
      state.error = action.payload;
      state.getresponse = false;
    },
    getError: (state, action) => {
      state.statusLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getRequest,
  getSuccess,
  getPaginationState,
  getStatusSuccess,
  getStatusDetailedSuccess,
  getStatusFailed,
  getStatusDetailedFailed,
  getError
} = statusSlice.actions;

export const statusReducer = statusSlice.reducer;
