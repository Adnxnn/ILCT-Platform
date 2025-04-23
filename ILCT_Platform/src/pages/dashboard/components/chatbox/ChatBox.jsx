import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, useTheme, Paper, Button, CircularProgress, Tabs, Tab } from '@mui/material';
import socket from '../../../../utils/socket';
import { fetchMessages, sendMessage } from '../../../../api/messageService';
import Inbox from './Inbox';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { motion, AnimatePresence } from 'framer-motion';
import ChatPopup from './ChatPopup';

const ChatBox = ({ channelId, channelName }) => {
    const theme = useTheme();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [aiMessages, setAiMessages] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const fetchAndSetMessages = async () => setMessages(await fetchMessages(channelId))
        const handleNewMessage = (message) => message.channel_id == channelId ? setMessages((prevMessages) => [...prevMessages, message]) : null

        fetchAndSetMessages()
        socket.on('newMessage', handleNewMessage);
        return () => {
            socket.emit('leaveChannel', channelId);
            socket.off('newMessage', handleNewMessage);
        };
    }, [channelId]);

    const generateAIResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        
        // Code Analysis and Help
        if (lowerMessage.includes('error') || lowerMessage.includes('bug') || lowerMessage.includes('exception')) {
            return `I can help you debug this issue. Let's follow a systematic approach:

1. Error Analysis:
   - Share the exact error message and stack trace
   - Identify which part of the code is causing the issue
   - Check if it's a runtime or compilation error

2. Common Causes:
   - Missing dependencies
   - Incorrect syntax
   - Type mismatches
   - Undefined variables
   - API integration issues

3. Debugging Steps:
   - Add console.log statements
   - Use breakpoints
   - Check network requests
   - Verify data types

Would you like to share your code so I can help identify the specific issue?`;
        } 
        else if (lowerMessage.includes('code') || lowerMessage.includes('implement') || lowerMessage.includes('function')) {
            return `I can help you with your code implementation. Here's what I can do:

1. Code Review:
   - Analyze your code for best practices
   - Suggest optimizations
   - Identify potential bugs
   - Improve readability

2. Implementation Help:
   - Provide code examples
   - Explain algorithms
   - Help with specific frameworks
   - Debug issues

3. Best Practices:
   - Design patterns
   - Code organization
   - Performance optimization
   - Security considerations

Please share your code or describe what you're trying to achieve, and I'll help you implement it effectively.`;
        }
        // Technical Documentation
        else if (lowerMessage.includes('document') || lowerMessage.includes('api') || lowerMessage.includes('docs')) {
            return `I can help you with technical documentation. Here's what I can assist with:

1. API Documentation:
   - Endpoint descriptions
   - Request/response formats
   - Authentication methods
   - Error handling

2. Code Documentation:
   - Function documentation
   - Class descriptions
   - Parameter explanations
   - Usage examples

3. General Documentation:
   - README files
   - Setup guides
   - Architecture diagrams
   - Best practices

What specific documentation do you need help with?`;
        }
        // Best Practices and Optimization
        else if (lowerMessage.includes('best practice') || lowerMessage.includes('optimize') || lowerMessage.includes('improve')) {
            return `I can help you optimize your code and follow best practices. Here are key areas:

1. Code Quality:
   - Clean code principles
   - SOLID principles
   - Design patterns
   - Code organization

2. Performance:
   - Algorithm optimization
   - Memory management
   - Caching strategies
   - Load balancing

3. Security:
   - Input validation
   - Authentication
   - Authorization
   - Data encryption

4. Testing:
   - Unit testing
   - Integration testing
   - Test coverage
   - Mocking

Which area would you like to focus on?`;
        }
        // Framework-specific Help
        else if (lowerMessage.includes('react') || lowerMessage.includes('vue') || lowerMessage.includes('angular')) {
            return `I can help you with ${message.split(' ').find(word => ['react', 'vue', 'angular'].includes(word.toLowerCase()))} development. Here's what I can assist with:

1. Component Development:
   - Component structure
   - State management
   - Props and events
   - Lifecycle methods

2. Best Practices:
   - Performance optimization
   - Code organization
   - State management
   - Routing

3. Common Issues:
   - Rendering problems
   - State updates
   - Component communication
   - Performance issues

What specific aspect would you like help with?`;
        }
        // General Conversation
        else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return `Hello! I'm your AI coding assistant. I can help you with:

1. Code Development:
   - Writing and debugging code
   - Implementing features
   - Code optimization
   - Best practices

2. Technical Support:
   - Framework guidance
   - API integration
   - Database queries
   - Architecture design

3. Learning Resources:
   - Tutorials
   - Documentation
   - Code examples
   - Best practices

What would you like to work on today?`;
        }
        else if (lowerMessage.includes('thank')) {
            return `You're welcome! I'm here to help you with any coding challenges or questions you might have. Feel free to ask about:
- Code implementation
- Debugging
- Best practices
- Technical documentation
- Or any other programming-related topics!`;
        }
        else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            return `I'm a specialized AI coding assistant. Here's what I can help you with:

1. Code Development:
   - Write and debug code
   - Implement features
   - Optimize performance
   - Review code quality

2. Technical Support:
   - Framework guidance (React, Vue, Angular, etc.)
   - API integration
   - Database queries
   - Architecture design

3. Best Practices:
   - Code organization
   - Design patterns
   - Security
   - Performance optimization

4. Documentation:
   - API documentation
   - Code documentation
   - README files
   - Technical guides

Just let me know what you need help with, and I'll provide detailed, practical assistance!`;
        }
        // Default Response
        else {
            return `I'm your AI coding assistant. I can help you with:

1. Code Development:
   - Writing and debugging code
   - Implementing features
   - Code optimization
   - Best practices

2. Technical Support:
   - Framework guidance
   - API integration
   - Database queries
   - Architecture design

3. Learning Resources:
   - Tutorials
   - Documentation
   - Code examples
   - Best practices

What specific help do you need? Feel free to:
- Share code for review
- Ask about implementation
- Request best practices
- Get debugging help
- Or ask any other programming-related questions!`;
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                if (activeTab === 0) {
                    // Channel chat
                await sendMessage(channelId, newMessage);
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
                    setTimeout(() => {
                        const aiResponse = {
                            id: Date.now() + 1,
                            text: generateAIResponse(newMessage),
                            sender: 'ai',
                            timestamp: new Date().toLocaleTimeString(),
                        };
                        setAiMessages(prev => [...prev, aiResponse]);
                        setIsTyping(false);
                    }, 1000);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setNewMessage('');
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

    const handleTogglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <Box>
            <IconButton
                onClick={handleTogglePopup}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(45deg, #2196F3, #00BCD4)',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2, #0097A7)',
                        transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                }}
            >
                <ChatIcon />
            </IconButton>

            <ChatPopup
                open={isPopupOpen}
                onClose={handleTogglePopup}
            />

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
                            {channelName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {activeTab === 0 ? 'Channel Chat' : 'AI Assistant'}
                </Typography>
                    </Box>
                </Paper>

                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                        mb: 2,
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

                {activeTab === 1 && (
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Button
                            startIcon={<ChatIcon />}
                            onClick={() => setNewMessage('Hello! How can you help me?')}
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
                            General Help
                        </Button>
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
                )}

                <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
                    {activeTab === 0 ? (
                    <Inbox messages={messages} />
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
            </Box>
        </Box>
    );
};

export default ChatBox;
