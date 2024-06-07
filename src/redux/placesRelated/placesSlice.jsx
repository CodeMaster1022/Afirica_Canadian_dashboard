import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  placesList: [],
  placesDetailes: [],
  placesLoading: false,
  error: null,
  response: null,
  loading: false,
  getresponse: null,
  totalCount: 0,
  hasMore: false,
  tablePage: 1,
  itemsPerPage: 10
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getPaginationState: (state, action) => {
      state.tablePage = action.payload.page;
      state.totalCount = action.payload.totalCount;
      state.hasMore = action.payload.hasMore;
      state.itemsPerPage = action.payload.itemsPerPage;
    },
    getPlacesSuccess: (state, action) => {
      state.placesList = action.payload;
      state.placesLoading = false;
      state.error = false;
      state.getresponse = null;
    },
    getPlacesDetailedSuccess: (state, action) => {
      state.placesDetailes = action.payload;
      state.placesLoading = false;
      state.error = false;
      state.getresponse = null;
    },
    getPlacesFailed: (state, action) => {
      state.placesList = [];
      state.placesDetailes = [];
      state.error = action.payload;
      state.placesLoading = false;
      state.getresponse = false;
    },
    getPlacesDetailedFailed: (state, action) => {
      state.placesDetailes = [];
      state.placesLoading = false;
      state.error = action.payload;
      state.getresponse = false;
    },
    getError: (state, action) => {
      state.placesLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getRequest,
  getPaginationState,
  getPlacesSuccess,
  getPlacesDetailedSuccess,
  getPlacesFailed,
  getPlacesDetailedFailed,
  getError
} = placesSlice.actions;

export const placesReducer = placesSlice.reducer;
