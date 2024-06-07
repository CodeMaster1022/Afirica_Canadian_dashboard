import {
  getRequest,
  getUpdatesSuccess
  // getUpdatesDetailedSuccess,
  // getUpdatesFailed,
  // getUpdatesDetailedFailed,
  // getError
} from './updateSlice';
export const getUpdates = (data) => async (dispatch) => {
  dispatch(getRequest());
  dispatch(getUpdatesSuccess(data));
};
