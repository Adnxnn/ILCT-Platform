import React, { useState, useEffect } from 'react';
import { 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  CssBaseline, 
  Button, 
  IconButton, 
  alpha,
  Avatar,
  Badge,
  Divider,
  Tooltip,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ChannelList from './components/channelList/ChannelList';
import CreateChannelModal from './components/createChannelModal/CreateChannelModal';
import MainContent from './components/mainContent/MainContent';
import TopMenu from './components/topMenu/TopMenu';
import { fetchChannels } from '../../api/channelService';
import socket from '../../utils/socket';
import { ChannelOptionsProvider } from './components/context/context';
import { useChannel } from './components/context/channelContent';
import JoinChannelModal from './components/joinChannelModal/JoinChannelModal';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from '../../context/ThemeContext';
import {
    TrendingUp as TrendingUpIcon,
    People as PeopleIcon,
    Code as CodeIcon,
    Chat as ChatIcon,
    MoreVert as MoreVertIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,
    CheckCircle as CheckCircleIcon,
    Schedule as ScheduleIcon,
    Error as ErrorIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Zoom from '@mui/material/Zoom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Scene3D from './components/Scene3D';
import SchoolIcon from '@mui/icons-material/School';

// Constants and Configurations
const DRAWER_WIDTH = 300;
const TOOLBAR_HEIGHT = 80;
const TRANSITION_DURATION = 0.6;

// Styled Components Configuration
const gradientText = (theme, start, end) => ({
    background: `linear-gradient(45deg, ${start} 30%, ${end} 90%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
    letterSpacing: '0.5px',
});

const glassEffect = (theme, opacity = 0.8) => ({
    backdropFilter: 'blur(20px)',
    backgroundColor: alpha(theme.palette.background.default, opacity),
    borderColor: alpha(theme.palette.divider, 0.08),
});

const hoverTransform = {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-4px)',
    },
};

// Component Styles
const styles = (theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, 
                ${alpha(theme.palette.background.default, 0.95)} 0%, 
                ${alpha(theme.palette.background.default, 0.98)} 100%)`
            : `linear-gradient(135deg, 
                ${alpha(theme.palette.background.default, 0.97)} 0%, 
                ${alpha(theme.palette.background.default, 1)} 100%)`,
        position: 'relative',
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
    },
    appBar: {
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        ...glassEffect(theme, 0.7),
        boxShadow: `0 4px 30px ${alpha(theme.palette.common.black, 0.1)}`,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        background: theme.palette.mode === 'dark'
            ? `linear-gradient(90deg, 
                ${alpha(theme.palette.background.paper, 0.8)} 0%, 
                ${alpha(theme.palette.background.paper, 0.9)} 100%)`
            : `linear-gradient(90deg, 
                ${alpha(theme.palette.background.paper, 0.9)} 0%, 
                ${alpha(theme.palette.background.paper, 1)} 100%)`,
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            background: theme.palette.mode === 'dark'
                ? `linear-gradient(180deg, 
                    ${alpha(theme.palette.background.paper, 0.9)} 0%, 
                    ${alpha(theme.palette.background.paper, 0.95)} 100%)`
                : `linear-gradient(180deg, 
                    ${alpha(theme.palette.background.paper, 0.95)} 0%, 
                    ${alpha(theme.palette.background.paper, 1)} 100%)`,
            ...glassEffect(theme),
            boxShadow: theme.palette.mode === 'dark'
                ? 'none'
                : '4px 0 24px rgba(0,0,0,0.05)',
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        },
    },
    iconButton: {
        bgcolor: alpha(theme.palette.primary.main, 0.1),
        '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.2),
        },
    },
});

const Dashboard = () => {
    const { selectedChannel, setSelectedChannel } = useChannel();
    const [channels, setChannels] = useState([]);
    const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);
    const [joinChannelModalOpen, setJoinChannelModalOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const { currentUser, logout } = useAuth();
    const [notifications, setNotifications] = useState(3);
    const [viewMode, setViewMode] = useState('2d');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { replace: true });
            return;
        }
        const getChannels = async () => setChannels(await fetchChannels());
        getChannels();
    }, [navigate]);

    useEffect(() => {
        const updateChannels = async () => setChannels(await fetchChannels());
        const updateSelectedChannel = async (data) => {
            setChannels(await fetchChannels());
            if (selectedChannel?.id === data.id) setSelectedChannel((prev) => ({ ...prev, name: data.channel_name }));
        };

        socket.on('channel_delete', async () => {
            setChannels(await fetchChannels());
            setSelectedChannel(null);
        });
        socket.on('channel_created', updateChannels);
        socket.on('channel_rename', updateSelectedChannel);

        return () => {
            socket.off('channel_delete');
            socket.off('channel_created');
            socket.off('channel_rename');
        };
    }, [selectedChannel]);

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    // Updated user data to use currentUser
    const user = {
        name: currentUser?.name || 'ILCT TEAM',
        role: currentUser?.role || 'Collaborative Platform',
    };

    // Utility Components
    const StatCard = ({ title, value, change, isPositive, icon, color }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: TRANSITION_DURATION, ease: "easeOut" }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 3.5,
                    borderRadius: 4,
                    background: `linear-gradient(135deg, 
                        ${alpha(muiTheme.palette[color].main, 0.15)} 0%, 
                        ${alpha(muiTheme.palette[color].main, 0.05)} 100%)`,
                    border: `1px solid ${alpha(muiTheme.palette[color].main, 0.12)}`,
                    ...glassEffect(muiTheme),
                    position: 'relative',
                    overflow: 'hidden',
                    ...hoverTransform,
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 32px ${alpha(muiTheme.palette[color].main, 0.2)}`,
                        '& .stat-icon': {
                            transform: 'scale(1.1) rotate(5deg)',
                        }
                    },
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                        <Avatar
                            className="stat-icon"
            sx={{ 
                                width: 60,
                                height: 60,
                                bgcolor: alpha(muiTheme.palette[color].main, 0.2),
                                color: muiTheme.palette[color].main,
                                transition: 'transform 0.3s ease-in-out',
                                boxShadow: `0 8px 16px ${alpha(muiTheme.palette[color].main, 0.2)}`,
                            }}
                        >
                            {React.cloneElement(icon, { sx: { fontSize: 30 } })}
                        </Avatar>
                        <Box sx={{ ml: 3 }}>
                            <Typography 
                                variant="h4" 
                        sx={{ 
                                    ...gradientText(
                                        muiTheme,
                                        muiTheme.palette[color].main,
                                        muiTheme.palette[color].light
                                    ),
                                    mb: 0.5,
                                }}
                            >
                    {value}
                </Typography>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    letterSpacing: '0.5px',
                                }}
                            >
                    {title}
                </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
            display: 'flex', 
            alignItems: 'center', 
                            color: isPositive ? 'success.main' : 'error.main',
                            gap: 0.5,
                            pl: 0.5,
                        }}
                    >
                        {isPositive ? 
                            <ArrowUpwardIcon sx={{ fontSize: 18 }} /> : 
                            <ArrowDownwardIcon sx={{ fontSize: 18 }} />
                        }
                        <Typography 
                            variant="body2" 
                sx={{ 
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                            }}
                        >
                            {change}
                </Typography>
            </Box>
        </Box>
            </Paper>
        </motion.div>
    );

    // Header Section
    const Header = () => (
            <AppBar 
                position="fixed" 
                elevation={0}
            sx={{
                ...styles(muiTheme).appBar,
                backdropFilter: 'blur(8px)',
                transform: 'translateZ(0)',
                willChange: 'transform',
                transition: 'background-color 0.3s ease-in-out',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: alpha(muiTheme.palette.background.default, 0.8),
                    zIndex: -1,
                }
            }}
        >
            <Toolbar 
                sx={{ 
                    height: TOOLBAR_HEIGHT,
                    px: { xs: 2, sm: 4 },
                    transition: 'padding 0.3s ease',
                }}
            >
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={() => setMobileOpen(!mobileOpen)}
                    sx={{ 
                        mr: 2, 
                        display: { md: 'none' },
                        color: 'primary.main',
                        transform: 'translateZ(0)',
                    }}
                            >
                                <MenuIcon />
                            </IconButton>
                <Box sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    alignItems: 'center',
                    transform: 'translateZ(0)',
                }}>
                    <Avatar
                        sx={{
                            width: 44,
                            height: 44,
                            bgcolor: alpha(muiTheme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            mr: 2.5,
                            transform: 'translateZ(0)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <DashboardIcon />
                    </Avatar>
                                <Typography 
                        variant="h5"
                        sx={{
                            ...gradientText(
                                muiTheme,
                                '#2196F3',
                                '#21CBF3'
                            ),
                            transform: 'translateZ(0)',
                            fontWeight: 700,
                        }}
                    >
                        Dashboard
                    </Typography>
                </Box>
                <Stack 
                    direction="row" 
                    spacing={2}
                    sx={{
                        transform: 'translateZ(0)',
                        '& > *': {
                            transform: 'translateZ(0)',
                        }
                    }}
                >
                    <IconButton 
                        onClick={toggleTheme}
                        sx={{
                            ...styles(muiTheme).iconButton,
                            transform: 'translateZ(0)',
                        }}
                    >
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton 
                        sx={{
                            ...styles(muiTheme).iconButton,
                            transform: 'translateZ(0)',
                        }}
                    >
                        <Badge 
                            badgeContent={notifications} 
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    boxShadow: '0 0 0 2px #fff',
                                    transform: 'translateZ(0)',
                                }
                            }}
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );

    // Channel Management Section
    const ChannelManagement = ({ channels, onChannelSelect, onCreateClick, onJoinClick }) => {
        const [searchQuery, setSearchQuery] = useState('');
        const [hoveredChannel, setHoveredChannel] = useState(null);

        const filteredChannels = channels.filter(channel => 
            channel.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <Box sx={{ width: '100%' }}>
                {/* Search and Action Buttons */}
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search channels..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 2,
                                bgcolor: alpha(muiTheme.palette.background.paper, 0.6),
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha(muiTheme.palette.divider, 0.1),
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha(muiTheme.palette.primary.main, 0.2),
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha(muiTheme.palette.primary.main, 0.5),
                                },
                            },
                        }}
                    />
                </Box>

                {/* Channel Actions */}
                <Box 
                                    sx={{ 
                                        display: 'flex', 
                        gap: 2, 
                        mb: 3,
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={onCreateClick}
                        sx={{
                            flex: 1,
                            py: 1,
                            borderRadius: 2,
                            bgcolor: alpha(muiTheme.palette.primary.main, 0.1),
                            color: muiTheme.palette.primary.main,
                            '&:hover': {
                                bgcolor: alpha(muiTheme.palette.primary.main, 0.2),
                            },
                        }}
                    >
                        Create Channel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<GroupAddIcon />}
                        onClick={onJoinClick}
                        sx={{
                            flex: 1,
                            py: 1,
                            borderRadius: 2,
                            bgcolor: alpha(muiTheme.palette.success.main, 0.1),
                            color: muiTheme.palette.success.main,
                            '&:hover': {
                                bgcolor: alpha(muiTheme.palette.success.main, 0.2),
                            },
                        }}
                    >
                        Join Channel
                    </Button>
                </Box>

                {/* Channels List */}
                <Box 
                    sx={{ 
                        maxHeight: '400px',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: alpha(muiTheme.palette.primary.main, 0.2),
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: alpha(muiTheme.palette.primary.main, 0.3),
                        },
                    }}
                >
                    {filteredChannels.length === 0 ? (
                        <Box 
                            sx={{ 
                                textAlign: 'center',
                                py: 4,
                                color: 'text.secondary',
                            }}
                        >
                            <Typography variant="body2">
                                No channels found
                            </Typography>
                        </Box>
                    ) : (
                        <Stack spacing={1.5}>
                            {filteredChannels.map((channel) => (
                                <Paper
                                    key={channel.id}
                                    elevation={0}
                                    onMouseEnter={() => setHoveredChannel(channel.id)}
                                    onMouseLeave={() => setHoveredChannel(null)}
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: alpha(
                                            muiTheme.palette.primary.main,
                                            channel.id === selectedChannel?.id ? 0.15 : 0.05
                                        ),
                                        border: `1px solid ${alpha(
                                            muiTheme.palette.primary.main,
                                            channel.id === selectedChannel?.id ? 0.2 : 0.1
                                        )}`,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            bgcolor: alpha(muiTheme.palette.primary.main, 0.1),
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                                            <Avatar
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    bgcolor: alpha(muiTheme.palette.primary.main, 0.2),
                                                    color: muiTheme.palette.primary.main,
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {channel.name[0].toUpperCase()}
                                            </Avatar>
                                            <Box sx={{ ml: 1.5, minWidth: 0 }}>
                                                <Typography 
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: 'text.primary',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {channel.name}
                                                </Typography>
                                                <Typography 
                                                    variant="caption"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {channel.visibility ? (
                                                        <VisibilityOffIcon sx={{ fontSize: 14 }} />
                                                    ) : (
                                                        <PublicIcon sx={{ fontSize: 14 }} />
                                                    )}
                                                    {channel.visibility ? 'Private' : 'Public'}
                                </Typography>
                                            </Box>
                    </Box>
                    
                                        <Box sx={{ 
                                            display: 'flex',
                                            gap: 1,
                                            opacity: hoveredChannel === channel.id ? 1 : 0,
                                            transition: 'opacity 0.2s ease-in-out',
                                        }}>
                                            {channel.id === selectedChannel?.id ? (
                                                <Tooltip title="Leave Channel" placement="top" TransitionComponent={Zoom}>
                            <IconButton 
                                size="small"
                                                        color="error"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onChannelSelect(null);
                                                        }}
                                sx={{
                                                            bgcolor: alpha(muiTheme.palette.error.main, 0.1),
                                    '&:hover': {
                                                                bgcolor: alpha(muiTheme.palette.error.main, 0.2),
                                                            },
                                }}
                            >
                                                        <ExitToAppIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                                            ) : (
                                                <Tooltip title="Join Channel" placement="top" TransitionComponent={Zoom}>
                            <IconButton 
                                size="small"
                                                        color="primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onChannelSelect(channel);
                                                        }}
                                sx={{
                                    bgcolor: alpha(muiTheme.palette.primary.main, 0.1),
                                    '&:hover': {
                                        bgcolor: alpha(muiTheme.palette.primary.main, 0.2),
                                                            },
                                }}
                            >
                                                        <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                                            )}
                                        </Box>
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>
                    )}
                        </Box>
                    </Box>
        );
    };

    // Channel View Component
    const ChannelView = ({ channel, onExit }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Box sx={{ p: 2 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 3,
                }}>
                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: alpha(muiTheme.palette.primary.main, 0.2),
                            color: muiTheme.palette.primary.main,
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            boxShadow: `0 4px 12px ${alpha(muiTheme.palette.primary.main, 0.2)}`,
                        }}
                    >
                        {channel.name[0].toUpperCase()}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700,
                                color: 'text.primary',
                            }}
                        >
                            {channel.name}
                        </Typography>
                        <Typography 
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                        display: 'flex', 
                        alignItems: 'center',
                                gap: 0.5,
                            }}
                        >
                            {channel.visibility ? (
                                <VisibilityOffIcon sx={{ fontSize: 14 }} />
                            ) : (
                                <PublicIcon sx={{ fontSize: 14 }} />
                            )}
                            {channel.visibility ? 'Private Channel' : 'Public Channel'}
                        </Typography>
                    </Box>
                </Box>

                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={onExit}
                    startIcon={<KeyboardBackspaceIcon />}
                    sx={{
                        py: 1.5,
                        borderRadius: 2,
                        borderColor: alpha(muiTheme.palette.primary.main, 0.3),
                        color: muiTheme.palette.primary.main,
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            borderColor: muiTheme.palette.primary.main,
                            bgcolor: alpha(muiTheme.palette.primary.main, 0.08),
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    Back to Channels
                </Button>
            </Box>
        </motion.div>
    );

    // Update SidebarContent to handle channel view
    const SidebarContent = () => {
        const handleChannelExit = () => {
            setSelectedChannel(null);
        };

        return (
            <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: TRANSITION_DURATION, ease: "easeOut" }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Avatar 
                            src="/logo.png" 
                            alt="Logo" 
                            variant="rounded"
                            sx={{ 
                                width: 56, 
                                height: 56, 
                                mr: 2.5,
                                bgcolor: alpha(muiTheme.palette.primary.main, 0.9),
                                boxShadow: `0 8px 24px ${alpha(muiTheme.palette.primary.main, 0.4)}`,
                                borderRadius: 3,
                            }}
                        >
                            ILCT
                        </Avatar>
                        <Box>
                            <Typography 
                                variant="h5" 
                                sx={gradientText(
                                    muiTheme,
                                    muiTheme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
                                    muiTheme.palette.mode === 'dark' ? '#a991f7' : '#6d48d6'
                                )}
                            >
                                ILCT Platform
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: alpha(muiTheme.palette.text.secondary, 0.8),
                                    fontWeight: 500,
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Collaborative Workspace
                            </Typography>
                        </Box>
                    </Box>
                </motion.div>

                <AnimatePresence mode="wait">
                    {selectedChannel ? (
                        <motion.div
                            key="channel-view"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChannelView 
                                channel={selectedChannel}
                                onExit={handleChannelExit}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="channel-list"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Divider sx={{ mb: 4, borderColor: alpha(muiTheme.palette.divider, 0.08) }} />
                    
                    <Typography 
                        variant="overline" 
                        sx={{ 
                                    pl: 1, 
                                    mb: 3,
                                    color: alpha(muiTheme.palette.text.secondary, 0.8),
                                    letterSpacing: '2px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                        }}
                    >
                        CHANNELS
                    </Typography>
                
                            <Box sx={{ flex: 1, mb: 4 }}>
                                <ChannelManagement
                            channels={channels}
                                    onChannelSelect={(channel) => {
                                        // Add animation sequence
                                        const sequence = async () => {
                                            // First animate the selection
                                            await new Promise(resolve => setTimeout(resolve, 300));
                                            setSelectedChannel(channel);
                                        };
                                        sequence();
                                    }}
                                    onCreateClick={() => setCreateChannelModalOpen(true)}
                                    onJoinClick={() => setJoinChannelModalOpen(true)}
                        />
                    </Box>
                    
                            <UserProfile user={user} onLogout={handleLogout} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        );
    };

    // User Profile Component
    const UserProfile = ({ user, onLogout }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: TRANSITION_DURATION, ease: "easeOut" }}
        >
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar
                                    sx={{ 
                            width: 56,
                            height: 56,
                            bgcolor: 'primary.main',
                            fontSize: '1.5rem',
                        }}
                    >
                        {user.name.charAt(0)}
                                </Avatar>
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" sx={{ ...gradientText(muiTheme, '#2196f3', '#1976d2') }}>
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.role}
                        </Typography>
                                </Box>
                            </Box>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                    onClick={onLogout}
                            startIcon={<LogoutIcon />}
                            sx={{
                        mt: 2,
                        borderColor: 'error.main',
                        color: 'error.main',
                                '&:hover': {
                            borderColor: 'error.dark',
                            bgcolor: 'error.light',
                            color: 'error.dark',
                                },
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
        </motion.div>
    );

    const handleViewModeChange = (event, newMode) => {
        if (newMode !== null) {
            setViewMode(newMode);
        }
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Box
                sx={{
                    position: 'fixed',
                    top: 100,
                    right: 30,
                    zIndex: 9999,
                    backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
                    padding: 1,
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewModeChange}
                    aria-label="view mode"
                    size="small"
                    sx={{
                        '& .MuiToggleButton-root': {
                            px: 2,
                            py: 0.5,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                        }
                    }}
                >
                    <ToggleButton value="2d" aria-label="2D view">
                        2D
                    </ToggleButton>
                    <ToggleButton value="3d" aria-label="3D view">
                        3D
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {viewMode === '3d' ? (
                <Scene3D />
            ) : (
                <Box sx={styles(muiTheme).root}>
                    <CssBaseline />
                    <Header />
                    <Drawer
                        variant={isMobile ? 'temporary' : 'permanent'}
                        open={isMobile ? mobileOpen : true}
                        onClose={() => setMobileOpen(!mobileOpen)}
                        ModalProps={{ keepMounted: true }}
                        sx={styles(muiTheme).drawer}
                    >
                        <SidebarContent />
                    </Drawer>

                    <ChannelOptionsProvider>
                        <MainContent selectedChannel={selectedChannel} drawerWidth={DRAWER_WIDTH} />
                    </ChannelOptionsProvider>

                    {/* Add Channel Modals */}
                    <CreateChannelModal 
                        open={createChannelModalOpen}
                        handleClose={() => setCreateChannelModalOpen(false)}
                        setChannels={setChannels}
                    />
                    <JoinChannelModal 
                        open={joinChannelModalOpen}
                        handleClose={() => setJoinChannelModalOpen(false)}
                        setChannels={setChannels}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Dashboard;
