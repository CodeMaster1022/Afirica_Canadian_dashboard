/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Modal, useMediaQuery } from '@mui/material';
import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// material-ui
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js';
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
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCommunity } from 'redux/communityRelated/communityHandle';
import { eventCreate, eventUpdate, getAllEvent } from 'redux/eventRelated/eventHandle';
// project import
// import ProfileTab from './ProfileTab';
import Avatar from 'components/@extended/Avatar';
import Button from '@mui/material/Button';
import { ThemeMode } from 'config';
// assets

import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';
import { userDetail } from 'redux/userRelated/userHandle';

const AddNewEvent = ({ modalOpen, modalClose }) => {
  const dispatch = useDispatch();
  const { communityList } = useSelector((state) => state.community);
  const { tablePage, items_per_page } = useSelector((state) => state.event);
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
  const [eventHappeningDate, setEventHappeningDate] = useState(null);
  const [date, setDate] = useState('2024-06-30 01:00:00');
  const [community, setCommunity] = useState('');
  const [eventUrl, setUrl] = useState('http://localhost:3000/events');
  const [video, setVideo] = useState('Hello');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('ffffff');
  const [location, setLocation] = useState('Lahore');
  const [user, setUser] = useState('594aad28-d5a2-408b-82d3-35641e2db6b5');
  const [documnet, setDocument] = useState('Hello');
  const [eventExpiryDate, setEventExpiryDate] = useState('2024-06-30 01:00:00');
  const Save = () => {
    const eventDate = new Date(eventHappeningDate);
    const formattedEventDate = format(eventDate, 'yyyy-MM-dd');
    const data = {
      title: title,
      description: description,
      eventHappeningDate: formattedEventDate,
      eventUrl: eventUrl,
      community: community,
      eventExpiryDate: eventExpiryDate,
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
  const Cancel = () => {
    modalClose(true);
  };
  useEffect(() => {
    console.log(userKeycloakId);
  }, [userKeycloakId]);
  const handleChangeCommunity = (event) => {
    event.preventDefault();
    setCommunity(event.target.value);
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
    width: isSMScreen ? '90%' : '50%',
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
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
                  <TextField sx={{ width: '100%' }} value={title} required onChange={(e) => setTitle(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C' }}>Venue</Typography>
                  <TextField sx={{ width: '100%' }} value={venue} required onChange={(e) => setVenue(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C', paddingTop: '5px' }}>Price</Typography>
                  <TextField sx={{ width: '100%' }} value={price} required onChange={(e) => setPrice(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C', paddingTop: '5px' }}>Registration Link</Typography>
                  <TextField sx={{ width: '100%' }} value={eventUrl} required onChange={(e) => setUrl(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#8C8C8C', paddingTop: '5px' }}>Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker format="YYYY-MM-DD" value={eventHappeningDate} onChange={(newValue) => setEventHappeningDate(newValue)} />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#8C8C8C', paddingTop: '5px' }}>Target Community</Typography>
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
              </Grid>
              <Grid container>
                <Box sx={{ padding: '10px' }}>
                  <Typography sx={{ color: '#8C8C8C' }}>Body</Typography>
                  <Divider />
                  <Box>
                    <MUIRichTextEditor
                      label="Start typing..."
                      required
                      onChange={(value) => {
                        const content = JSON.stringify(convertToRaw(value.getCurrentContent()));
                        setDescription(content);
                      }}
                    />
                  </Box>
                  <Divider />
                </Box>
              </Grid>
              <Grid sx={{ marginTop: '35px' }} container>
                <Stack direction="row" justifyContent="flex-end" spacing={2} paddingTop={1} sx={{ width: '100%' }}>
                  <Button variant="contained" color="error" onClick={Cancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={Save}>
                    Save
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
AddNewEvent.propTypes = {
  modalOpen: PropTypes.bool,
  id: number,
  modalClose: PropTypes.func
};
export default AddNewEvent;
