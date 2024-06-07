import { Modal, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from 'components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import userImage from 'assets/images/users/avatar-1.png';
import useAxios from 'utils/useAxios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { format } from 'date-fns';

const ViewSurveyModal = ({ modalOpen, modalClose, surveyInfo }) => {
  const axiosInstance = useAxios();
  const theme = useTheme();
  const isSMScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedImage, setSelectedImage] = useState(undefined);
  const [changes, setChanges] = useState({});
  const [data, setData] = useState({
    title: surveyInfo?.title || '',
    description: surveyInfo?.description || '',
    surveyUrl: surveyInfo?.surveyUrl || '',
    community: surveyInfo?.community?.name || '',
    startDate: surveyInfo?.startDate || null,
    endDate: surveyInfo?.endDate || null
  });

  const [avatar, setAvatar] = useState(userImage);
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [community, setCommunity] = useState(surveyInfo?.community.id);
  const [communityList, setCommunityList] = useState([]);
  const open = Boolean(anchorEl);

  const handleChangeCommunity = (event) => {
    setCommunity(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/communities/');
        setCommunityList(response.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setData((prevData) => ({ ...prevData, [name]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (community !== undefined) {
      // Add community to data
      data.community = community;
    }

    console.log(data);

    if (data.startDate === null) {
      data.startDate = surveyInfo.startDate;
    }

    if (data.endDate === null) {
      data.endDate = surveyInfo.endDate;
    }

    // Filter out empty values
    const nonEmptyData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (nonEmptyData.startDate !== null) {
      const start = new Date(nonEmptyData.startDate);
      nonEmptyData.startDate = format(start, 'yyyy-MM-dd');
    }

    if (nonEmptyData.endDate !== null) {
      const end = new Date(nonEmptyData.endDate);
      nonEmptyData.endDate = format(end, 'yyyy-MM-dd');
    }

    console.log(nonEmptyData);

    try {
      const response = await axiosInstance.patch(`/surveys/${surveyInfo.id}/`, nonEmptyData);
      console.log(response.data);
      setEdit(false);
      modalClose();
    } catch (error) {
      console.log(error.response.data);
    }


    setEdit(false);
    modalClose();
  };

  const handleSurveyDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/surveys/${id}/`);
      modalClose();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <Modal open={modalOpen} onClose={modalClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
        <Typography fontSize={16}>Survey: {surveyInfo?.id}</Typography>
        <Divider />
        <Box sx={{ height: '10px' }} />
        <Grid container spacing={1}>
          {edit ? (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ marginTop: '10px', padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
                    <TextField fullWidth name="title" defaultValue={surveyInfo?.title} onChange={handleInputChange} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Link</Typography>
                    <TextField fullWidth name="surveyUrl" defaultValue={surveyInfo?.surveyUrl} onChange={handleInputChange} />
                  </Box>
                </Grid>
                <Grid container item spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ padding: '5px' }}>
                      <Typography sx={{ color: '#8C8C8C' }}>Start Date</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="YYYY-MM-DD"
                          // value={data.startDate}
                          defaultValue={dayjs(surveyInfo?.startDate)}
                          onChange={(date) => handleDateChange('startDate', date)}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ padding: '5px' }}>
                      <Typography sx={{ color: '#8C8C8C' }}>End Date</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="YYYY-MM-DD"
                          // value={data.endDate}
                          defaultValue={dayjs(surveyInfo?.endDate)}
                          onChange={(date) => handleDateChange('endDate', date)}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Description</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      name="description"
                      defaultValue={surveyInfo?.description}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Community</Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="community-select-label"
                        id="community-select"
                        // value={community}
                        defaultValue={surveyInfo?.community.id}
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
                    <Button variant="contained" color="error" onClick={() => setEdit(false)}>
                      Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                      Update
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          ) : (
            <>
              <Grid item xs={12}>
                <Box sx={{ padding: '5px' }}>
                  <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
                  <Typography fontSize={16}>{surveyInfo?.title}</Typography>
                </Box>
                <Box sx={{ padding: '5px' }}>
                  <Typography sx={{ color: '#8C8C8C' }}>Link</Typography>
                  <Typography fontSize={16}>
                    <a href={surveyInfo?.surveyUrl}>{surveyInfo?.surveyUrl}</a>
                  </Typography>
                </Box>
                <Box sx={{ padding: '5px' }}>
                  <Typography sx={{ color: '#8C8C8C' }}>Community</Typography>
                  <Typography fontSize={16}>{surveyInfo?.community?.name}</Typography>
                </Box>
                <Box sx={{ padding: '5px' }}>
                  <Typography sx={{ color: '#8C8C8C' }}>Description</Typography>
                  <Typography fontSize={16}>{surveyInfo?.description}</Typography>
                </Box>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Start Date</Typography>
                    <Typography fontSize={16}>{surveyInfo?.startDate}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>End Date</Typography>
                    <Typography fontSize={16}>{surveyInfo?.endDate}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            {isSMScreen ? (
              <Stack direction="row" justifyContent="flex-end">
                <IconButton
                  variant="light"
                  color="secondary"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MoreOutlined />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={() => setEdit(true)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleSurveyDelete(surveyInfo?.id)}>Delete</MenuItem>
                </Menu>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                {!edit && (
                  <>
                    <Button variant="outlined" onClick={() => setEdit(true)}>
                      <EditOutlined />
                      Edit
                    </Button>
                    <Button variant="outlined" color="info" onClick={() => handleSurveyDelete(surveyInfo?.id)}>
                      <DeleteOutlined />
                      Delete
                    </Button>
                  </>
                )}
              </Stack>
            )}
            <Box sx={{ width: '200px' }}>
              <Stack spacing={2.5} alignItems="center">
                <TextField
                  type="file"
                  id="change-avatar"
                  placeholder="Outlined"
                  variant="outlined"
                  sx={{ display: 'none' }}
                  onChange={(e) => setSelectedImage(e.target.files?.[0])}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ViewSurveyModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired,
  surveyInfo: PropTypes.object.isRequired
};

export default ViewSurveyModal;
