import useAxios from 'utils/useAxios';
import {
  getRequest,
  getPlacesSuccess,
  getPlacesDetailedSuccess,
  getPaginationState,
  // getPlacesFailed,
  getPlacesDetailedFailed,
  getError
} from './placesSlice';
import Swal from 'sweetalert2';
import { getSuccess } from 'redux/statusRelated/statusSlice';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});
export const getPlaces = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get('/posts/posts/places');
    if (result.data.data) {
      dispatch(getPlacesSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const getOptionPlaces = (rowsPerPage, newPage) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get('/posts/posts/places', {
      params: {
        page: newPage,
        itemsPerPage: rowsPerPage
      }
    });
    if (result.data.data) {
      dispatch(getPlacesSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const placesDetails = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`posts/posts/places/${id}`);
    if (result.data.message) {
      dispatch(getPlacesDetailedFailed(result.data.message));
    } else {
      dispatch(getPlacesDetailedSuccess(result.data));
    }
  } catch {
    dispatch(getError(error.data));
  }
};
export const placesApprove = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post(`admin/places/${id}/approve_post/`);
    if (result.data.data) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${result.data.message}`,
        title: 'Success!'
      });
    }
  } catch (error) {
    dispatch(getError(error.message));
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.message}`,
      title: 'Error!'
    });
  }
};
export const placesReject = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.post(`admin/places/${id}/reject_post/`);
    if (result.data.data) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${result.data.message}`,
        title: 'Success!'
      });
    }
  } catch (error) {
    dispatch(getError(error.message));
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.message}`,
      title: 'Error!'
    });
  }
};
