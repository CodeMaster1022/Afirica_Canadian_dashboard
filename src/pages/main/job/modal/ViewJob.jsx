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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCommunity } from 'redux/communityRelated/communityHandle';
import { getAlljobs, jobsCreate, jobsUpdate } from 'redux/jobRelated/jobHandle';
// project import
// import ProfileTab from './ProfileTab';
import Avatar from 'components/@extended/Avatar';
import Button from '@mui/material/Button';
import { ThemeMode } from 'config';
// assets

import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';

const ViewJob = ({ modalOpen, modalClose }) => {
  const dispatch = useDispatch();
  const { communityList } = useSelector((state) => state.community);
  const { jobsList } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getCommunity());
  }, [dispatch]);
  const theme = useTheme();
  const [name, setName] = useState('');
  const [imageUrl, setSelectedImage] = useState('');
  const [avatar, setAvatar] = useState(userImage);
  const [title, setTitle] = useState();
  const [application, setApplication] = useState('');
  const [level, setLevel] = useState(1);
  const [start_date, setStartDate] = useState('2024-06-30 01:00:00');
  const [end_date, setEndDate] = useState();
  const [community, setCommunity] = useState('');
  const [external_url, setExternalUrl] = useState('http://localhost:3000/events');
  const [tags, setTags] = useState('Hello');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('ffffff');
  const [location, setLocation] = useState('Lahore');
  const [user, setUser] = useState('594aad28-d5a2-408b-82d3-35641e2db6b5');
  const [type, setType] = useState('Hello');
  const Save = () => {
    if (imageUrl !== '' && title !== '' && description !== '' && community !== '') {
      if (action === 'create') dispatch(jobsCreate({ title, description, external_url, user, community, start_date, end_date }));
      if (action === 'edit')
        dispatch(
          jobsUpdate({
            title,
            description,
            external_url,
            user,
            community,
            start_date,
            end_date
          })
        );
      dispatch(getAlljobs());
      modalClose(true);
      // Swal.fire({
      //   zIndex: 99999,
      //   title: `Do you want to save?`,
      //   showDenyButton: true,
      //   showCancelButton: false,
      //   confirmButtonText: 'Yes',
      //   denyButtonText: `No`
      // }).then((result) => {
      //   /* Read more about isConfirmed, isDenied below */
      //   if (result.isConfirmed) {
      //     console.log('yes');
      //   } else if (result.isDenied) {
      //     Swal.fire(`${action} was cancelled`, '', 'info');
      //   }
      // });
    }
  };
  const Cancel = () => {
    modalClose(true);
  };
  const handleChangeCommunity = (event) => {
    event.preventDefault();
    setCommunity(event.target.value);
  };
  const handleChangeJobType = (event) => {
    event.preventDefault();
    setType(event.target.value);
  };
  const handleChangeLevel = (event) => {
    event.preventDefault();
    setLevel(event.target.value);
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
          <Typography>Add New Job</Typography>
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
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Company Name</Typography>
              <TextField sx={{ width: '100%' }} value={name} required onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
              <TextField sx={{ width: '100%' }} value={title} required onChange={(e) => setTitle(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: '#8C8C8C' }}>Job Type</Typography>
              {/* <TextField sx={{ width: '100%' }} value={type} required onChange={(e) => setJobType(e.target.value)} /> */}
              <FormControl sx={{ width: '100%' }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={handleChangeJobType}
                  placeholder="job type"
                >
                  <MenuItem value={0}>Full time</MenuItem>
                  <MenuItem value={1}>Part time </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: '#8C8C8C' }}>Experience Level</Typography>
              <FormControl sx={{ width: '100%' }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={level}
                  onChange={handleChangeLevel}
                  placeholder="community"
                >
                  <MenuItem value={0}>Beginner</MenuItem>
                  <MenuItem value={1}>Intermediate </MenuItem>
                  <MenuItem value={2}>Professional </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Location</Typography>
              <TextField sx={{ width: '100%' }} value={location} required onChange={(e) => setLocation(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: '#8C8C8C' }}>End Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="YYYY-MM-DD"
                  value={end_date}
                  // defaultValue={dayjs(surveyInfo?.endDate)}
                  sx={{ width: '100%' }}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: '#8C8C8C' }}>Target Community</Typography>
              <FormControl sx={{ width: '100%' }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={community}
                  onChange={handleChangeCommunity}
                  placeholder="level"
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
              <Typography sx={{ color: '#8C8C8C' }}>Application Link</Typography>
              <TextField sx={{ width: '100%' }} value={application} required onChange={(e) => setApplication(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Job Description</Typography>
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
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
ViewJob.propTypes = {
  modalOpen: PropTypes.bool,
  id: number,
  modalClose: PropTypes.func
};
export default AddNewJob;
