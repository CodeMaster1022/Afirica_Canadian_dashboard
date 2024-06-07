import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import { Divider, MenuItem, FormControl, Select } from '@mui/material';
import MarketingCardChart from 'components/charts/MarketingCardChart';

// ==============================|| STATISTICS - ECOMMERCE CARD ||============================== //

export default function GrowthCard({ growth, growthPercent, users, usersPercent }) {
  return (
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
  );
}

GrowthCard.propTypes = {
  growth: PropTypes.number,
  growthPercent: PropTypes.number,
  users: PropTypes.number,
  usersPercent: PropTypes.number
};
