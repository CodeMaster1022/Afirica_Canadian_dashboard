import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  educationList: [],
  educationDetailes: [],
  loading: false,
  error: null,
  response: null,
  total_count: 0,
  has_more: false,
  tablePage: 1,
  items_per_page: 5,
  getresponse: null
};

const educationSlice = createSlice({
  name: 'education',
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
    getEducationSuccess: (state, action) => {
      state.educationList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getEducationDetailedSuccess: (state, action) => {
      state.educationDetailes = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
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
  getPaginationState,
  getEducationSuccess,
  getEducationDetailedSuccess,
  getEducationDetailedFailed,
  getError
} = educationSlice.actions;

export const educationReducer = educationSlice.reducer;
