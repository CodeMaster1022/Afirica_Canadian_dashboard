import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import JobTable from './jobsTable';
import MainCard from 'components/MainCard';
import AddNewJob from './modal/addNewJob';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAlljobs } from 'redux/jobRelated/jobHandle';
// Request Loader
import RequestLoader from 'components/waiting/RequestLoader';
export default function Jobs() {
  const { loading, status } = useSelector((state) => state.job);
  const [newUserOpen, setNewUserOpen] = useState(false);
  const newUserModalOpen = () => setNewUserOpen(true);
  const newUserModalClose = () => setNewUserOpen(false);
  // Fetch Users Data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlljobs());
  }, [dispatch, status]);
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUserModalOpen}>
          Add New Jobs
        </Button>
      </Box>
      <MainCard>{loading ? <RequestLoader /> : <JobTable />}</MainCard>
      <AddNewJob modalOpen={newUserOpen} modalClose={newUserModalClose} action="create" />
    </>
  );
}
