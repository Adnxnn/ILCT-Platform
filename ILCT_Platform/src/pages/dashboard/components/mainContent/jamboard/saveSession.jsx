import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
    useTheme,
    Tooltip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { save_session } from '../../../../../api/jamboardService';
import { useChannel } from '../../../../../pages/dashboard/components/context/channelContent';

export default function SaveSessionButton({ code, disabled }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sessionName, setSessionName] = useState('');
    const { selectedChannel } = useChannel();
    const theme = useTheme();

    const handleSave = async () => {
        if (!selectedChannel?.id || disabled || !sessionName.trim()) return;
        
        const data = {
            channel_id: selectedChannel.id,
            code,
            sessionName: sessionName.trim()
        };

        try {
            const result = await save_session(data);
            if (result) {
                setDialogOpen(false);
                setSessionName('');
                // You can add a success notification here if needed
            }
        } catch (error) {
            console.error('Error saving session:', error);
            // You can add error handling here
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                disabled={disabled || !code}
                onClick={() => setDialogOpen(true)}
                startIcon={<CloudUploadIcon />}
                sx={{
                    ml: 1,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                        : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    '&:hover': {
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(45deg, #1976d2 30%, #2196F3 90%)'
                            : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                    }
                }}
            >
                Save Session
            </Button>

            <Dialog 
                open={dialogOpen} 
                onClose={() => setDialogOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        background: theme.palette.mode === 'dark'
                            ? 'rgba(18, 18, 18, 0.95)'
                            : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                    }
                }}
            >
                <DialogTitle>Save Session</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Session Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        sx={{
                            mt: 2,
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button 
                        onClick={() => setDialogOpen(false)}
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSave}
                        variant="contained"
                        disabled={!sessionName.trim()}
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                                : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(45deg, #1976d2 30%, #2196F3 90%)'
                                    : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
} 