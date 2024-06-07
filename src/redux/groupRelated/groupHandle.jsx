import useAxios from 'utils/useAxios';
import Swal from 'sweetalert2';
import { getRequest, getGroupSuccess, getPaginationState, getGroupDetails, getMemberDetails, getFailedTwo, getError } from './groupSlice';
import { getMembersSuccess } from './groupMemberSlice';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});

export const getGroup = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('admin/communities/2/groups/');
    if (result.data.data.message) {
      dispatch(getFailedTwo(result.data.data.message));
    } else {
      dispatch(getGroupSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};

export const getOptionGroup = (rowsPerPage, newPage) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('/admin/communities/2/groups/', {
      params: {
        page: newPage,
        items_per_page: rowsPerPage
      }
    });
    if (result.data.data.message) {
      dispatch(getFailedTwo(result.data.data.message));
    } else {
      dispatch(getGroupSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const getGroupMembers = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.get(`/posts/groups/${id}/members-by-role/`, {
      params: {
        role: 'admin'
      }
    });
    if (result.data) {
      dispatch(getMembersSuccess(result.data.admin));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const groupDetails = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`/commuities/${id}`);
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getGroupDetails(result.data));
    }
  } catch {
    dispatch(getError(error));
  }
};
export const groupDeactivate = (id) => async () => {
  const axiosInstance = useAxios();
  // dispatch(getRequest());
  try {
    const result = await axiosInstance.post(`/admin/groups/${id}/deactivate/`);
    if (result.data.data) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${result.data.message}`,
        showConfirmButton: false,
        timer: 2000
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
export const groupReactivate = (id) => async () => {
  const axiosInstance = useAxios();
  // dispatch(getRequest());
  try {
    const result = await axiosInstance.post(`admin/groups/${id}/reactivate/`);
    if (result.data.data) {
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
export const groupDelete = (id) => async () => {
  const axiosInstance = useAxios();
  // dispatch(getRequest());
  try {
    const result = await axiosInstance.delete(`/admin/groups/${id}/`);
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
export const getMembers = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`/commuities/${id}/${address}`);
    if (result.data.message) {
      dispatch(getFailedTwo(result.message));
    } else {
      dispatch(getMembersSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const getMembersDetails = (id, address, memberID) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`/commuities/${id}/${address}/${memberID}`);
    if (result.data.message) {
      dispatch(getFailedTwo(result.message));
    } else {
      dispatch(getMemberDetails(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
