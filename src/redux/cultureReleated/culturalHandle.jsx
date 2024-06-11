import useAxios from 'utils/useAxios';
import { getRequest, getPaginationState, getCulturalSuccess, getCulturalDetailedSuccess, getError } from './culturalSlice';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});
export const getCultural = (rowsPerPage, newPage) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get('admin/cultural-showcases/', {
      params: {
        page: newPage,
        items_per_page: rowsPerPage
      }
    });
    if (result.data) {
      dispatch(getCulturalSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const getCulturalById = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get(`admin/cultural-showcases/${id}`);
    if (result.data) {
      dispatch(getCulturalDetailedSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const culturalDelete = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const response = await axiosInstance.delete(`admin/cultural-showcases/${id}/`);
    console.log(response);
    if (response.data) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${response.data}`,
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
    dispatch(getError(error.data));
  }
};
export const culturalCreate = (data) => async (dispatch) => {
  console.log(data);
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const response = await axiosInstance.post(`admin/cultural-showcases/`, data);
    console.log(response);
    if (response.data) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `Created`,
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
    dispatch(getError(error.data));
  }
};
export const culturalUpdate = (id, data) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const response = await axiosInstance.patch(`admin/cultural-showcases/${id}/`, data);
    console.log(response);
    if (response.data.message) {
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${response.data.message}`,
        title: 'Success!'
      });
    } else if (response.data.data) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `Updated`,
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
    dispatch(getError(error.data));
  }
};
