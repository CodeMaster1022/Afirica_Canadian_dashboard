import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryList: [],
  categoryDetailes: [],
  loading: false,
  error: null
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCategorySuccess: (state, action) => {
      state.categoryList = action.payload;
      state.loading = false;
      state.error = false;
    }
  }
});

export const { getCategorySuccess, getError, getRequest } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
