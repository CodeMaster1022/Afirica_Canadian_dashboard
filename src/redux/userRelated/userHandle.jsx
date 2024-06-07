import useAxios from 'utils/useAxios';
import Swal from 'sweetalert2';
import {
  getRequest,
  getUsersSuccess,
  // authFailed,
  getUserDetailedSuccess,
  // getUsersFailed,
  // getUsersDetailedFailed,
  getPaginationState,
  getError,
  userAdded
} from './userSlice';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});

export const getUsers = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('/admin/users/');
    if (result.data.data) {
      dispatch(getPaginationState(result.data));
      dispatch(getUsersSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const getOptionUsers = (rowsPerPage, newPage) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('/admin/users/', {
      params: {
        page: newPage,
        items_per_page: rowsPerPage
      }
    });
    if (result.data.data) {
      dispatch(getPaginationState(result.data));
      dispatch(getUsersSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const addUser =
  ({ input }) =>
  async (dispatch) => {
    dispatch(getRequest());
    const axiosInstance = useAxios();
    try {
      const result = await axiosInstance.post('/users/user', input, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (result.data) {
        dispatch(userAdded(result.data.data));
      }
    } catch (error) {
      dispatch(getError(error.response.data.message));
    }
  };
export const userDeactivate = (id) => async () => {
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.patch(`/users/user/activate/${id}`);
    if (result.data.data) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${result.response.data.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  } catch (error) {
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.response.data.message}`,
      title: 'Error!'
    });
  }
};
export const userReactivate = (id) => async () => {
  const axiosInstance = useAxios();
  // dispatch(getRequest());
  try {
    const result = await axiosInstance.post(`/users/user/activate/${id}`);
    if (result.data.data) {
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${result.data.data.message}`,
        title: 'Success!'
      });
    }
  } catch (error) {
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.response.data.message}`,
      title: 'Error!'
    });
  }
};
export const userDelete = (id) => async () => {
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.delete(`/users/user/${id}/`);
    if (result.data.data) {
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${result.response.data.message}`,
        title: 'Success!'
      });
    }
  } catch (error) {
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.response.data.message}`,
      title: 'Error!'
    });
  }
};
export const userDetail = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.get(`/users/user/${id}/`);
    if (result.data.data) {
      getUserDetailedSuccess(result.data.data);
    }
  } catch (error) {
    dispatch(getError(error.resonse.data));
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.response.data.message}`,
      title: 'Error!'
    });
  }
};
