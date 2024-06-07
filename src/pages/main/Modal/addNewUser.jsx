import { Modal, useMediaQuery } from '@mui/material';
import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
// project import
// import ProfileTab from './ProfileTab';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import Button from '@mui/material/Button';
import { ThemeMode } from 'config';
// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from 'redux/userRelated/userHandle';
import { underControl } from 'redux/userRelated/userSlice';
// third-party
// import { useFormik } from 'formik';
// import * as yup from 'yup';

const AddNewUserProfile = ({ modalOpen, modalClose }) => {
  const dispatch = useDispatch();

  const { communityList } = useSelector((state) => state.community);
  const { status, getresponse, error } = useSelector((state) => state.users);
  // Toast Message
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });
  //Password and ConfirmPassword Hide and Hints
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const [confirmValues, setConfirmValues] = useState({
    password: '',
    showPassword: false
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleConfirmChange = (prop) => (event) => {
    setConfirmValues({ ...confirmValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };
  const handleConfirmClickShowPassword = () => {
    setConfirmValues({
      ...confirmValues,
      showPassword: !confirmValues.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();
  // User Avatar
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(userImage);
  // When click Edit button, Edit form have to be shown
  const handleCancel = () => {
    modalClose();
  };
  // Select Community
  const [com, setCommunity] = useState('');
  const handleChangeCommunity = (event) => {
    event.preventDefault();
    setCommunity(event.target.value);
  };
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  const isSMScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    width: isSMScreen ? '90%' : '50%',
    maxHeight: '90vh',
    overflow: 'auto',
    p: isSMScreen ? 2 : 4
  };
  // Edit Form Data
  const [input, setInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profile_image_key: 'localhost',
    dob: '2024-08-08',
    address: 'hsbshsb',
    phone_number: '',
    community_id: '',
    digital_address: '"Digital Address will go here',
    digital_address_visible: true,
    password: ''
  });
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log(input);
    if (
      input.first_name !== '' &&
      input.last_name !== '' &&
      input.email !== '' &&
      input.phone_number !== '' &&
      input.community_id !== '' &&
      values.password !== '' &&
      values.password === confirmValues.password
    ) {
      dispatch(addUser({ input }));
    } else if (values.password.length < 6) {
      Toast.fire({
        icon: 'error',
        position: 'bottom',
        text: 'Password should be of minimum 6 characters length',
        title: 'Error!'
      });
    } else if (values.password !== confirmValues.password) {
      Toast.fire({
        icon: 'error',
        position: 'bottom',
        text: 'Passwords must match',
        title: 'Error!'
      });
    } else {
      Toast.fire({
        icon: 'error',
        position: 'bottom',
        text: 'Please enter all data',
        title: 'Error!'
      });
    }
  };
  useEffect(() => {
    if (status === 'added') {
      handleCancel();
      dispatch(underControl());
      Toast.fire({
        position: 'bottom',
        icon: 'success',
        text: 'User has been created successfully',
        title: 'Success!'
      });
    } else if (status === 'failed') {
      dispatch(underControl());
      Toast.fire({
        icon: 'error',
        position: 'bottom',
        text: `${getresponse}`,
        title: 'Error!'
      });
    } else if (status === 'error') {
      dispatch(underControl());
      Toast.fire({
        icon: 'error',
        position: 'bottom',
        text: `${error}`,
        title: 'Error!'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, getresponse, dispatch, Toast]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
      password: values.password,
      community_id: com
      // profile_image_key: selectedImage
    }));
  };
  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      password: values.password,
      community_id: com
      // profile_image_key: selectedImage
    }));
  }, [values.password, com, selectedImage]);

  return (
    <>
      <Modal open={modalOpen} onClose={modalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalstyle}>
          <Typography>User Profile</Typography>
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ width: '200px' }}>
                <Stack spacing={2.5} alignItems="center">
                  <FormLabel
                    htmlFor="change-avtar"
                    sx={{
                      position: 'relative',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      '&:hover .MuiBox-root': { opacity: 1 },
                      cursor: 'pointer'
                    }}
                  >
                    <Avatar alt="Avatar 1" src={avatar} sx={{ width: 150, height: 150, border: '1px dashed' }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Stack spacing={0.5} alignItems="center">
                        <CameraOutlined style={{ fontSize: '2rem' }} />
                        <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                      </Stack>
                    </Box>
                  </FormLabel>
                  <TextField
                    type="file"
                    id="change-avtar"
                    placeholder="Outlined"
                    variant="outlined"
                    sx={{ display: 'none' }}
                    onChange={(e) => setSelectedImage(e.target.files?.[0])}
                  />
                </Stack>
              </Box>
            </Grid>
            <>
              <form onSubmit={handleSubmitEvent} style={{ width: '100%' }}>
                <Grid container>
                  <Grid item xs={6}>
                    <Grid>
                      <Box sx={{ marginTop: '15px', padding: '5px' }}>
                        <Typography sx={{ color: '#8C8C8C' }}>Full Name</Typography>
                        <TextField type="text" name="first_name" onChange={handleInput} sx={{ width: '100%' }} />
                      </Box>
                      <Box sx={{ padding: '5px' }}>
                        <Typography sx={{ color: '#8C8C8C' }}>Email Address</Typography>
                        <TextField type="email" name="email" onChange={handleInput} sx={{ width: '100%' }} />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid>
                      <Box sx={{ marginTop: '15px', padding: '5px' }}>
                        <Typography sx={{ color: '#8C8C8C' }}>LastName</Typography>
                        <TextField type="text" name="last_name" onChange={handleInput} sx={{ width: '100%' }} />
                      </Box>
                      <Box sx={{ padding: '5px' }}>
                        <Typography sx={{ color: '#8C8C8C' }}>Phone Number</Typography>
                        <TextField type="text" name="phone_number" onChange={handleInput} sx={{ width: '100%' }} />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ padding: '5px' }}>
                      <Typography sx={{ color: '#8C8C8C' }}>Community</Typography>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={com}
                          onChange={handleChangeCommunity}
                          placeholder="community"
                        >
                          {communityList
                            ? communityList.map((com, index) => (
                                <MenuItem key={index} value={index + 1}>
                                  {com.name}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <Box sx={{ padding: '5px' }}>
                        <Typography sx={{ color: '#8C8C8C' }}>Password</Typography>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onChange={handleChange('password')}
                          sx={{ width: '100%' }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                color="secondary"
                              >
                                {values.showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <Box sx={{ padding: '5px' }}>
                        <Typography sx={{ color: '#8C8C8C' }}>Confirm Password</Typography>
                        <OutlinedInput
                          id="outlined-adornment-confirm"
                          type={confirmValues.showPassword ? 'text' : 'password'}
                          value={confirmValues.password}
                          name="confirmPassword"
                          onChange={handleConfirmChange('password')}
                          sx={{ width: '100%' }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleConfirmClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                color="secondary"
                              >
                                {confirmValues.showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end" spacing={2} paddingTop={1}>
                      <Button variant="contained" color="error" onClick={handleCancel} type="button">
                        Cancel
                      </Button>
                      <Button variant="contained" type="submit">
                        Save
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            </>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
AddNewUserProfile.propTypes = {
  modalOpen: PropTypes.bool,
  id: number,
  modalClose: PropTypes.func
};
export default AddNewUserProfile;
