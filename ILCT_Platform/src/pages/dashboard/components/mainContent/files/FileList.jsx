import React, { useState, useEffect } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    CircularProgress,
    Menu,
    MenuItem,
    Alert,
    Snackbar,
    Tooltip
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { useChannel } from '../../context/channelContent';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { selectedChannel } = useChannel();

    useEffect(() => {
        if (selectedChannel?.id) {
            fetchFiles();
        }
    }, [selectedChannel]);

    const fetchFiles = async () => {
        if (!selectedChannel?.id) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL_GLOBAL}/files/list?channelId=${selectedChannel.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch files');
                } else {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
            }

            const data = await response.json();
            setFiles(data.files || []);
        } catch (error) {
            console.error('Error fetching files:', error);
            setError(error.message || 'Failed to fetch files');
        } finally {
            setLoading(false);
        }
    };

    const handleMenuOpen = (event, file) => {
        setMenuAnchor(event.currentTarget);
        setSelectedFile(file);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setSelectedFile(null);
    };

    const handleDownload = async () => {
        if (!selectedFile || !selectedChannel?.id) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL_GLOBAL}/files/download/${selectedChannel.id}/${selectedFile.filename}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Download failed');
                } else {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = selectedFile.originalname;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setSuccess('File downloaded successfully');
        } catch (error) {
            console.error('Download error:', error);
            setError(error.message || 'Failed to download file');
        } finally {
            handleMenuClose();
        }
    };

    const handleDelete = async () => {
        if (!selectedFile || !selectedChannel?.id) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL_GLOBAL}/files/delete/${selectedChannel.id}/${selectedFile.filename}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Delete failed');
                } else {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
            }

            setFiles(prev => prev.filter(file => file.id !== selectedFile.id));
            setSuccess('File deleted successfully');
        } catch (error) {
            console.error('Delete error:', error);
            setError(error.message || 'Failed to delete file');
        } finally {
            handleMenuClose();
        }
    };

    const handleCloseSnackbar = () => {
        setError('');
        setSuccess('');
    };

    const formatFileSize = (bytes) => {
        if (!bytes || isNaN(bytes)) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid date';
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {files.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                    No files uploaded yet
                </Typography>
            ) : (
                <List>
                    {files.map((file) => (
                        <ListItem
                            key={file.id}
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
                                primary={file.originalname}
                                secondary={`${formatFileSize(file.size)} • Uploaded ${formatDate(file.uploadedAt)}`}
                            />
                            <ListItemSecondaryAction>
                                <Tooltip title="More options">
                                    <IconButton
                                        edge="end"
                                        onClick={(e) => handleMenuOpen(e, file)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}

            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleDownload}>
                    <ListItemIcon>
                        <DownloadIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Download</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>

            <Snackbar
                open={Boolean(success)}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={success}
            />
        </Box>
    );
};

export default FileList; 