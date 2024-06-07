import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';
import MainCard from 'components/MainCard';
import AddNewUpdate from 'pages/main/Modal/addNewUpdate';
import RequestLoader from 'components/waiting/RequestLoader';
import StatusTable from 'pages/tables/mui-table/statusTable';
import PlacesTable from 'pages/tables/mui-table/placesTable';
import UpdatesTable from 'pages/tables/mui-table/updatesTable';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces, getOptionPlaces } from 'redux/placesRelated/placesHandle';
import { getResource } from 'redux/resourceRelated/resourceHandle';
import { getStatus } from 'redux/statusRelated/statusHandle';
export default function Updates() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaces());
    dispatch(getResource());
    dispatch(getStatus());
  }, [dispatch]);
  const { totalCount, hasMore, tablePage, itemsPerPage } = useSelector((state) => state.places);
  const { resourceList, loading } = useSelector((state) => state.resource);
  const { placesList, placesLoading } = useSelector((state) => state.places);
  const { statusLoading } = useSelector((state) => state.status);
  const [value, setValue] = useState(0);
  const [newUpdateOpen, setNewUpdateOpen] = useState(false);
  const newUpdateModalOpen = () => setNewUpdateOpen(true);
  const newUpdateModalClose = () => setNewUpdateOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`
    };
  };
  const TabPanel = ({ value, index, children }) => {
    return (
      <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
        {value === index && <div>{children}</div>}
      </div>
    );
  };
  TabPanel.propTypes = {
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
  };
  const Tab_Titles = ['Resource', 'Status', 'Places'];
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ paddingTop: '20px' }}
        TabIndicatorProps={{
          style: { display: 'none' }
        }}
      >
        {Tab_Titles.map((Tab_Title, index) => (
          <Tab
            key={index}
            label={Tab_Title}
            {...a11yProps(index)}
            sx={{
              borderRadius: '20px',
              color: (theme) => (theme.palette.mode === 'dark' ? '#008080' : '#7E8487'), // Default color
              '&.Mui-selected': {
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#ffab00' : '#008080'), // Color for active tab
                color: 'white'
              },
              textAlign: 'center'
            }}
          />
        ))}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUpdateModalOpen}>
            Create New Update
          </Button>
        </Box>
        <MainCard>{loading ? <RequestLoader /> : <UpdatesTable source="resource" rows={resourceList} />}</MainCard>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUpdateModalOpen}>
            Create New Update
          </Button>
        </Box>
        <MainCard>{statusLoading ? <RequestLoader /> : <StatusTable />}</MainCard>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUpdateModalOpen}>
            Create New Update
          </Button>
        </Box>
        <MainCard>
          {placesLoading ? (
            <RequestLoader />
          ) : (
            <PlacesTable
              source="places"
              rows={placesList}
              getMoreOption={getOptionPlaces}
              hasMore={hasMore}
              totalCount={totalCount}
              tablePage={tablePage}
              itemsPerPage={itemsPerPage}
            />
          )}
        </MainCard>
      </TabPanel>
      <AddNewUpdate modalOpen={newUpdateOpen} modalClose={newUpdateModalClose} />
    </>
  );
}
