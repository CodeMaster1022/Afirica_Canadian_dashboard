// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
// project-import
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
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Mantis" width="100" />
     *
     */
    <>{downLG ? <img src={logo} alt="Mantis" width="220" /> : <img src={logo} alt="Mantis" width="275" />}</>
  );
}
