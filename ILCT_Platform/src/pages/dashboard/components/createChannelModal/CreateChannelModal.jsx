import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Checkbox, FormControlLabel, Alert } from '@mui/material';
import { fetchChannels } from '../../../../api/channelService';

const CreateChannelModal = ({ open, handleClose, setChannels }) => {
    const [newChannelName, setNewChannelName] = useState('');
    const [isPrivate, setPrivate] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!newChannelName.trim()) {
            setError('Channel name cannot be empty');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_GLOBAL}/channel/add-channel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ 
                    name: newChannelName.trim(), 
                    isPrivate 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setNewChannelName('');
                handleClose();
                setChannels(await fetchChannels());
            } else {
                setError(data.message || 'Failed to create channel');
            }
        } catch (error) {
            console.error('Error creating channel:', error);
            setError('Failed to create channel. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={loading ? undefined : handleClose}
            aria-labelledby="create-channel-modal"
            aria-describedby="create-channel-modal-description"
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
                <Typography variant="h6" component="h2" gutterBottom>
                    Create New Channel
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <TextField
                    fullWidth
                    label="Channel Name"
                    variant="outlined"
                    margin="normal"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    disabled={loading}
                />
                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={isPrivate} 
                            onChange={(e) => setPrivate(e.target.checked)}
                            disabled={loading}
                        />
                    } 
                    label="Make private" 
                />
                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading || !newChannelName.trim()}
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateChannelModal;
