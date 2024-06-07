import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

const SURVEY_ENDPOINT_URL = `${import.meta.env.VITE_API_APP_ROUTE}/api/v1/admin/surveys`;
const COMMUNITY_ENDPOINT_URL = `${import.meta.env.VITE_API_APP_ROUTE}api/v1/admin/communities/`;

// create Survey
export const createSurvey = createAsyncThunk('createSurvey', async (data, token) => {
  console.log(token);
  try {
    const response = await axios.post(`${SURVEY_ENDPOINT_URL}/create/`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);

    return isRejectedWithValue(error.response);
  }
});

export const getSurveyCommunity = createAsyncThunk('getSurveyCommunity', async () => {
  try {
    const response = await axios.get(`${COMMUNITY_ENDPOINT_URL}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});

// get Survey
export const showSurvey = createAsyncThunk('showSurvey', async (data) => {
  try {
    const response = await axios.get(POST_URL, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});

// update Survey
export const updateSurvey = createAsyncThunk('updateSurvey', async (data) => {
  try {
    const response = await axios.put(`https://648c3b3f8620b8bae7ec8260.mockapi.io/crud/${data.id}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});

// delete Survey
export const deleteSurvey = createAsyncThunk('deleteSurvey', async (id) => {
  try {
    const response = await axios.delete(`https://648c3b3f8620b8bae7ec8260.mockapi.io/crud/${id}`);
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
