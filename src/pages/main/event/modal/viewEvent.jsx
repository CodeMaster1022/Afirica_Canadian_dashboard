/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Modal, useMediaQuery } from '@mui/material';
import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MuiColorInput } from 'mui-color-input';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCommunity } from 'redux/communityRelated/communityHandle';
import { eventCreate, eventUpdate, getAllEvent } from 'redux/eventRelated/eventHandle';
// project import
// import ProfileTab from './ProfileTab';
import Avatar from 'components/@extended/Avatar';
import Button from '@mui/material/Button';
import { ThemeMode } from 'config';
import dayjs from 'dayjs';
// assets

import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';

const ViewEvent = ({ modalOpen, modalClose, action }) => {
  const dispatch = useDispatch();
  const { communityList } = useSelector((state) => state.community);
  const { tablePage, items_per_page, eventDetails } = useSelector((state) => state.event);
  useEffect(() => {
    dispatch(getCommunity());
  }, [dispatch]);
  const theme = useTheme();
  const [userKeycloakId, setUserKeycloakId] = useState('');
  const [imageUrl, setSelectedImage] = useState('');
  const [avatar, setAvatar] = useState(userImage);
  const [title, setTitle] = useState('');
  const [venue, setVenue] = useState('');
  const [price, setPrice] = useState('');
  const [eventHappeningDate, setEventHappeningDate] = useState(dayjs('2023-01-01'));
  const [date, setDate] = useState('2024-06-30 01:00:00');
  const [community, setCommunity] = useState('');
  const [eventUrl, setUrl] = useState('http://localhost:3000/events');
  const [video, setVideo] = useState('Hello');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000');
  const [location, setLocation] = useState('Lahore');
  const [user, setUser] = useState('594aad28-d5a2-408b-82d3-35641e2db6b5');
  const [eventExpiryDate, setEventExpiryDate] = useState(dayjs('2023-01-01'));
  const Save = () => {
    const eventDate = new Date(eventHappeningDate);
    const formattedEventDate = format(eventDate, 'yyyy-MM-dd');
    const expDate = new Date(eventExpiryDate);
    const formattedExpDate = format(expDate, 'yyyy-MM-dd');
    const data = {
      title: title,
      description: description,
      eventHappeningDate: formattedEventDate,
      eventUrl: eventUrl,
      community: community,
      eventExpiryDate: formattedExpDate,
      color: color,
      location: location,
      user: user
    };
    if (title !== '' && description !== '' && community !== '') {
      dispatch(eventCreate(data));
      dispatch(getAllEvent(items_per_page, tablePage));
      modalClose(true);
    }
  };
  useEffect(() => {
    if (action === 'edit') {
      setTitle(eventDetails?.title || '');
      setEventExpiryDate(dayjs(eventDetails?.eventExpiryDate || ''));
      setEventHappeningDate(dayjs(eventDetails?.eventHappeningDate || ''));
      setCommunity(eventDetails?.community?.id || '');
      setDescription(eventDetails?.description || '');
      setColor(eventDetails?.color || '');
    }
  }, [eventDetails, action]);
  const Cancel = () => {
    modalClose(true);
  };
  const handleChangeCommunity = (event) => {
    event.preventDefault();
    setCommunity(event.target.value);
  };
  const handleColorChange = (newValue) => {
    setColor(newValue);
  };
  useEffect(() => {
    if (imageUrl) {
      setAvatar(URL.createObjectURL(imageUrl));
    }
  }, [imageUrl]);
  const isSMScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    width: isSMScreen ? '90%' : '40%',
    maxHeight: '90vh',
    overflow: 'auto',
    p: isSMScreen ? 2 : 4
  };
  return (
    <>
      <Modal open={modalOpen} onClose={modalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalstyle}>
          <Typography>Add New Event</Typography>
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Typography>Cover photo</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box>
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
                        <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
                  <TextField sx={{ width: '100%' }} value={title} required onChange={(e) => setTitle(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C', marginTop: '10px' }}>Color</Typography>
                  <MuiColorInput format="hex" value={color} onChange={handleColorChange} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C' }}>Event Url</Typography>
                  <TextField sx={{ width: '100%' }} value={eventUrl} required onChange={(e) => setUrl(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#8C8C8C' }}>HappeningDate</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={eventHappeningDate}
                      onChange={(newValue) => setEventHappeningDate(newValue)}
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#8C8C8C' }}>ExpiryDate</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={eventExpiryDate} onChange={(newValue) => setEventExpiryDate(newValue)} sx={{ width: '100%' }} />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C' }}>Target Community</Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={community}
                      onChange={handleChangeCommunity}
                      placeholder="community"
                    >
                      {communityList.map((com, index) => (
                        <MenuItem value={com.id} key={index}>
                          {com.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography sx={{ color: '#8C8C8C' }}>Body</Typography>
                    <Divider />
                    <Box>
                      <TextField value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={4} />
                    </Box>
                    <Divider />
                  </Box>
                </Grid>
              </Grid>
              <Grid sx={{ marginTop: '35px' }} container>
                <Stack direction="row" justifyContent="flex-end" spacing={2} paddingTop={1} sx={{ width: '100%' }}>
                  <Button variant="contained" color="error" onClick={Cancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={Save}>
                    Update
                  </Button>
                </Stack>
              </Grid>
            </>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
ViewEvent.propTypes = {
  modalOpen: PropTypes.bool,
  modalClose: PropTypes.func,
  action: PropTypes.string
};
export default ViewEvent;
