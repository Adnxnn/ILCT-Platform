import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Checkbox,
    useTheme,
    alpha,
    Tooltip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';

const Tasks = () => {
    const theme = useTheme();
    const [tasks, setTasks] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        videoUrl: '',
        completed: false,
    });
    const [selectedTask, setSelectedTask] = useState(null);

    const handleAddTask = () => {
        if (newTask.title) {
            setTasks([...tasks, { ...newTask, id: Date.now() }]);
            setNewTask({ title: '', videoUrl: '', completed: false });
            setOpenDialog(false);
        }
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleToggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const getVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isYouTubeUrl = (url) => {
        return url.includes('youtube.com') || url.includes('youtu.be');
    };

    return (
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{
                        background: 'linear-gradient(45deg, #2196F3, #00BCD4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                    }}
                >
                    Tasks
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{
                        background: 'linear-gradient(45deg, #2196F3, #00BCD4)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1976D2, #0097A7)',
                        },
                    }}
                >
                    Add Task
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, height: 'calc(100% - 100px)' }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Task List
                    </Typography>
                    <List>
                        <AnimatePresence>
                            {tasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ListItem
                                        sx={{
                                            mb: 1,
                                            borderRadius: 1,
                                            background: alpha(theme.palette.background.paper, 0.1),
                                            '&:hover': {
                                                background: alpha(theme.palette.primary.main, 0.1),
                                            },
                                        }}
                                    >
                                        <Checkbox
                                            checked={task.completed}
                                            onChange={() => handleToggleComplete(task.id)}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                '&.Mui-checked': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                        <ListItemText
                                            primary={task.title}
                                            secondary={
                                                task.videoUrl && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                                        {isYouTubeUrl(task.videoUrl) ? (
                                                            <YouTubeIcon sx={{ color: 'red' }} />
                                                        ) : (
                                                            <LinkIcon />
                                                        )}
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: theme.palette.primary.main,
                                                                cursor: 'pointer',
                                                                '&:hover': {
                                                                    textDecoration: 'underline',
                                                                },
                                                            }}
                                                            onClick={() => handleTaskClick(task)}
                                                        >
                                                            Watch Video
                                                        </Typography>
                                                    </Box>
                                                )
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleDeleteTask(task.id)}
                                                sx={{
                                                    color: theme.palette.error.main,
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                                                    },
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </List>
                </Paper>

                {selectedTask && (
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            width: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">{selectedTask.title}</Typography>
                            <IconButton onClick={() => setSelectedTask(null)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        {isYouTubeUrl(selectedTask.videoUrl) ? (
                            <Box
                                sx={{
                                    position: 'relative',
                                    paddingTop: '56.25%', // 16:9 Aspect Ratio
                                    width: '100%',
                                }}
                            >
                                <iframe
                                    src={`https://www.youtube.com/embed/${getVideoId(selectedTask.videoUrl)}`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                    }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    gap: 2,
                                }}
                            >
                                <PlayCircleIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
                                <Button
                                    variant="contained"
                                    href={selectedTask.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open Video Link
                                </Button>
                            </Box>
                        )}
                    </Paper>
                )}
            </Box>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            label="Task Title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Video URL (YouTube or other)"
                            value={newTask.videoUrl}
                            onChange={(e) => setNewTask({ ...newTask, videoUrl: e.target.value })}
                            fullWidth
                            helperText="Paste a YouTube URL or any other video link"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddTask} variant="contained">
                        Add Task
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Tasks;
