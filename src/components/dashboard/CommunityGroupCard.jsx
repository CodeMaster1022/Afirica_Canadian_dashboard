import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { ShopOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
// ==============================|| STATISTICS - ECOMMERCE CARD ||============================== //

export default function CommunityGroupCard({ groupName, date, eventNumber, member }) {
  return (
    <MainCard>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <img src={avatar1} alt="avatar1" style={{ width: '45px', borderRadius: '50px' }} />
        <Typography fontSize={15} fontWeight={700} sx={{ paddingLeft: '15px' }}>
          {groupName}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '15px'
        }}
      >
        <ShopOutlined />
        <Typography sx={{ paddingLeft: '15px' }}>{date}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '10px'
        }}
      >
        <ShopOutlined />
        <Typography sx={{ paddingLeft: '15px' }}>{eventNumber} Events</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          paddingY: '15px'
        }}
      >
        <AvatarGroup size="sm" sx={{ '--Avatar-size': '28px' }}>
          <Avatar src={avatar1} />
          <Avatar src={avatar1} />
          <Avatar src={avatar1} />
          <Avatar sx={{ backgroundColor: 'white' }}>
            <Typography color={'grey'}>+{member}</Typography>
          </Avatar>
        </AvatarGroup>
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <Button variant="outlined">View Details</Button>
      </Box>
    </MainCard>
  );
}

CommunityGroupCard.propTypes = {
  groupName: PropTypes.string,
  date: PropTypes.string,
  eventNumber: PropTypes.number,
  member: PropTypes.number
};
