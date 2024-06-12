import useAxios from 'utils/useAxios';
import Swal from 'sweetalert2';
import { getRequest, getjobsSuccess, getSuccess, getPaginationState, getError, getjobsDetailSuccess } from './jobsSlice';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});

export const jobsCreate =
  ({ input }) =>
  async (dispatch) => {
    dispatch(getRequest());
    const axiosInstance = useAxios();
    try {
      const result = await axiosInstance.post('/admin/jobs/create/', input);
      if (result.data.message) {
        dispatch(getError(result.data.message));
        Toast.fire({
          icon: 'warning',
          position: 'center',
          text: `${result.data.message}`,
          title: 'Success!'
        });
      } else {
        dispatch(getSuccess());
        Toast.fire({
          icon: 'success',
          position: 'center',
          text: `Created`,
          title: 'Success!'
        });
      }
    } catch (error) {
      dispatch(getError(error.data));
      console.log(error);
      Toast.fire({
        icon: 'error',
        position: 'center',
        text: `${error.message}`,
        title: 'Error!'
      });
    }
  };
export const getAlljobs = (newPage, rowsPerPage) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('/admin/jobs/', {
      params: {
        page: newPage,
        items_per_page: rowsPerPage
      }
    });
    if (result.data.data) {
      dispatch(getjobsSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const getjobsById = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  // dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`/admin/jobs/${id}/`);
    if (result.data) {
      dispatch(getjobsDetailSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
    console.log(error);
  }
};

export const jobsUpdate = (id, data) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.patch(`/admin/jobs/${id}/`, data);
    if (result) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `Updated!`,
        title: 'Success!'
      });
    }
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.data}`,
      title: 'Error!'
    });
  }
};
export const jobsDelete = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.delete(`/admin/jobs/${id}/`);
    if (result) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `Deleted!`,
        title: 'Success!'
      });
    }
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.message}`,
      title: 'Error!'
    });
  }
};
