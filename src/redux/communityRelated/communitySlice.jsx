import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  communityList: [],
  communityMembers: [],
  communityDetails: [],
  memberDetails: [],
  // subjectDetails: [],
  loading: false,
  subloading: false,
  error: 'This is error',
  response: null,
  getresponse: null
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getCommunitySuccess: (state, action) => {
      state.communityList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getMemberSuccess: (state, action) => {
      state.communityMembers = action.payload;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
    },
    getCommunityDetails: (state, action) => {
      state.communityDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getMemberDetails: (state, action) => {
      state.memberDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFailedTwo: (state, action) => {
      state.communityList = [];
      state.communityMembers = [];
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

export const { getRequest, getCommunitySuccess, getMemberSuccess, getCommunityDetails, getMemberDetails, getFailedTwo, getError } =
  communitySlice.actions;

export const communityReducer = communitySlice.reducer;
