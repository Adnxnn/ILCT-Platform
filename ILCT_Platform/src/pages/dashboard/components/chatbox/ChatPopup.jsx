import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    useTheme,
    Tabs,
    Tab,
    Paper,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';

const ChatPopup = ({ open, onClose }) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [messages, setMessages] = useState([]);
    const [aiMessages, setAiMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setNewMessage('');
    };

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                if (activeTab === 0) {
                    // Channel chat
                    const userMessage = {
                        id: Date.now(),
                        text: newMessage,
                        sender: 'user',
                        timestamp: new Date().toLocaleTimeString(),
                    };
                    setMessages(prev => [...prev, userMessage]);
                    setNewMessage('');
                } else {
                    // AI chat
                    const userMessage = {
                        id: Date.now(),
                        text: newMessage,
                        sender: 'user',
                        timestamp: new Date().toLocaleTimeString(),
                    };
                    setAiMessages(prev => [...prev, userMessage]);
                    setNewMessage('');
                    
                    setIsTyping(true);
                    
                    try {
                        const response = await fetch('https://api.openai.com/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
                            },
                            body: JSON.stringify({
                                model: "gpt-3.5-turbo",
                                messages: [
                                    {
                                        role: "system",
                                        content: "You are a helpful AI assistant that can help with both general questions and technical coding queries."
                                    },
                                    {
                                        role: "user",
                                        content: newMessage
                                    }
                                ],
                                temperature: 0.7,
                                max_tokens: 500
                            })
                        });

                        const data = await response.json();
                        const aiResponse = {
                            id: Date.now() + 1,
                            text: data.choices[0].message.content,
                            sender: 'ai',
                            timestamp: new Date().toLocaleTimeString(),
                        };
                        setAiMessages(prev => [...prev, aiResponse]);
                    } catch (error) {
                        console.error('Error calling OpenAI API:', error);
                        const errorResponse = {
                            id: Date.now() + 1,
                            text: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later.",
                            sender: 'ai',
                            timestamp: new Date().toLocaleTimeString(),
                        };
                        setAiMessages(prev => [...prev, errorResponse]);
                    } finally {
                        setIsTyping(false);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const renderMessages = (messagesList) => (
        <AnimatePresence>
            {messagesList.map((message) => (
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
                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            mb: 2,
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                maxWidth: '70%',
                                background: message.sender === 'user'
                                    ? 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(0, 188, 212, 0.1))'
                                    : 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 3,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Typography variant="body1">
                                {message.text}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                {message.sender === 'user' ? 'You' : 'AI Assistant'} • {message.timestamp}
                            </Typography>
                        </Paper>
                    </Box>
                </motion.div>
            ))}
        </AnimatePresence>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    height: '80vh',
                    maxHeight: '800px',
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }
            }}
        >
            <DialogTitle sx={{ 
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTab-root': {
                                minWidth: 'auto',
                                px: 3,
                                py: 1,
                                color: 'text.secondary',
                                '&.Mui-selected': {
                                    color: 'primary.main',
                                },
                            },
                            '& .MuiTabs-indicator': {
                                background: 'linear-gradient(45deg, #2196F3, #00BCD4)',
                            },
                        }}
                    >
                        <Tab 
                            icon={<ChatIcon />} 
                            label="Channel Chat" 
                            sx={{ 
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 1,
                                alignItems: 'center',
                            }}
                        />
                        <Tab 
                            icon={<SmartToyIcon />} 
                            label="AI Assistant" 
                            sx={{ 
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 1,
                                alignItems: 'center',
                            }}
                        />
                    </Tabs>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'primary.main',
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ 
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}>
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                    {activeTab === 0 ? (
                        renderMessages(messages)
                    ) : (
                        <>
                            {renderMessages(aiMessages)}
                            {isTyping && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                                    <CircularProgress size={20} />
                                    <Typography variant="body2" color="text.secondary">
                                        AI is thinking...
                                    </Typography>
                                </Box>
                            )}
                        </>
                    )}
                </Box>
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder={activeTab === 0 ? "Type your message..." : "Ask me anything - I can help with general questions, code, and more..."}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        multiline
                        maxRows={4}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                background: 'rgba(255, 255, 255, 0.05)',
                                '&:hover fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                        }}
                    />
                    <IconButton
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        sx={{
                            color: 'primary.main',
                            background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(0, 188, 212, 0.1))',
                            '&:hover': {
                                background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(0, 188, 212, 0.2))',
                            }
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ChatPopup; 