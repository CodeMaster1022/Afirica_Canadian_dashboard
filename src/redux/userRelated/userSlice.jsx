import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  usersList: [],
  userDetail: [],
  loading: false,
  error: [],
  total_count: 0,
  has_more: false,
  tablePage: 1,
  items_per_page: 10,
  getresponse: null,
  tempDetails: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getPaginationState: (state, action) => {
      state.tablePage = action.payload.page;
      state.total_count = action.payload.totalCount;
      state.has_more = action.payload.hasMore;
      state.items_per_page = action.payload.itemsPerPage;
    },
    authRequest: (state) => {
      state.status = 'loading';
    },
    underControl: (state) => {
      state.status = 'idle';
      state.loading = false;
      state.getresponse = null;
    },
    getRequest: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, action) => {
      state.usersList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getUserDetailedSuccess: (state, action) => {
      state.userDetail = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getUsersFailed: (state, action) => {
      state.getresponse = action.payload;
      state.loading = false;
      state.error = false;
    },
    getUsersDetailedFailed: (state, action) => {
      state.loading = false;
      state.getresponse = action.payload;
    },
    getError: (state, action) => {
      state.loading = false;
      state.status = 'error';
      state.error = action.payload;
    },
    userAdded: (state, action) => {
      state.status = 'added';
      state.getresponse = null;
      state.loading = false;
      state.error = null;
      state.tempDetails = action.payload;
    },
    authFailed: (state, action) => {
      state.status = 'failed';
      state.getresponse = action.payload;
    },
    getDeleteSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.getresponse = null;
    }
  }
});

export const {
  getRequest,
  userAdded,
  authFailed,
  getUsersSuccess,
  getUserDetailedSuccess,
  getUsersFailed,
  getUsersDetailedFailed,
  getError,
  getDeleteSuccess,
  underControl,
  getPaginationState
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
