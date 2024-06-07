import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import AddSurvey from 'pages/surveys/addSurvey';
import ReusableTable from 'pages/surveys/reusableTable';
import { useEffect, useState } from 'react';
import useAxios from 'utils/useAxios';
export default function Surveys() {
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const newUserModalOpen = () => setNewUserOpen(true);
  const newUserModalClose = () => setNewUserOpen(false);

  const axiosInstance = useAxios();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get('/admin/surveys/').then((res) => {
          console.log(res.data.data,"as");
          setRowData(res.data.data);
        });
      } catch (error) {
        alert(error.res.data);
      }
    };
    fetchData();
  }, []);

  const headers = [
    {
      id: 'id',
      numeric: true,
      disablePadding: true,
      label: 'ID'
    },
    {
      id: 'title',
      numeric: false,
      disablePadding: false,
      label: 'Title'
    },
    {
      id: 'link',
      numeric: false,
      disablePadding: false,
      label: 'Link'
    },
    {
      id: 'community',
      numeric: false,
      disablePadding: false,
      label: 'Community'
    },
    {
      id: 'startDate',
      numeric: false,
      disablePadding: false,
      label: 'Start Date'
    },
    {
      id: 'endDate',
      numeric: false,
      disablePadding: false,
      label: 'End Date'
    }
  ];

  return (
    <>
      <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUserModalOpen}>
          Create Survey
        </Button>
      </Box>
      <MainCard>
        <ReusableTable rowData={rowData} headerData={headers} />
      </MainCard>
      <AddSurvey modalOpen={newUserOpen} modalClose={newUserModalClose} />
    </>
  );
}
