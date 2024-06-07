import useAxios from 'utils/useAxios';
import {
  getRequest,
  getStatusSuccess,
  getSuccess,
  getStatusDetailedSuccess,
  getPaginationState,
  // getStatusFailed,
  // getStatusDetailedFailed,
  getError
} from './statusSlice';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});
export const getStatus = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get('/admin/status/');
    console.log(result.data.totalCount, 'This is the status');
    if (result.data) {
      dispatch(getStatusSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const getOptionStatus = (rowsPerPage, newPage) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get('/admin/status/', {
      params: {
        page: newPage,
        itemsPerPage: rowsPerPage
      }
    });
    console.log(result);
    if (result.data) {
      dispatch(getStatusSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const createStatus =
  ({ image, title, description, group, video, user, documnet }) =>
  async (dispatch) => {
    dispatch(getRequest());
    const axiosInstance = useAxios();
    try {
      const result = await axiosInstance.post('/posts/posts/status/', { image, title, description, group, video, user, documnet });
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
export const updateStatus =
  ({ input, id }) =>
  async (dispatch) => {
    const axiosInstance = useAxios();
    dispatch(getRequest());
    try {
      const result = await axiosInstance.put(`/posts/posts/status/${id}/`, input);
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
export const deleteStatus = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.delete(`/posts/posts/status/${id}/`);
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
export const getStatusByUser = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get(`/posts/posts/status/${id}`);
    console.log(result);
    if (result.data) {
      dispatch(getStatusDetailedSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const statusApprove = (id) => async (dispatch) => {
  console.log('reject');
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.post(`admin/status/${id}/approve_post/`);
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
export const statusReject = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post(`admin/status/${id}/reject_post/`);
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
