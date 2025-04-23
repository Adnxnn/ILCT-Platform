import { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { useChannel } from '../context/channelContent';

const RenameChannelModal = ({ open, handleClose, handleRename }) => {
    const { selectedChannel } = useChannel();
    const [newName, setNewName] = useState('');
    const [isPrivate, setPrivate] = useState(false);

    useEffect(() => {
        if (open && selectedChannel) {
            setNewName(selectedChannel.name || '');
            setPrivate(Boolean(selectedChannel.visibility))
        }
    }, [open, selectedChannel]);

    const handleSubmit = () => {
        handleRename(newName, isPrivate);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="rename-channel-modal-title"
            aria-describedby="rename-channel-modal-description"
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
                    borderRadius: 2,
                }}
            >
                <Typography id="rename-channel-modal-title" variant="h6" component="h2">
                    General
                </Typography>
                <TextField
                    fullWidth
                    label="Channel Name"
                    variant="outlined"
                    margin="normal"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <FormControlLabel control={<Checkbox checked={isPrivate} onChange={(e, value) => setPrivate(value)} />} label="Make private" /><br />
                {isPrivate && <Alert severity="warning">Private channels won't appear on channel search</Alert>}
                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default RenameChannelModal;
