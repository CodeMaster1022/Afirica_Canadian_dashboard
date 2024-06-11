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
import { serviceCreate, getService } from 'redux/serviceRelated/serviceHandle';
// project import
// import ProfileTab from './ProfileTab';
import Avatar from 'components/@extended/Avatar';

import Button from '@mui/material/Button';
import { ThemeMode } from 'config';
// assets

import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';
import { userDetail } from 'redux/userRelated/userHandle';

const AddNewService = ({ modalOpen, modalClose }) => {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const Save = () => {
    const data = {
      title: title,
      description: description,
      categories: []
    };
    if (title !== '' && description !== '') {
      dispatch(serviceCreate(data));
      dispatch(getService());
      modalClose(true);
    }
  };
  const Cancel = () => {
    modalClose(true);
  };
  const handleChangeCategory = (event) => {
    event.preventDefault();
    setCategory(event.target.value);
  };
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
          <Typography>Add New Service</Typography>
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Grid container spacing={1}>
            <>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
                  <TextField sx={{ width: '100%' }} value={title} required onChange={(e) => setTitle(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C' }}>Description</Typography>
                  <TextField sx={{ width: '100%' }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#8C8C8C', paddingTop: '5px' }}>Category</Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      onChange={handleChangeCategory}
                      placeholder="category"
                    >
                      {categoryList.map((category, index) => (
                        <MenuItem value={index}>{category.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
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
AddNewService.propTypes = {
  modalOpen: PropTypes.bool,
  id: number,
  modalClose: PropTypes.func
};
export default AddNewService;
