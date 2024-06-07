// material-ui

// project-import
import { Box } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //
import logo from 'assets/images/icons/Logo-2.svg';
export default function LogoMain() {
  const classes = useStyles();
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Mantis" width="100" />
     *
     */
    <>
      <Box className={classes.logo}></Box>
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
    height: '90px',
    width: '270px'
  }
}));
