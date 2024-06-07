import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import EventTable from 'pages/tables/mui-table/eventTable';
import MainCard from 'components/MainCard';
import AddNewEvent from './Modal/addNewEvent';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvent } from 'redux/eventRelated/eventHandle';
// Request Loader
import RequestLoader from 'components/waiting/RequestLoader';
export default function Events() {
  const { loading } = useSelector((state) => state.event);
  const [newUserOpen, setNewUserOpen] = useState(false);
  const newUserModalOpen = () => setNewUserOpen(true);
  const newUserModalClose = () => setNewUserOpen(false);
  // Fetch Users Data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvent());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUserModalOpen}>
          Add New Event
        </Button>
      </Box>
      <MainCard>{loading ? <RequestLoader /> : <EventTable />}</MainCard>
      <AddNewEvent modalOpen={newUserOpen} modalClose={newUserModalClose} action="create" />
    </>
  );
}
