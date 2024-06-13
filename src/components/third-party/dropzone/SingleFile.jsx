/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from 'prop-types';
// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import React from 'react';
// third-party
import { useDropzone } from 'react-dropzone';

// project import
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  background: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

export function SingleFileUpload({ error, file, setFieldValue, sx }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: {
      'application/pdf': []
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFieldValue(
        'files',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs =
    file &&
    file.map((item) => (
      <CardMedia
        key={item.name}
        component="img"
        src={item.preview}
        sx={{
          top: 8,
          left: 8,
          borderRadius: 2,
          position: 'absolute',
          width: 'calc(100% - 16px)',
          height: 'calc(100% - 16px)',
          bgcolor: 'background.paper'
        }}
        onLoad={() => {
          URL.revokeObjectURL(item.preview);
        }}
      />
    ));

  const onRemove = () => {
    setFieldValue('files', null);
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(file && {
            padding: '12% 0'
          })
        }}
      >
        <input {...getInputProps()} />
        <PlaceholderContent content="document" />
        {thumbs}
      </DropzoneWrapper>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {file && file.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1.5 }}>
          <Button variant="contained" color="error" onClick={onRemove}>
            Remove
          </Button>
        </Stack>
      )}
    </Box>
  );
}
export default function VideoInput(width, height) {
  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };

  return (
    <Box sx={{ marginTop: '20px', padding: '5px' }}>
      <TextField ref={inputRef} type="file" onChange={handleFileChange} accept=".mov,.mp4" />
      {/* {!source && <Button onClick={handleChoose}>Choose</Button>} */}
      {source && <video className="VideoInput_video" width="100%" height={height} controls src={source} />}
      <div className="VideoInput_footer">{source || 'Select the Video'}</div>
    </Box>
  );
}

SingleFileUpload.propTypes = { error: PropTypes.bool, file: PropTypes.any, setFieldValue: PropTypes.func, sx: PropTypes.object };
