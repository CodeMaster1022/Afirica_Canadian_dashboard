import useAxios from 'utils/useAxios';
import { getRequest, getSuccess, getPaginationState, getSurveySuccess, getError } from './surveySlice';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});
export const getSurvey = (rowsPerPage, newPage) => async (dispatch) => {
  const axiosInstance = useAxios();
  console.log('survey', rowsPerPage, newPage);
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get('/admin/surveys/', {
      params: {
        page: newPage,
        items_per_page: rowsPerPage
      }
    });
    if (result.data) {
      dispatch(getSurveySuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const surveyDelete = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const response = await axiosInstance.delete(`admin/surveys/${id}/`);
    console.log(response);
    if (response.data) {
      dispatch(getSuccess());
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${response.data.request.statusText}`,
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
export const surveyCreate = (data) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const response = await axiosInstance.post(`admin/surveys/create/`, data);
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
export const surveyUpdate = (id, data) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const response = await axiosInstance.patch(`admin/surveys/${id}/`, data);
    console.log(response);
    if (response.data) {
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
// try {
//   const response = await axiosInstance.patch(`/surveys/${surveyInfo.id}/`, nonEmptyData);
//   console.log(response.data);
//   setEdit(false);
//   modalClose();
// } catch (error) {
//   console.log(error.response.data);
// }
