import React, { useState, useEffect, useRef } from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    TextField, 
    IconButton, 
    useTheme, 
    alpha, 
    Tooltip,
    Avatar,
    Badge,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Chat = () => {
    const theme = useTheme();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const messagesEndRef = useRef(null);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now(),
                text: newMessage,
                sender: 'You',
                timestamp: new Date().toLocaleTimeString(),
                isStarred: false
            };
            setMessages(prev => [...prev, message]);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleMenuClick = (event, message) => {
        setAnchorEl(event.currentTarget);
        setSelectedMessage(message);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMessage(null);
    };

    const handleStarMessage = () => {
        if (selectedMessage) {
            setMessages(prev => prev.map(msg => 
                msg.id === selectedMessage.id 
                    ? { ...msg, isStarred: !msg.isStarred }
                    : msg
            ));
            handleMenuClose();
        }
    };

    const handleDeleteMessage = () => {
        if (selectedMessage) {
            setMessages(prev => prev.filter(msg => msg.id !== selectedMessage.id));
            handleMenuClose();
        }
    };

    return (
        <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2
        }}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    background: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.8)
                        : alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                }}
            >
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 600,
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
                            : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Premium Chat
                </Typography>
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    flex: 1,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    background: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.8)
                        : alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: message.sender === 'You' ? 'flex-end' : 'flex-start',
                                        mb: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            maxWidth: '70%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: message.sender === 'You' ? 'flex-end' : 'flex-start',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                mb: 0.5,
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    bgcolor: message.sender === 'You' 
                                                        ? theme.palette.primary.main 
                                                        : theme.palette.secondary.main
                                                }}
                                            >
                                                {message.sender[0]}
                                            </Avatar>
                                            <Typography variant="caption" color="text.secondary">
                                                {message.sender} • {message.timestamp}
                                            </Typography>
                                        </Box>
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                p: 1.5,
                                                background: message.sender === 'You'
                                                    ? alpha(theme.palette.primary.main, 0.1)
                                                    : alpha(theme.palette.background.paper, 0.5),
                                                borderRadius: 2,
                                                position: 'relative',
                                            }}
                                        >
                                            <Typography variant="body1">
                                                {message.text}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleMenuClick(e, message)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 4,
                                                    right: 4,
                                                    opacity: 0,
                                                    transition: 'opacity 0.2s',
                                                    '&:hover': {
                                                        opacity: 1,
                                                    },
                                                }}
                                            >
                                                <MoreVertIcon fontSize="small" />
                                            </IconButton>
                                        </Paper>
                                    </Box>
                                </Box>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                        pt: 2,
                        borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        multiline
                        maxRows={4}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                        }}
                    />
                    <Tooltip title="Attach file">
                        <IconButton
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                }
                            }}
                        >
                            <AttachFileIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Emoji">
                        <IconButton
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                }
                            }}
                        >
                            <EmojiEmotionsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Send">
                        <IconButton
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            sx={{
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                }
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Paper>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        borderRadius: 2,
                        minWidth: 200,
                    }
                }}
            >
                <MenuItem onClick={handleStarMessage}>
                    <ListItemIcon>
                        {selectedMessage?.isStarred ? <StarIcon color="primary" /> : <StarBorderIcon />}
                    </ListItemIcon>
                    <ListItemText primary={selectedMessage?.isStarred ? "Unstar Message" : "Star Message"} />
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <ReplyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reply" />
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleDeleteMessage} sx={{ color: 'error.main' }}>
                    <ListItemIcon>
                        <DeleteIcon color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Chat; 