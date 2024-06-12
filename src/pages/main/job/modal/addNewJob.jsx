/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Modal, useMediaQuery } from '@mui/material';
import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';
import MultiSelectAll from 'utils/MUISelectAll';
import { imageUpload } from 'redux/communityRelated/communityHandle';
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
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import dayjs from 'dayjs';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCommunity } from 'redux/communityRelated/communityHandle';
import { jobsCreate } from 'redux/jobRelated/jobHandle';
// import ProfileTab from './ProfileTab';
import Button from '@mui/material/Button';
import { ThemeMode } from 'config';
// assets

import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/loadimage.png';
//Multi tag
const AddNewJob = ({ modalOpen, modalClose, action }) => {
  const dispatch = useDispatch();
  const { communityList } = useSelector((state) => state.community);
  const { jobsDetails } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getCommunity());
  }, [dispatch]);
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  // const [name, setName] = useState('');
  const [imageUrl, setSelectedImage] = useState('');
  const [avatar, setAvatar] = useState(userImage);
  const [start_date, setStartDate] = useState(dayjs('2024-06-30'));
  const [end_date, setEndDate] = useState(dayjs('2024-06-30'));
  const [input, setInput] = useState({
    title: '',
    description: '',
    organisation_name: '',
    level: 'expert',
    external_url: 'http://localhost:3000/events',
    location: '',
    user: '594aad28-d5a2-408b-82d3-35641e2db6b5',
    type: 'full-time',
    is_remote: checked,
    community: ''
  });
  const initialValue = [{ label: 'Django', value: '1' }];
  const departmentNames = [
    { label: 'Django', value: '1' },
    { label: 'Next.js', value: '2' },
    { label: 'React', value: '3' },
    { label: 'Nuxt', value: '4' }
  ];
  const getTextBoxInputValue = (input) => {
    return input.map((itm) => itm.label).join(';');
  };

  const [currentSelection, setCurrentSelection] = useState(getTextBoxInputValue(initialValue));
  const handleSelectionChange = (result) => {
    const valueToSave = result.map((itm) => itm.label);
    setCurrentSelection(valueToSave);
  };
  // Qualification
  const qualiValue = [{ label: 'BSCS', value: '1' }];
  const qualificatiionName = [
    { label: 'BSCS', value: '1' },
    { label: 'Masters in IT', value: '2' }
  ];
  const getQualificationInputValue = (input) => {
    return input.map((itm) => itm.label);
  };

  const [qualification, setQualification] = useState(getQualificationInputValue(qualiValue));
  const handleQualificationSelectionChange = (result) => {
    const valueToSave = result.map((itm) => itm.label);
    setQualification(valueToSave);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
      start_date: start_date,
      end_date: end_date,
      tags: currentSelection,
      qualifications: qualification,
      is_remote: checked
    }));
  };
  useEffect(() => {
    const endDate = new Date(end_date);
    const startDate = new Date(start_date);
    const enddate = format(endDate, 'yyyy-MM-dd');
    const startdate = format(startDate, 'yyyy-MM-dd');
    setInput((prev) => ({
      ...prev,
      start_date: enddate,
      end_date: startdate,
      tags: currentSelection,
      qualifications: qualification,
      is_remote: checked
    }));
  }, [end_date, start_date, currentSelection, qualification, checked]);

  const Cancel = () => {
    modalClose(true);
  };

  const Save = () => {
    if (
      imageUrl !== '' &&
      input.description !== '' &&
      input.type !== '' &&
      input.organisation_name !== '' &&
      input.tags !== '' &&
      input.level !== '' &&
      input.community !== '' &&
      input.external_url !== ''
    ) {
      console.log(imageUrl, 'iamgeurl');
      dispatch(imageUpload(imageUrl, '32lk4j2lk34234l24.jpg'));
      // if (action === 'create') dispatch(jobsCreate({ input }));
      // if (action === 'edit') dispatch(jobsUpdate({ input }));
      // modalClose(true);
    }
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
                      overflow: 'hidden',
                      '&:hover .MuiBox-root': { opacity: 1 },
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    <img alt="Avatar 1" src={avatar} style={{ height: 200, width: '100%', backgroundRepeat: 'no-repeat' }} />
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
            {/* <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Company Name</Typography>
              <TextField sx={{ width: '100%' }} name="company" required />
            </Grid> */}
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
              <TextField sx={{ width: '100%' }} name="title" value={input.title} required onChange={handleInput} />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: '#8C8C8C' }}>Job Type</Typography>
              <FormControl sx={{ width: '100%' }}>
                <Select
                  name="type"
                  value={input.type}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleInput}
                  placeholder="job type"
                >
                  <MenuItem value={'full-time'}>Full time</MenuItem>
                  <MenuItem value={'part-time'}>Part time </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: '#8C8C8C' }}>Experience Level</Typography>
              <FormControl sx={{ width: '100%' }}>
                <Select
                  name="level"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.level}
                  onChange={handleInput}
                  placeholder="level"
                >
                  <MenuItem value={'intermediate'}>Intermediate </MenuItem>
                  <MenuItem value={'professional'}>Professional </MenuItem>
                  <MenuItem value={'expert'}>Expert</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Location</Typography>
              <TextField sx={{ width: '100%' }} name="location" value={input.location} required onChange={handleInput} />
            </Grid>
            <Grid item xs={1}>
              <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ color: '#8C8C8C', marginTop: '8px' }}>Remote</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Organisation Name</Typography>
              <TextField sx={{ width: '100%' }} name="organisation_name" value={input.organisation_name} required onChange={handleInput} />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: '#8C8C8C' }}>Start Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker name="start_date" value={start_date} onChange={(e) => setStartDate(e.target.value)} sx={{ width: '100%' }} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: '#8C8C8C' }}>End Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker name="end_date" value={end_date} onChange={(e) => setEndDate(e.target.value)} sx={{ width: '100%' }} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Target Community</Typography>
              <FormControl sx={{ width: '100%' }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="community"
                  value={input.community}
                  onChange={handleInput}
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
              <Typography sx={{ color: '#8C8C8C' }}>External Url</Typography>
              <TextField sx={{ width: '100%' }} value={input.external_url} name="external_url" required onChange={handleInput} />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Tags</Typography>
              <MultiSelectAll
                sx={{ maxheight: '700px' }}
                items={departmentNames}
                selectAllLabel="Select All"
                value={initialValue}
                onChange={handleSelectionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Qualificatiion</Typography>
              <MultiSelectAll
                sx={{ maxheight: '200px' }}
                items={qualificatiionName}
                selectAllLabel="Select All"
                value={qualiValue}
                onChange={handleQualificationSelectionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ color: '#8C8C8C' }}>Job Description</Typography>
              <Divider />
              <Box>
                <TextField name="description" value={input.description} onChange={handleInput} multiline rows={4} fullWidth />
              </Box>
              <Divider />
            </Grid>
            <Grid container>
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
AddNewJob.propTypes = {
  modalOpen: PropTypes.bool,
  action: PropTypes.string,
  modalClose: PropTypes.func
};
export default AddNewJob;
