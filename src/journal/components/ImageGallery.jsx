import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const ImageGallery = ({ imgs }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState(null);

  const handleOpen = (img) => {
    setSelectedImg(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImg(null);
  };

  return (
    <>
      <ImageList sx={{ width: '100%', height: 500, scrollbarWidth:'none' }} cols={3}>
        {imgs?.map((img) => (
          <ImageListItem key={img} onClick={() => handleOpen(img)}>
            <img
              srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${img}?w=164&h=164&fit=crop&auto=format`}
              alt="Imagen de la nota"
              loading="lazy"
              style={{ cursor: 'pointer' }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={selectedImg}
            alt="Imagen ampliada"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </Box>
      </Modal>
    </>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};