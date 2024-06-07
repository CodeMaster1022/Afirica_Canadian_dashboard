/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Modal, useMediaQuery } from '@mui/material';
import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';
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
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCommunity } from 'redux/communityRelated/communityHandle';
import { createStatus } from 'redux/statusRelated/statusHandle';
// project import
// import ProfileTab from './ProfileTab';
import Avatar from 'components/@extended/Avatar';
import Button from '@mui/material/Button';
import { ThemeMode } from 'config';
// assets

import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';

const AddNewUpdate = ({ modalOpen, modalClose }) => {
  const dispatch = useDispatch();
  const { communityList } = useSelector((state) => state.community);
  useEffect(() => {
    dispatch(getCommunity());
  }, [dispatch]);
  const theme = useTheme();
  const [image, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(userImage);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [video, setVideo] = useState('Hello');
  const [user, setUser] = useState('Hello');
  const [documnet, setDocument] = useState('Hello');
  const ProfileClose = () => {
    if (image !== '' && title !== '' && description !== '' && group !== '') {
      dispatch(createStatus({ image, title, description, group, video, user, documnet }));
      // modalClose();
    }
  };
  useEffect(() => {
    console.log(description);
  }, [title, description]);
  const [group, setCommunity] = useState('');
  const handleChangeCommunity = (event) => {
    event.preventDefault();
    setCommunity(event.target.value);
  };
  useEffect(() => {
    if (image) {
      setAvatar(URL.createObjectURL(image));
    }
  }, [image]);

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
          <Typography>Add New Update</Typography>
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
              <Grid item xs={12}>
                <Grid>
                  <Box sx={{ marginTop: '15px', padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
                    <TextField sx={{ width: '100%' }} value={title} required onChange={(e) => setTitle(e.target.value)} />
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
                      value={group}
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
                </Box>
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
              <Grid sx={{ marginTop: '35px' }}>
                <Stack direction="row" justifyContent="flex-end" spacing={2} paddingTop={1}>
                  <Button variant="contained" color="error" onClick={ProfileClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={ProfileClose}>
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
AddNewUpdate.propTypes = {
  modalOpen: PropTypes.bool,
  id: number,
  modalClose: PropTypes.func
};
export default AddNewUpdate;
