import React from 'react';
import { Modal, Box, Typography, Button, Divider, Chip } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PublicIcon from '@mui/icons-material/Public';

const AboutModal = ({ open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="about-channel-modal"
            aria-describedby="about-channel-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    About
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant='body'>
                    <b>Public channels</b> are visible to everyone and their names will show up when they are searched while joining a channel.<br /><br />
                    <b>Private channels</b> are not visible and won't show up when they are searched.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ py: 2, textAlign: 'center' }}>
                    <Typography variant='p'>Representation</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Chip icon={<PublicIcon />} label="Public channel" variant="outlined" color='primary' />
                    <Chip icon={<VisibilityOffIcon />} label="Private channel" variant="outlined" color='secondary' />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                >
                    Okay
                </Button>
            </Box>
        </Modal>
    );
};

export default AboutModal;
