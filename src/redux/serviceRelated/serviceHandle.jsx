import useAxios from 'utils/useAxios';
import Swal from 'sweetalert2';
import {
  getRequest,
  getServiceSuccess,
  getPaginationState,
  getFailedTwo,
  getError,
  getSuccess,
  getServiceDetailSuccess
} from './serviceSlice';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});

export const serviceCreate = (data) => async (dispatch) => {
  console.log(data);
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post('/admin/services/', data);
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
export const getService = (rowsPerPage, newPage) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('admin/services/', {
      params: {
        page: newPage,
        items_per_page: rowsPerPage
      }
    });
    if (result.data.data.message) {
      dispatch(getFailedTwo(result.data.data.message));
    } else {
      dispatch(getServiceSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    // dispatch(getError(error.data));
  }
};
export const getServiceById = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.get(`/admin/events/${id}/`);
    if (result.data) {
      dispatch(getServiceDetailSuccess(result.data.data));
    }
  } catch (error) {
    // dispatch(getError(error.data));
    console.log(error);
  }
};
export const getServiceByUserId = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post('/admin/events/', {
      params: {
        user_id: id
      }
    });
    if (result.data) {
      dispatch(getServiceDetailSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const getServiceByCommunityId = (id) => async (dispatch) => {
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
export const serviceUpdate =
  ({ data }) =>
  async () => {
    const axiosInstance = useAxios();
    try {
      const result = await axiosInstance.patch(`/admin/events/${userKeycloakId}/`, data);
      if (result) {
        Toast.fire({
          icon: 'success',
          position: 'center',
          text: `${result.data.message}`,
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
export const serviceDelete = (id) => async () => {
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.delete(`/admin/events/${id}/`);
    console.log(result);
    if (result) {
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
