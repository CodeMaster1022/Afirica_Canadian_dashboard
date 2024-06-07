import { createSlice } from '@reduxjs/toolkit';
import { createSurvey, getSurveyCommunity } from './surveyHandle';

const initialState = {
  title: null,
  survey_url: null,
  user_id: null,
  description: null,
  communityId: null,
  startDate: null,
  endDate: null,
  loading: false,
  error: null,
  response: null
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSurvey.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(createSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSurveyCommunity.pending, ([]) => {
        console.log();
      });
  }
});

export const surveyReducer = surveySlice.reducer;
