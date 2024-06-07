import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
// import Search from './Search';
// import Message from './Message';
// import Profile from './Profile';
// import Notification from './Notification';
// import FullScreen from './FullScreen';
// import MobileSection from './MobileSection';

import useConfig from 'hooks/useConfig';
import { MenuOrientation } from 'config';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
// import { Typography } from '@mui/material';
import logo from 'assets/images/icons/Logo-2.svg';
// import { width } from '@mui/system';
// ==============================|| HEADER - CONTENT ||============================== //
import { makeStyles } from '@material-ui/core/styles';
export default function HeaderContent() {
  const { menuOrientation } = useConfig();
  const classes = useStyles();
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      {downSM && <Box width={50}></Box>}
      {!downSM ? (
        <Box width={400} sx={{ marginLeft: '10%' }}>
          <Breadcrumbs />
        </Box>
      ) : (
        <>
          <Box width={400}>
            <Box className={classes.logo}></Box>
          </Box>
        </>
      )}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <Notification /> */}
      {/* <Message /> */}
      {/* {!downLG && <FullScreen />} */}
      {/* {!downLG && <Profile />} */}
      {/* {downLG && <MobileSection />} */}
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
    </>
  );
}
const useStyles = makeStyles(() => ({
  logo: {
    position: 'relative',
    zIndex: 2,
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain cover',
    backgroundPosition: 'center',
    height: '70px',
    width: '250px'
  }
}));
