// import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import friend from 'assets/images/landing/friends.png';
// ==============================|| STATISTICS - ECOMMERCE CARD ||============================== //

export default function RecentSuveyCard() {
  return (
    <MainCard>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={friend} alt="friend" style={{ width: '120px' }} />
      </Box>
      <Typography fontSize={20} fontWeight={700} paddingX={3} paddingY={0} textAlign={'center'}>
        Recent Surveys
      </Typography>
      <Typography fontSize={16} paddingX={3} textAlign={'center'} color="grey">
        there are no recent surveys
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '12px' }}>
        <Button variant="contained">View Details</Button>
      </Box>
    </MainCard>
  );
}

// RecentNotifyCard.propTypes = {
//   date: PropTypes.string
// };
