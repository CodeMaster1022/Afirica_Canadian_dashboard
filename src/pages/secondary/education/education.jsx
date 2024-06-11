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

export default function Updates() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEducation());
  }, [dispatch]);
  const { educationList, loading } = useSelector((state) => state.education);
  const [newUpdateOpen, setNewUpdateOpen] = useState(false);
  const newUpdateModalClose = () => setNewUpdateOpen(false);

  const newUpdateModalOpen = () => setNewUpdateOpen(true);
  return (
    <>
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUpdateModalOpen}>
          Create New Update
        </Button>
      </Box>
      <MainCard>{loading ? <RequestLoader /> : <EducationTable rows={educationList} />}</MainCard>
      <AddNewEducation modalOpen={newUpdateOpen} modalClose={newUpdateModalClose} />
    </>
  );
}
