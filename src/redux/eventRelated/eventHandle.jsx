import useAxios from 'utils/useAxios';
import Swal from 'sweetalert2';
import { getRequest, getSuccess, getEventSuccess, getPaginationState, getFailedTwo, getEventDetailSuccess, getError } from './eventSlice';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});

export const eventCreate = (data) => async (dispatch) => {
  console.log(data);
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post('/admin/events/', data);
    if (result.data) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'bottom',
        text: 'New event was created!',
        title: 'Success!'
      });
    }
  } catch (error) {
    dispatch(getError(error.data));
    Toast.fire({
      icon: 'error',
      position: 'bottom',
      text: `${error.message}`,
      title: 'Error!'
    });
  }
};
export const getAllEvent = (rowsPerPage, newPage) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('/admin/events/', {
      params: {
        page: newPage,
        items_per_page: rowsPerPage
      }
    });
    if (result.data.data.message) {
      dispatch(getFailedTwo(result.data.data.message));
    } else {
      dispatch(getEventSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    // dispatch(getError(error.data));
  }
};
export const getEventById = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.get(`/admin/events/${id}/`);
    if (result.data) {
      dispatch(getEventDetailSuccess(result.data.data));
    }
  } catch (error) {
    // dispatch(getError(error.data));
    console.log(error);
  }
};
export const getEventByUserId = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post('/admin/events/', {
      params: {
        user_id: id
      }
    });
    if (result.data) {
      dispatch(getEventDetailSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const getEventByCommunityId = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post('/admin/events/', {
      params: {
        community: id
      }
    });
    if (result.data) {
      dispatch(getEventDetailSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const eventUpdate = (userKeycloakId, data) => async (dispatch) => {
  console.log(data);
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.patch(`/admin/events/${userKeycloakId}/`, data);
    if (result.data) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `Updated`,
        title: 'Success!'
      });
    }
  } catch (error) {
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.message}`,
      title: 'Error!'
    });
  }
};
export const eventDelete = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.delete(`/admin/events/${id}/`);
    console.log(result);
    if (result) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `Event was deleted`,
        title: 'Success!'
      });
    }
  } catch (error) {
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error}`,
      title: 'Error!'
    });
  }
};
