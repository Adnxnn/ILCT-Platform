import React, { useEffect, useState } from 'react';
import { 
    Typography, 
    Box, 
    Grid, 
    useTheme, 
    alpha, 
    Breadcrumbs,
    Link,
    Fab,
    Tooltip,
    Dialog
} from '@mui/material';
import { motion } from 'framer-motion';
import useMediaQuery from '@mui/material/useMediaQuery';
import GetStarted from '../getStarted/GetStarted';
import ChannelOptions from './channelOptions/channelOptions';
import { useChannelOptions } from '../context/context';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CodeIcon from '@mui/icons-material/Code';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from '../chatbox/ChatBox';

const MainContent = ({ selectedChannel }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { resetOptions } = useChannelOptions();
    const [chatOpen, setChatOpen] = useState(false);

    const isChannelSelected = selectedChannel !== null;

    useEffect(() => {
        resetOptions();
    }, [selectedChannel]);

    return (
        <Box sx={{ 
            flexGrow: 1, 
            height: '100%',
            overflow: 'auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.mode === 'dark' 
                ? alpha(theme.palette.background.default, 0.94)
                : alpha(theme.palette.background.default, 0.98),
            pt: '80px',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: theme.palette.mode === 'dark'
                    ? 'radial-gradient(circle at 50% 14em, rgba(49, 49, 49, 0.15) 0%, rgba(14, 14, 14, 0.05) 60%, rgba(21, 21, 21, 0) 100%)'
                    : 'radial-gradient(circle at 50% 14em, rgba(255, 255, 255, 0.8) 0%, rgba(240, 240, 240, 0.5) 60%, rgba(250, 250, 250, 0) 100%)',
                zIndex: 0,
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: theme.palette.mode === 'dark'
                    ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
                    : 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                opacity: 0.5,
                zIndex: 0,
            },
        }}>
            {/* Breadcrumb Navigation */}
            <Box 
                sx={{ 
                    position: 'sticky',
                    top: 0,
                    px: { xs: 2, sm: 3 },
                    py: 2,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                    zIndex: 9998,
                    background: theme.palette.mode === 'dark'
                        ? `linear-gradient(90deg, 
                            ${alpha(theme.palette.background.paper, 0.95)} 0%, 
                            ${alpha(theme.palette.background.paper, 0.95)} 100%)`
                        : `linear-gradient(90deg, 
                            ${alpha(theme.palette.background.paper, 0.95)} 0%, 
                            ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
                }}
            >
                <Breadcrumbs 
                    separator={
                        <NavigateNextIcon 
                            fontSize="small" 
                            sx={{ 
                                color: theme.palette.mode === 'dark' 
                                    ? alpha(theme.palette.common.white, 0.7)
                                    : alpha(theme.palette.common.black, 0.7)
                            }} 
                        />
                    }
                    aria-label="breadcrumb"
                    sx={{
                        '& .MuiBreadcrumbs-separator': {
                            mx: 1,
                        }
                    }}
                >
                    <Link
                        href="/"
                        sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: theme.palette.mode === 'dark' 
                                ? theme.palette.primary.light 
                                : theme.palette.primary.main,
                            '&:hover': {
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                            },
                            fontWeight: 500,
                        }}
                    >
                        <HomeIcon sx={{ mr: 0.5, fontSize: '1.25rem' }} />
                        Home
                    </Link>
                    <Typography 
                        sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.palette.text.primary,
                            fontWeight: 500,
                        }}
                    >
                        <CodeIcon sx={{ mr: 0.5, fontSize: '1.25rem' }} />
                        Javascript
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box sx={{ 
                flexGrow: 1,
                overflow: 'auto',
                p: { xs: 2, sm: 3 },
                position: 'relative',
                zIndex: 1,
            }}>
                {isChannelSelected ? (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ChannelOptions />
                        </Grid>
                    </Grid>
                ) : (
                    <GetStarted />
                )}
            </Box>

            {/* Floating Chat Button */}
            {isChannelSelected && (
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
            )}

            {/* Chat Dialog */}
            {isChannelSelected && (
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
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                                : '0 8px 32px rgba(0, 0, 0, 0.1)',
                            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                        }
                    }}
                >
                    <ChatBox 
                        channelName={selectedChannel.name} 
                        channelId={selectedChannel.id} 
                    />
                </Dialog>
            )}
        </Box>
    );
};

export default MainContent;
