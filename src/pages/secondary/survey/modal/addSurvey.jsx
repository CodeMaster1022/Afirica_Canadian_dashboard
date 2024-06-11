import { Modal, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { useState } from 'react';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';
import Avatar from 'components/@extended/Avatar';
import { getSurvey, surveyCreate } from 'redux/surveyRelated/surveyHandle';
import { ThemeMode } from 'config';
import { useDispatch, useSelector } from 'react-redux';
const AddSurvey = ({ modalOpen, modalClose }) => {
  const dispatch = useDispatch();
  const [imageUrl, setSelectedImage] = useState('');
  const [avatar, setAvatar] = useState(userImage);
  const { communityList } = useSelector((state) => state.community);
  const { tablePage, items_per_page } = useSelector((state) => state.survey);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [community, setCommunity] = useState('');

  const theme = useTheme();

  useEffect(() => {
    if (imageUrl) {
      setAvatar(URL.createObjectURL(imageUrl));
    }
  }, [imageUrl]);
  const CloseModal = () => {
    modalClose();
  };

  const handleChangeCommunity = (event) => {
    setCommunity(event.target.value);
  };

  const isSMScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const modalStyle = {
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

  const handleSubmit = async () => {
    modalClose();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formattedStartDate = format(start, 'yyyy-MM-dd');
    const formattedEndDate = format(end, 'yyyy-MM-dd');

    const data = {
      title,
      description,
      survey_url: link,
      user: 'keycloak_user_id_730',
      community: community,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    };
    dispatch(surveyCreate(data));
    dispatch(getSurvey(items_per_page, tablePage));
  };

  return (
    <Modal open={modalOpen} onClose={modalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        <Typography>Create New Survey</Typography>
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
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ marginTop: '10px', padding: '5px' }}>
              <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
              <TextField sx={{ width: '100%' }} value={title} onChange={(e) => setTitle(e.target.value)} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ padding: '5px' }}>
              <Typography sx={{ color: '#8C8C8C' }}>Link</Typography>
              <TextField sx={{ width: '100%' }} value={link} onChange={(e) => setLink(e.target.value)} />
            </Box>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ padding: '5px' }}>
                <Typography sx={{ color: '#8C8C8C' }}>Start Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker format="YYYY-MM-DD" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ padding: '5px' }}>
                <Typography sx={{ color: '#8C8C8C' }}>End Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker format="YYYY-MM-DD" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
                </LocalizationProvider>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ padding: '5px' }}>
              <Typography sx={{ color: '#8C8C8C' }}>Description</Typography>
              <TextField sx={{ width: '100%' }} multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ padding: '5px' }}>
              <Typography sx={{ color: '#8C8C8C' }}>Community</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="community-select-label"
                  id="community-select"
                  value={community}
                  onChange={handleChangeCommunity}
                  placeholder="Select a community"
                >
                  {communityList.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" spacing={2} paddingTop={1}>
              <Button variant="contained" color="error" onClick={CloseModal}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

AddSurvey.propTypes = {
  modalOpen: PropTypes.bool,
  modalClose: PropTypes.func
};
export default AddSurvey;
