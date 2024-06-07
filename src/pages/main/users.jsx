import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import UseraTable from 'pages/tables/mui-table/UsersTable';
import MainCard from 'components/MainCard';
import AddNewUserProfile from 'pages/main/Modal/addNewUser';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCommunity } from 'redux/communityRelated/communityHandle';
// Request Loader
import RequestLoader from 'components/waiting/RequestLoader';
import { getUsers } from 'redux/userRelated/userHandle';
export default function Users() {
  const { loading } = useSelector((state) => state.users);
  const [newUserOpen, setNewUserOpen] = useState(false);
  const newUserModalOpen = () => setNewUserOpen(true);
  const newUserModalClose = () => setNewUserOpen(false);
  // Fetch Users Data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCommunity());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUserModalOpen}>
          Add New User
        </Button>
      </Box>
      <MainCard>{loading ? <RequestLoader /> : <UseraTable />}</MainCard>
      <AddNewUserProfile modalOpen={newUserOpen} modalClose={newUserModalClose} />
    </>
  );
}
