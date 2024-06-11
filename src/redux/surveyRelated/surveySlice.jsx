// import { createSlice } from '@reduxjs/toolkit';
// import { createSurvey, getSurveyCommunity } from './surveyHandle';

// const initialState = {
//   title: null,
//   survey_url: null,
//   user_id: null,
//   description: null,
//   communityId: null,
//   startDate: null,
//   endDate: null,
//   loading: false,
//   error: null,
//   // total_count: 0,
//   // has_more: false,
//   // tablePage: 1,
//   // items_per_page: 5,
//   response: null
// };

// const surveySlice = createSlice({
//   name: 'survey',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createSurvey.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createSurvey.fulfilled, (state, action) => {
//         state.loading = false;
//         state.response = action.payload;
//       })
//       .addCase(createSurvey.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(getSurveyCommunity.pending, ([]) => {
//         console.log();
//       });
//     // .addCase(getPagination.fulfilled, (state, action) => {
//     //   state.total_count = action.payload.totalCount;
//     //   state.has_more = action.payload.hasMore;
//     //   state.tablePage = action.payload.tablePage;
//     //   state.items_per_page = action.payload.itemsPerPage;
//     // });
//   }
// });

// export const surveyReducer = surveySlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  surveyList: [],
  surveyDetailes: [],
  loading: false,
  error: null,
  response: null,
  total_count: 0,
  has_more: false,
  tablePage: 1,
  items_per_page: 5,
  getresponse: null
};

const surveySlice = createSlice({
  name: 'survey',
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
    getSurveySuccess: (state, action) => {
      state.surveyList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getSurveyDetailedSuccess: (state, action) => {
      state.surveyDetailes = action.payload;
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

export const { getRequest, getSuccess, getPaginationState, getSurveySuccess, getSurveyDetailedSuccess, getSurveyDetailedFailed, getError } =
  surveySlice.actions;

export const surveyReducer = surveySlice.reducer;
