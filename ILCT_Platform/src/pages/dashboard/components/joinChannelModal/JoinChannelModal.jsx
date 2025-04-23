import React, { useEffect, useState } from 'react';
import { 
    Modal, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Autocomplete, 
    CircularProgress,
    Alert,
    InputAdornment
} from '@mui/material';
import { fetchChannels, joinChannel, searchChannels } from '../../../../api/channelService';
import SearchIcon from '@mui/icons-material/Search';

const JoinChannelModal = ({ open, handleClose, setChannels }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [channelLists, setChannelLists] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        const searchChannels = async () => {
            if (!searchQuery.trim()) {
                setChannelLists([]);
                return;
            }

            setSearchLoading(true);
            setError('');

            try {
                const results = await searchChannels(searchQuery);
                setChannelLists(results);
            } catch (error) {
                console.error('Error searching channels:', error);
                setError('Failed to search channels. Please try again.');
            } finally {
                setSearchLoading(false);
            }
        };

        const debounceTimer = setTimeout(searchChannels, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleJoinChannel = async (channel) => {
        if (!channel) return;

        setLoading(true);
        setError('');

        try {
            const success = await joinChannel(channel.id);
            if (success) {
                setChannels(await fetchChannels());
                handleClose();
            } else {
                setError('Failed to join channel. You may already be a member.');
            }
        } catch (error) {
            console.error('Error joining channel:', error);
            setError('Failed to join channel. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={loading ? undefined : handleClose}
            aria-labelledby="join-channel-modal"
            aria-describedby="join-channel-modal-description"
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
                    Join Channel
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Autocomplete
                    fullWidth
                    options={channelLists}
                    getOptionLabel={(option) => option.name}
                    loading={searchLoading}
                    value={null}
                    onChange={(event, newValue) => handleJoinChannel(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Channels"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <>
                                        {searchLoading ? (
                                            <CircularProgress color="inherit" size={20} />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <Typography variant="body1">{option.name}</Typography>
                            {option.isPrivate && (
                                <Typography 
                                    variant="caption" 
                                    color="text.secondary"
                                    sx={{ ml: 1 }}
                                >
                                    (Private)
                                </Typography>
                            )}
                        </Box>
                    )}
                />
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default JoinChannelModal;
