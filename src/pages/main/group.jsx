import { Box, Grid, Typography } from '@mui/material';
import MarketingCardChart from 'sections/dashboard/MarketingCardChart';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MainCard from 'components/MainCard';
import React, { useState, useEffect } from 'react';
import GroupTable from 'pages/tables/mui-table/groupTable';
import { useDispatch, useSelector } from 'react-redux';

import { getGroup } from 'redux/groupRelated/groupHandle';

// import EnhancedTable from 'pages/tables/mui-table/datatable';
export default function Community() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.group);
  useEffect(() => {
    dispatch(getGroup());
  }, [dispatch]);
  const [age, setAge] = useState(10);
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Grid item xs={12} sm={6} marginTop={3}>
        <MainCard>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography fontSize={20} fontWeight={700}>
              Stats
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select labelId="demo-select-small-label" id="demo-select-small" value={age} label="Age" onChange={handleChangeAge}>
                <MenuItem value={10}>Monthly</MenuItem>
                <MenuItem value={20}>Yearly</MenuItem>
                <MenuItem value={30}>Weekly</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row'
              },
              justifyContent: 'space-between'
            }}
            gap={4}
          >
            <MainCard sx={{ marginTop: '20px', flexGrow: 1 }}>
              <Typography fontSize={15} sx={{ color: 'grey' }}>
                Growth
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '5px' }}>
                <Typography fontSize={25} fontWeight={700}>
                  4,658
                </Typography>
                <Box
                  sx={{
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginLeft: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography fontSize={10} sx={{ backgroundColor: '#17BB84', borderRadius: '10px', padding: '4px', color: 'white' }}>
                    +6.9%
                  </Typography>
                </Box>
              </Box>
            </MainCard>
            <MainCard sx={{ marginTop: '20px', flexGrow: 1 }}>
              <Typography fontSize={15} sx={{ color: 'grey' }}>
                New Users/Groups
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '5px' }}>
                <Typography fontSize={25} fontWeight={700}>
                  43.41%
                </Typography>
                <Box
                  sx={{
                    borderRadius: '10px',
                    textAlign: 'center',
                    marginLeft: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography fontSize={10} sx={{ backgroundColor: '#17BB84', borderRadius: '10px', padding: '4px', color: 'white' }}>
                    95,422
                  </Typography>
                </Box>
              </Box>
            </MainCard>
          </Box>
          <Box sx={{ marginTop: '10px' }}>
            <MarketingCardChart />
          </Box>
        </MainCard>
        <MainCard>{loading ? <h2>loading...</h2> : <GroupTable />}</MainCard>
      </Grid>
    </>
  );
}
