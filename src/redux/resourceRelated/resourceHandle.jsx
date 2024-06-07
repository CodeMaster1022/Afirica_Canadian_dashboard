import useAxios from 'utils/useAxios';
import Swal from 'sweetalert2';
import {
  getRequest,
  getSuccess,
  getResourceSuccess,
  getResourceDetailedSuccess,
  // getResourceFailed,
  getResourceDetailedFailed,
  getError
} from './resourceSlice';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});

export const getResource = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get('/admin/resources/');
    if (result.data) {
      dispatch(getResourceSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const resourceDetails = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`/posts/resource/${id}`);
    if (result.data.message) {
      dispatch(getResourceDetailedFailed(result.data.message));
    } else {
      dispatch(getResourceDetailedSuccess(result.data));
    }
  } catch {
    dispatch(getError(error));
  }
};
export const resourceApprove = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post(`admin/resources/${id}/approve_post/`);
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
export const resourceReject = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post(`admin/resources/${id}/reject_post/`);
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
