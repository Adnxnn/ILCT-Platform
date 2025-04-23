import React from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Grid, 
    Box, 
    Button, 
    IconButton, 
    useTheme, 
    alpha,
    Divider,
    Paper,
    Stack,
    Tooltip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Jamboard from "../jamboard/jamboard";
import Notes from '../notes/notes';
import Files from '../files/files';
import Calendar from '../calendar/calendar';
import Tasks from '../tasks/tasks';
import { useChannelOptions } from '../../context/context';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FolderIcon from '@mui/icons-material/Folder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const options = [
    { 
        title: 'Jamboard', 
        description: 'Collaborate on ideas with your team in real-time.', 
        icon: <DashboardIcon sx={{ fontSize: 32 }} />,
        component: <Jamboard />,
        color: ['#2196f3', '#03a9f4'] // blue gradient
    },
    { 
        title: 'Notes', 
        description: 'Keep track of important information and share with the channel.', 
        icon: <NoteAltIcon sx={{ fontSize: 32 }} />,
        component: <Notes />,
        color: ['#9c27b0', '#673ab7'] // purple gradient 
    },
    { 
        title: 'Files', 
        description: 'Access and share files with the team.', 
        icon: <FolderIcon sx={{ fontSize: 32 }} />,
        component: <Files />,
        color: ['#ff9800', '#ff5722'] // orange gradient
    },
    { 
        title: 'Calendar', 
        description: 'Schedule and manage events and meetings.', 
        icon: <CalendarMonthIcon sx={{ fontSize: 32 }} />,
        component: <Calendar />,
        color: ['#4caf50', '#8bc34a'] // green gradient
    },
    { 
        title: 'Tasks', 
        description: 'Organize and assign tasks to channel members.', 
        icon: <AssignmentIcon sx={{ fontSize: 32 }} />,
        component: <Tasks />,
        color: ['#f44336', '#e91e63'] // red gradient
    },
];

const ChannelOptions = () => {
    const { selectedOption, setSelectedOption, resetOptions } = useChannelOptions();
    const theme = useTheme();

    const handleCardClick = (key) => setSelectedOption(key);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AnimatePresence mode="wait">
            {!selectedOption && selectedOption !== 0 ? (
                    <motion.div
                        key="options-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                mb: 3, 
                                fontWeight: 500,
                                color: 'text.secondary',
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                fontSize: '0.875rem'
                            }}
                        >
                            Channel Tools & Features
                        </Typography>
                        <Grid container spacing={3}>
                    {options.map((option, key) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                                    <motion.div
                                        whileHover={{ 
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                            <Card
                                onClick={() => handleCardClick(key)}
                                sx={{
                                    cursor: 'pointer',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                                background: theme.palette.mode === 'dark'
                                                    ? alpha(theme.palette.background.paper, 0.7)
                                                    : alpha(theme.palette.background.paper, 0.9),
                                                backdropFilter: 'blur(10px)',
                                                borderRadius: 2,
                                                border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                                                transition: 'all 0.3s ease',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                '&:hover': {
                                                    boxShadow: theme.palette.mode === 'dark'
                                                        ? `0 8px 16px rgba(0,0,0,0.4)`
                                                        : `0 8px 16px rgba(0,0,0,0.1)`,
                                                    borderColor: alpha(option.color[0], 0.4),
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '4px',
                                                    height: '100%',
                                                    background: `linear-gradient(to bottom, ${option.color[0]}, ${option.color[1]})`,
                                                },
                                            }}
                                        >
                                            <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'space-between',
                                                    mb: 2,
                                                }}>
                                                    <Box
                                                        sx={{
                                                            p: 1.5,
                                                            borderRadius: '12px',
                                                            background: theme.palette.mode === 'dark' 
                                                                ? alpha(option.color[0], 0.2)
                                                                : alpha(option.color[0], 0.1),
                                                            color: option.color[0],
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        {option.icon}
                                                    </Box>
                                                    <KeyboardArrowRightIcon 
                                                        sx={{ 
                                                            color: theme.palette.mode === 'dark' 
                                                                ? alpha(option.color[0], 0.5)
                                                                : alpha(option.color[0], 0.4),
                                                        }}
                                                    />
                                                </Box>
                                                <Typography 
                                                    variant="h6" 
                                                    component="div"
                                                    sx={{ 
                                                        mb: 1,
                                                        fontWeight: 600,
                                                        background: `linear-gradient(45deg, ${option.color[0]} 30%, ${option.color[1]} 90%)`,
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                    }}
                                                >
                                        {option.title}
                                    </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary"
                                                    sx={{ lineHeight: 1.6 }}
                                                >
                                        {option.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                                    </motion.div>
                        </Grid>
                    ))}
                </Grid>
                    </motion.div>
                ) : (
                    <motion.div
                        key="selected-option"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box sx={{ mb: 4 }}>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Tooltip title="Back to Features">
                                    <IconButton
                                        onClick={resetOptions}
                                        size="small"
                                        sx={{
                                            color: 'text.secondary',
                                            bgcolor: alpha(theme.palette.background.default, 0.6),
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            }
                                        }}
                                    >
                                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                                </Tooltip>

                                <Box>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            fontWeight: 600,
                                            background: `linear-gradient(45deg, ${options[selectedOption].color[0]} 30%, ${options[selectedOption].color[1]} 90%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box 
                                            sx={{ 
                                                mr: 1,
                                                display: 'inline-flex',
                                                color: options[selectedOption].color[0]
                                            }}
                                        >
                                            {options[selectedOption].icon}
                                        </Box>
                                        {options[selectedOption].title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {options[selectedOption].description}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Divider />
                        </Box>
                    {options[selectedOption].component}
                    </motion.div>
            )}
            </AnimatePresence>
        </Box>
    );
};

export default ChannelOptions;
