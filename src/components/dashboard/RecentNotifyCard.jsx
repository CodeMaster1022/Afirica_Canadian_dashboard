import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import { EllipsisOutlined } from '@ant-design/icons';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

// ==============================|| STATISTICS - ECOMMERCE CARD ||============================== //

export default function RecentNotifyCard({ date }) {
  return (
    <Box sx={{ padding: '0px', backgroundColor: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography fontSize={14} sx={{ paddingLeft: '5px' }}>
            Recent notifications
          </Typography>
        </Box>
        <Box>
          <EllipsisOutlined />
        </Box>
      </Box>
      <Typography fontSize={20} fontWeight={700} paddingX={3} paddingY={1}>
        Event for your community members
      </Typography>
      <Typography fontSize={14} color="grey" paddingX={3} paddingBottom={3}>
        You have been invited to join this event. It is only for community members.
      </Typography>
      <Box sx={{ backgroundColor: '#F9FAFA' }} paddingX={3} paddingY={1}>
        <Typography fontSize={13} marginTop={1}>
          Event Date
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '25px', paddingTop: '4px' }}>
          <Box sx={{ borderRadius: '15px', backgroundColor: '#FEF2EA', paddingX: '15px', marginTop: '10px' }}>
            <Typography fontSize={12} color="#FF0000">
              {date}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button variant="contained">View Details</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

RecentNotifyCard.propTypes = {
  date: PropTypes.string
};
