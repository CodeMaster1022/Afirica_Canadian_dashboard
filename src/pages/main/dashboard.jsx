// material-ui
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MarketingCardChart from 'sections/dashboard/MarketingCardChart';
import BarMartketChart from 'sections/dashboard/BarChart';
import CustomMap from 'components/GoogleMap';
import AnalyticsDataCard from 'components/dashboard/AnalyticsDataCard';
import RecentNotifyCard from 'components/dashboard/RecentNotifyCard';
import RecentSuveyCard from 'components/dashboard/RecentSuveryCard';
import CommunityGroupCard from 'components/dashboard/CommunityGroupCard';
// project import
// Redux
import { useDispatch, useSelector } from 'react-redux';

import { getCommunity } from 'redux/communityRelated/communityHandle';

// ==============================|| Dashboard ||============================== //

export default function Dahsboard() {
  // Data formats
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Fetch Users Data
  const dispatch = useDispatch();
  const { communityList } = useSelector((state) => state.community);
  useEffect(() => {
    dispatch(getCommunity());
  }, [dispatch]);

  const [age, setAge] = useState(10);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Grid container spacing={2} sx={{ maxWidth: 'xl', mt: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsDataCard color="warning" title="Registered Users" count="$1,12,93" percentage={70.5} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsDataCard color="error" title="Active Users" count="$1,12,93" percentage={70.5} isLoss={true} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsDataCard color="success" title="Communities" count="$1,12,93" percentage={70.5} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsDataCard color="primary" title="Communities" count="$1,12,93" percentage={70.5} />
        </Grid>
        <Grid item xs={12} sm={8} marginTop={3}>
          <RecentNotifyCard date="20 September 2024" />
        </Grid>
        <Grid item xs={12} sm={4} marginTop={3}>
          <RecentSuveyCard />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={3}>
          <MainCard>
            <Typography fontSize={15} sx={{ color: 'grey' }}>
              Monthly Income
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '20px' }}>
              <Typography fontSize={25} fontWeight={700}>
                $124,563.00
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
            <Typography color="grey" sx={{ marginTop: '10px' }}>
              From Ads
            </Typography>
          </MainCard>
          <MainCard sx={{ marginTop: '30px' }}>
            <Typography fontSize={15} sx={{ color: 'grey' }}>
              Event Participation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '20px' }}>
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
            <Box sx={{ height: '200px' }}>
              <BarMartketChart />
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} marginTop={3}>
          <MainCard>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography fontSize={20} fontWeight={700}>
                Community Growth
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select labelId="demo-select-small-label" id="demo-select-small" value={age} label="Age" onChange={handleChange}>
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
            <Box sx={{ marginTop: '90px' }}>
              <MarketingCardChart />
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box sx={{ paddingTop: '40px' }}>
            <Typography fontSize={20} fontWeight={700}>
              Top Communities
            </Typography>
          </Box>
        </Grid>
        {communityList?.map((com, index) => (
          <Grid item key={index} xs={12} sm={3} marginTop={3}>
            <CommunityGroupCard key={index} groupName={com.name} date={formatDate(com.createdAt)} member={3} eventNumber={40} />
            {/* <CommunityGroupCard groupName="Community Group Name" date="February 13, 2024" member={3} eventNumber={40} /> */}
          </Grid>
        ))}
        <Grid item xs={12} marginTop={3}>
          <MainCard
            sx={{
              height: {
                xs: '400px',
                md: '500px',
                lg: '600px'
              }
            }}
          >
            <CustomMap />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
