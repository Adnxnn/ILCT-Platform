import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    TextField, 
    Snackbar, 
    IconButton, 
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Switch,
    Avatar,
    Tooltip,
    Paper,
    Divider,
    Chip,
    Badge,
    Menu,
    MenuItem,
    CircularProgress,
    Stack,
    alpha,
    Alert,
    Fab,
    Tabs,
    Tab,
    Collapse
} from '@mui/material';
import socket from '../../../../../utils/socket';
import { useChannel } from '../../context/channelContent';
import { save_session } from '../../../../../api/jamboardService';
import LoadSessionButton from './loadSession';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InfoIcon from '@mui/icons-material/Info';
import { useAuth } from '../../../../../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import SaveSessionButton from './saveSession';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from '../../chatbox/ChatBox';
import { motion } from 'framer-motion';
import DrawingJamboard from './DrawingJamboard';

const Jamboard = () => {
    const [code, setCode] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sessionName, setSessionName] = useState('');
    const { selectedChannel } = useChannel();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
    const [channelUsers, setChannelUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userPermissions, setUserPermissions] = useState({});
    const [isHost, setIsHost] = useState(false);
    const [canEdit, setCanEdit] = useState(true);
    const [chatOpen, setChatOpen] = useState(false);
    const { currentUser } = useAuth();
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [isDrawingMinimized, setIsDrawingMinimized] = useState(true);

    // Check if selectedChannel is valid and has necessary properties
    const isChannelValid = selectedChannel && selectedChannel.id;

    useEffect(() => {
        if (!isChannelValid) return;

        // Check if current user is host
        const checkHostStatus = async () => {
            try {
                let isUserHost = false;
                if (selectedChannel.created_by && currentUser?.id) {
                    isUserHost = selectedChannel.created_by === currentUser.id;
                } else {
                    isUserHost = true;
                }
                setIsHost(isUserHost);
                if (isUserHost) {
                    setCanEdit(true);
                } else {
                    fetchUserPermissions();
                }
            } catch (error) {
                console.error('Error checking host status:', error);
                setCanEdit(true);
            }
        };

        checkHostStatus();
        fetchChannelUsers();

        socket.on('code_update', (data) => {
            if (data.channel_id == selectedChannel.id) {
                setCode(data.code_update);
            }
        });

        socket.on('jamboard_permissions_update', (data) => {
            if (data.channel_id == selectedChannel.id) {
                setUserPermissions(data.permissions);
                if (data.permissions[currentUser?.id]) {
                    setCanEdit(data.permissions[currentUser?.id].canEdit);
                    if (data.userId === currentUser?.id) {
                        setSnackBarMessage(data.permissions[currentUser?.id].canEdit 
                            ? 'You now have edit permission for Jamboard' 
                            : 'Your edit permission for Jamboard has been removed');
                        setSnackBarOpen(true);
                    }
                }
            }
        });

        return () => {
            socket.off('code_update');
            socket.off('jamboard_permissions_update');
        };
    }, [selectedChannel, currentUser]);

    // Join the channel's jamboard room when component mounts or channel changes
    useEffect(() => {
        if (selectedChannel?.id) {
            socket.emit('join_jamboard', { channel_id: selectedChannel.id });
        }

        return () => {
            if (selectedChannel?.id) {
                socket.emit('leave_jamboard', { channel_id: selectedChannel.id });
            }
        };
    }, [selectedChannel?.id]);

    // Listen for code updates from other users
    useEffect(() => {
        const handleCodeUpdate = (data) => {
            if (data.channel_id === selectedChannel?.id) {
                setCode(data.code);
            }
        };

        socket.on('jamboard_update', handleCodeUpdate);

        return () => {
            socket.off('jamboard_update', handleCodeUpdate);
        };
    }, [selectedChannel?.id]);

    const fetchChannelUsers = async () => {
        if (!isChannelValid) return;
        
        setLoadingUsers(true);
        try {
            // Simulated API call
            setTimeout(() => {
                const currentUserObj = {
                    id: currentUser?.id || 'current-user',
                    name: currentUser?.email?.split('@')[0] || 'Current User',
                    email: currentUser?.email || 'user@example.com',
                    avatar: null
                };
                
                const dummyUsers = [
                    { id: '1', name: 'John Doe', email: 'john@example.com', avatar: null },
                    { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: null },
                    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', avatar: null },
                    currentUserObj
                ];
                
                setChannelUsers(dummyUsers);
                setLoadingUsers(false);
                initializeUserPermissions(dummyUsers);
            }, 800);
        } catch (error) {
            console.error('Error fetching channel users:', error);
            setLoadingUsers(false);
            setSnackBarMessage('Failed to load channel users');
            setSnackBarOpen(true);
        }
    };

    const initializeUserPermissions = (users) => {
        const permissions = {};
        users.forEach(user => {
            permissions[user.id] = {
                canEdit: true,
            };
        });
        setUserPermissions(permissions);
    };

    const fetchUserPermissions = () => {
        try {
            if (currentUser?.id && userPermissions[currentUser.id]) {
                setCanEdit(userPermissions[currentUser.id].canEdit);
            } else {
                setCanEdit(true);
            }
        } catch (error) {
            console.error('Error fetching user permissions:', error);
            setCanEdit(true);
        }
    };

    const toggleUserPermission = (userId) => {
        if (!isHost) return;
        
        const updatedPermissions = { ...userPermissions };
        if (updatedPermissions[userId]) {
            updatedPermissions[userId].canEdit = !updatedPermissions[userId].canEdit;
        } else {
            updatedPermissions[userId] = { canEdit: true };
        }
        
        setUserPermissions(updatedPermissions);
        socket.emit('update_jamboard_permissions', {
            channel_id: selectedChannel.id,
            permissions: updatedPermissions,
            userId,
        });
        
        const userName = channelUsers.find(user => user.id === userId)?.name || 'User';
        setSnackBarMessage(`Permission ${updatedPermissions[userId].canEdit ? 'granted to' : 'revoked from'} ${userName}`);
        setSnackBarOpen(true);
    };

    const handleKeyDown = (event) => {
        if (!canEdit) return;
        
        if (event.key === 'Tab') {
            event.preventDefault();
            const start = event.target.selectionStart;
            const end = event.target.selectionEnd;

            setCode(prevCode => prevCode.substring(0, start) + '\t' + prevCode.substring(end));

            setTimeout(() => {
                event.target.selectionStart = event.target.selectionEnd = start + 1;
            }, 0);
        }
    };

    const handleChange = (event) => {
        if (!canEdit) return;
        
        const newCode = event.target.value;
        setCode(newCode);
        
        // Emit the code change to all users in the channel
        if (selectedChannel?.id) {
            socket.emit('jamboard_change', {
                channel_id: selectedChannel.id,
                code: newCode
            });
        }
    };

    const handleSave = async () => {
        if (!canEdit || !isChannelValid) return;
        
        const data = {
            channel_id: selectedChannel.id,
            code,
            sessionName
        }
        if (await save_session(data)) {
            setDialogOpen(false)
            setSessionName('')
            setSnackBarMessage('Session saved')
            setSnackBarOpen(true)
        }
    }

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setIsDrawingMinimized(newValue === 0);
    };

    // Show a message if no channel is selected
    if (!isChannelValid) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>Jamboard</Typography>
                <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                    Please select a channel to use the Jamboard feature.
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                        minWidth: 100,
                        textTransform: 'none',
                    },
                }}
            >
                <Tab label="Text" />
                <Tab label="Drawing" />
            </Tabs>

            <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                <Collapse in={isDrawingMinimized} timeout={300}>
                    <Box sx={{ height: '100%' }}>
                        <Card sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                                <textarea
                                    value={code}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder={canEdit 
                                        ? "Start typing your code here..." 
                                        : "You don't have permission to edit. Contact the host for access."}
                                    rows={20}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        fontSize: '16px',
                                        fontFamily: 'monospace',
                                        padding: '16px',
                                        border: 'none',
                                        outline: 'none',
                                        resize: 'none',
                                        boxSizing: 'border-box',
                                        backgroundColor: 'inherit',
                                        color: 'inherit',
                                        cursor: canEdit ? 'text' : 'not-allowed',
                                        opacity: canEdit ? 1 : 0.8,
                                    }}
                                    readOnly={!canEdit}
                                />
                            </CardContent>
                        </Card>
                    </Box>
                </Collapse>
                <Collapse in={!isDrawingMinimized} timeout={300}>
                    <Box sx={{ height: '100%' }}>
                        <DrawingJamboard canEdit={canEdit} />
                    </Box>
                </Collapse>
            </Box>

            <Box sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5">
                        Jamboard
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {canEdit ? (
                            <Chip 
                                icon={<LockOpenIcon fontSize="small" />} 
                                label="Can Edit" 
                                color="success" 
                                size="small"
                                sx={{ mr: 1 }}
                            />
                        ) : (
                            <Chip 
                                icon={<LockIcon fontSize="small" />} 
                                label="View Only" 
                                color="default" 
                                size="small" 
                                sx={{ mr: 1 }}
                            />
                        )}
                        
                        {isHost && (
                            <Tooltip title="Manage User Permissions">
                                <IconButton 
                                    color="primary" 
                                    onClick={() => setPermissionsDialogOpen(true)}
                                >
                                    <SettingsIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Box>
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                        variant='outlined' 
                        sx={{ display: { xs: 'none', sm: 'block' } }} 
                        startIcon={<DeleteIcon />} 
                        onClick={() => setCode('')} 
                        disabled={code === '' || !canEdit}
                    >
                        Clear
                    </Button>
                    <IconButton 
                        sx={{ display: { xs: 'block', sm: 'none' } }} 
                        onClick={() => setCode('')} 
                        disabled={code === '' || !canEdit}
                    >
                        <DeleteIcon />
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <LoadSessionButton setCode={setCode} disabled={!canEdit} />
                        <SaveSessionButton code={code} disabled={!canEdit} />
                    </Box>
                </Box>
                
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>Save Session</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Session Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={sessionName}
                            onChange={(e) => setSessionName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
                
                <Dialog 
                    open={permissionsDialogOpen} 
                    onClose={() => setPermissionsDialogOpen(false)}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Jamboard Permissions
                    </DialogTitle>
                    
                    <DialogContent>
                        {loadingUsers ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress size={24} />
                            </Box>
                        ) : channelUsers.length === 0 ? (
                            <Box sx={{ textAlign: 'center', p: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No users found in this channel.
                                </Typography>
                            </Box>
                        ) : (
                            <List>
                                {channelUsers.map((user) => (
                                    <ListItem key={user.id}>
                                        <Avatar sx={{ mr: 2 }}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <ListItemText 
                                            primary={user.name}
                                            secondary={user.email}
                                        />
                                        <ListItemSecondaryAction>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="body2" color="text.secondary">
                                                    {userPermissions[user.id]?.canEdit ? 'Can edit' : 'View only'}
                                                </Typography>
                                                <Switch
                                                    edge="end"
                                                    disabled={!isHost || (selectedChannel.created_by && user.id === selectedChannel.created_by)}
                                                    checked={!!userPermissions[user.id]?.canEdit}
                                                    onChange={() => toggleUserPermission(user.id)}
                                                    color="primary"
                                                />
                                            </Stack>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={() => setPermissionsDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>

            {/* Floating Action Button for Chat */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 1000,
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: theme.palette.primary.main,
                            animation: 'ripple 1.5s infinite ease-in-out',
                            zIndex: -1,
                        },
                        '@keyframes ripple': {
                            '0%': {
                                transform: 'scale(1)',
                                opacity: 0.4,
                            },
                            '100%': {
                                transform: 'scale(2)',
                                opacity: 0,
                            },
                        },
                    }}
                >
                    <Tooltip title="Open Chat">
                        <Fab
                            color="primary"
                            aria-label="chat"
                            onClick={() => setChatOpen(true)}
                            sx={{
                                width: 64,
                                height: 64,
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                },
                                transition: 'transform 0.2s',
                            }}
                        >
                            <ChatIcon sx={{ fontSize: 32 }} />
                        </Fab>
                    </Tooltip>
                </Box>
            </motion.div>

            {/* Chat Dialog */}
            <Dialog
                open={chatOpen}
                onClose={() => setChatOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        height: '80vh',
                        maxHeight: '800px',
                        borderRadius: 3,
                        background: theme.palette.mode === 'dark' 
                            ? 'rgba(18, 18, 18, 0.95)'
                            : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                    }
                }}
            >
                {selectedChannel && (
                    <ChatBox 
                        channelName={selectedChannel.name} 
                        channelId={selectedChannel.id} 
                    />
                )}
            </Dialog>

            <Snackbar
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackBarOpen(false)}
            >
                <Alert onClose={() => setSnackBarOpen(false)} severity="success">
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Jamboard;
