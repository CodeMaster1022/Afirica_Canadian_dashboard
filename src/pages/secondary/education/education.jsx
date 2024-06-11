import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import MainCard from 'components/MainCard';
import RequestLoader from 'components/waiting/RequestLoader';
import EducationTable from './educationTable';
import AddNewEducation from './modal/addNewEducation';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getEducation } from 'redux/education/educationHandle';
import { getGroup } from 'redux/groupRelated/groupHandle';
import { getCategory } from 'redux/categoryRelated/categoryHandle';

export default function Updates() {
  const dispatch = useDispatch();
  const { educationList, loading, status } = useSelector((state) => state.education);
  const [newUpdateOpen, setNewUpdateOpen] = useState(false);
  const newUpdateModalClose = () => setNewUpdateOpen(false);
  const newUpdateModalOpen = () => setNewUpdateOpen(true);
  useEffect(() => {
    dispatch(getEducation());
    dispatch(getGroup());
    dispatch(getCategory());
  }, [dispatch]);
  useEffect(() => {
    if (status === 'added') {
      console.log('street');
      dispatch(getEducation());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, status]);
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUpdateModalOpen}>
          Create New Update
        </Button>
      </Box>
      <MainCard>{loading ? <RequestLoader /> : <EducationTable rows={educationList} />}</MainCard>
      <AddNewEducation modalOpen={newUpdateOpen} modalClose={newUpdateModalClose} action="create" />
    </>
  );
}
