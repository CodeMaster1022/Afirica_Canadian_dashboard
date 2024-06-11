import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import AddSurvey from './modal/addSurvey';
import ReusableTable from './reusableTable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSurvey } from 'redux/surveyRelated/surveyHandle';
import { getCommunity } from 'redux/communityRelated/communityHandle';
import RequestLoader from 'components/waiting/RequestLoader';
export default function Surveys() {
  const [newUserOpen, setNewUserOpen] = useState(false);
  const dispatch = useDispatch();
  const newUserModalOpen = () => setNewUserOpen(true);
  const newUserModalClose = () => setNewUserOpen(false);
  const { loading } = useSelector((state) => state.survey);
  useEffect(() => {
    dispatch(getSurvey());
    dispatch(getCommunity());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUserModalOpen}>
          Create Survey
        </Button>
      </Box>
      <MainCard>{loading ? <RequestLoader /> : <ReusableTable />}</MainCard>
      <AddSurvey modalOpen={newUserOpen} modalClose={newUserModalClose} />
    </>
  );
}
