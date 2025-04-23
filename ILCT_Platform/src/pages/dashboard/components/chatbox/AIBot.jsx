import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    IconButton,
    useTheme,
    Paper,
    Button,
    CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const AIBot = () => {
    const theme = useTheme();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const userMessage = {
                id: Date.now(),
                text: newMessage,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages(prev => [...prev, userMessage]);
            setNewMessage('');
            setIsTyping(true);

            // Simulate AI response (replace with actual API call)
            setTimeout(() => {
                const aiResponse = {
                    id: Date.now() + 1,
                    text: generateAIResponse(newMessage),
                    sender: 'ai',
                    timestamp: new Date().toLocaleTimeString(),
                };
                setMessages(prev => [...prev, aiResponse]);
                setIsTyping(false);
            }, 1000);
        }
    };

    const generateAIResponse = (message) => {
        // This is a placeholder. Replace with actual AI logic
        if (message.toLowerCase().includes('error')) {
            return `I can help you with that error. Here's what might be causing it:
1. Check if all dependencies are properly installed
2. Verify the syntax in your code
3. Make sure all required parameters are provided

Would you like me to look at your code more specifically?`;
        } else if (message.toLowerCase().includes('code')) {
            return `I can help you with your code. Please share:
1. The specific part of the code you're working on
2. Any error messages you're seeing
3. What you're trying to achieve`;
        } else {
            return `I'm here to help with your technical questions. You can ask me about:
- Code errors and debugging
- Best practices
- Implementation suggestions
- Code reviews

What would you like to know?`;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            p: 2,
        }}>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(0, 188, 212, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 3,
                    mb: 2,
                }}
            >
                <Box>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 600,
                            background: 'linear-gradient(45deg, #2196F3, #00BCD4)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        AI Code Assistant
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Your intelligent coding companion
                    </Typography>
                </Box>
            </Paper>

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
                {isTyping && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                        <CircularProgress size={20} />
                        <Typography variant="body2" color="text.secondary">
                            AI is thinking...
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                    startIcon={<CodeIcon />}
                    onClick={() => setNewMessage('Can you help me with my code?')}
                    sx={{
                        flex: 1,
                        background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(0, 188, 212, 0.1))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        color: 'text.primary',
                        '&:hover': {
                            background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(0, 188, 212, 0.2))',
                        }
                    }}
                >
                    Code Help
                </Button>
                <Button
                    startIcon={<BugReportIcon />}
                    onClick={() => setNewMessage('I have an error in my code')}
                    sx={{
                        flex: 1,
                        background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(0, 188, 212, 0.1))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        color: 'text.primary',
                        '&:hover': {
                            background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(0, 188, 212, 0.2))',
                        }
                    }}
                >
                    Debug
                </Button>
                <Button
                    startIcon={<AutoFixHighIcon />}
                    onClick={() => setNewMessage('Can you suggest best practices?')}
                    sx={{
                        flex: 1,
                        background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(0, 188, 212, 0.1))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        color: 'text.primary',
                        '&:hover': {
                            background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.2), rgba(0, 188, 212, 0.2))',
                        }
                    }}
                >
                    Best Practices
                </Button>
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
                    placeholder="Ask about code errors, best practices, or implementation help..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
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
                    disabled={!newMessage.trim() || isTyping}
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
        </Box>
    );
};

export default AIBot; 