import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SettingOutlined } from '@ant-design/icons';
// project import
import MainCard from 'components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

// ==============================|| STATISTICS - ECOMMERCE CARD ||============================== //

export default function AnalyticsDataCard({ color, title, count, percentage, isLoss = false, children }) {
  return (
    <MainCard content={false}>
      <Box sx={{ p: 2.25 }}>
        <Stack spacing={2.5}>
          <Stack direction="row" alignItems="center">
            <SettingOutlined color="text.secondary" />
            <Typography fontSize={14} color="text.secondary" sx={{ pl: 1 }}>
              {title}
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="left" spacing={2.3}>
            <Typography variant="h3" color="inherit">
              {count}
            </Typography>
            {percentage && (
              <Box sx={{ diaply: 'flex' }}>
                <Chip
                  variant="combined"
                  color={color}
                  icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
                  label={`${percentage}%`}
                  sx={{ pl: 1 }}
                  size="small"
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>
      {children}
    </MainCard>
  );
}

AnalyticsDataCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  children: PropTypes.any
};
