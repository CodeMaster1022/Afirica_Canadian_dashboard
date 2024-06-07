import useAxios from 'utils/useAxios';
import Swal from 'sweetalert2';
import { getRequest, getjobsSuccess, getPaginationState, getFailedTwo, getError, getjobsDetailSuccess } from './jobsSlice';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});

export const jobsCreate =
  ({ input }) =>
  async () => {
    const axiosInstance = useAxios();
    try {
      const result = await axiosInstance.post('/admin/jobs/create/', input);
      console.log(result.data.message);
      if (result) {
        Toast.fire({
          icon: 'success',
          position: 'center',
          text: `${result.data.message}`,
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
  dispatch(getRequest());
  try {
    const result = await axiosInstance.post(`/admin/jobs/${id}/`);
    if (result.data) {
      dispatch(getjobsDetailSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};

export const jobsUpdate =
  ({ id, input }) =>
  async () => {
    const axiosInstance = useAxios();
    try {
      const result = await axiosInstance.patch(`/admin/jobs/${id}/`, input);
      console.log(result.data.message);
      if (result) {
        Toast.fire({
          icon: 'success',
          position: 'center',
          text: `${result.data.message}`,
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
export const jobsDelete = (id) => async () => {
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.delete(`/admin/jobs/${id}/`);
    console.log(result.data.message);
    if (result) {
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${result.data.message}`,
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
