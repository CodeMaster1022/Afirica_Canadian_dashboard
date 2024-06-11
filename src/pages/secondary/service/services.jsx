import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import ServiceTable from './serviceTable';
import MainCard from 'components/MainCard';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getService } from 'redux/serviceRelated/serviceHandle';
import { getCategory } from 'redux/categoryRelated/categoryHandle';
// Request Loader
import RequestLoader from 'components/waiting/RequestLoader';
import AddNewService from './modal/addNewService';

export default function Events() {
  const { loading } = useSelector((state) => state.service);
  const [newUserOpen, setNewUserOpen] = useState(false);
  const newUserModalOpen = () => setNewUserOpen(true);
  const newUserModalClose = () => setNewUserOpen(false);
  // Fetch Users Data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getService());
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUserModalOpen}>
          Add New Service
        </Button>
      </Box>
      <MainCard>{loading ? <RequestLoader /> : <ServiceTable />}</MainCard>
      <AddNewService modalOpen={newUserOpen} modalClose={newUserModalClose} />
    </>
  );
}
