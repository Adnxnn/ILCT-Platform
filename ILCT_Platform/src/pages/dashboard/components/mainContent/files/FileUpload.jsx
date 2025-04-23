import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    IconButton,
    Typography,
    LinearProgress,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Tooltip,
    Alert,
    Snackbar
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useChannel } from '../../context/channelContent';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);
    const { selectedChannel } = useChannel();

    const handleFileSelect = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const handleUpload = async () => {
        if (!selectedChannel?.id) {
            setError('Please select a channel first');
            return;
        }

        setUploading(true);
        setError('');
        setUploadProgress(0);

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('channelId', selectedChannel.id);

                const response = await fetch(`${import.meta.env.VITE_API_URL_GLOBAL}/files/upload`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Upload failed');
                }

                const data = await response.json();
                console.log('File uploaded:', data);
                
                // Update progress
                setUploadProgress(((i + 1) / files.length) * 100);
            }

            setSuccess('Files uploaded successfully');
            setFiles([]);
            setUploadProgress(0);
        } catch (error) {
            console.error('Upload error:', error);
            setError(error.message || 'Failed to upload files. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleCloseSnackbar = () => {
        setError('');
        setSuccess('');
    };

    return (
        <Box sx={{ p: 2 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            
            <Paper
                sx={{
                    p: 2,
                    mb: 2,
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    backgroundColor: 'background.paper',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    }
                }}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
                <Box sx={{ textAlign: 'center' }}>
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" color="primary">
                        Click to select files
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        or drag and drop files here
                    </Typography>
                </Box>
            </Paper>

            {files.length > 0 && (
                <List>
                    {files.map((file, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                bgcolor: 'background.paper',
                                mb: 1,
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider'
                            }}
                        >
                            <ListItemIcon>
                                <InsertDriveFileIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={file.name}
                                secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                            />
                            <ListItemSecondaryAction>
                                <Tooltip title="Remove">
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleRemoveFile(index)}
                                        sx={{ mr: 1 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}

            {uploading && (
                <Box sx={{ width: '100%', mt: 2 }}>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                        Uploading... {Math.round(uploadProgress)}%
                    </Typography>
                </Box>
            )}

            {files.length > 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={uploading}
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    {uploading ? 'Uploading...' : 'Upload Files'}
                </Button>
            )}

            <Snackbar
                open={Boolean(success)}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={success}
            />
        </Box>
    );
};

export default FileUpload; 