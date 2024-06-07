import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groupMembers: [],
  // subjectDetails: [],
  loading: false,
  memberLoading: false,
  subloading: false,
  error: 'This is error',
  response: null,
  getresponse: null
};

const groupMemberSlice = createSlice({
  name: 'groupMember',
  initialState,
  reducers: {
    getMembersSuccess: (state, action) => {
      state.groupMembers = action.payload;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
      state.memberLoading = false;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getMembersSuccess, getError } = groupMemberSlice.actions;

export const groupMemberReducer = groupMemberSlice.reducer;
