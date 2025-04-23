import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, IconButton, useTheme, alpha, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { createNote, deleteNote, getNotes, saveNote } from "../../../../../api/notesService";

const Notes = () => {
    const theme = useTheme();
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        const loadedNotes = await getNotes();
        setNotes(loadedNotes);
    };

    const handleCreateNote = async () => {
        const newNote = await createNote('New Note', '');
        setNotes(prev => [...prev, newNote]);
        setCurrentNote(newNote);
        setTitle(newNote.title);
        setContent(newNote.content);
        setIsEditing(true);
    };

    const handleSaveNote = async () => {
        if (currentNote) {
            await saveNote(currentNote.id, title, content);
            setIsEditing(false);
            loadNotes();
        }
    };

    const handleDeleteNote = async (noteId) => {
        if (await deleteNote(noteId)) {
            setNotes(prev => prev.filter(note => note.id !== noteId));
            if (currentNote?.id === noteId) {
                setCurrentNote(null);
                setTitle('');
                setContent('');
            }
        }
    };

    const handleNoteSelect = (note) => {
        setCurrentNote(note);
        setTitle(note.title);
        setContent(note.content);
        setIsEditing(false);
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', gap: 2 }}>
            <Paper
                elevation={3}
                sx={{
                    width: 300,
                    p: 2,
                    background: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.8)
                        : alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
                Notes
            </Typography>
                    <Tooltip title="New Note">
                        <IconButton
                            onClick={handleCreateNote}
                            sx={{
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                }
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
                    <AnimatePresence>
                        {notes.map((note) => (
                            <motion.div
                                key={note.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Paper
                                    onClick={() => handleNoteSelect(note)}
                                    sx={{
                                        p: 2,
                                        mb: 1,
                                        cursor: 'pointer',
                                        background: currentNote?.id === note.id
                                            ? alpha(theme.palette.primary.main, 0.1)
                                            : 'transparent',
                                        border: `1px solid ${theme.palette.divider}`,
                                        '&:hover': {
                                            background: alpha(theme.palette.primary.main, 0.05),
                                        }
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                        {note.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{ 
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {note.content}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Box>
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    flex: 1,
                    p: 3,
                    background: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.8)
                        : alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {currentNote ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            {isEditing ? (
                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    variant="standard"
                                    fullWidth
                                    sx={{ mr: 2 }}
                                />
                            ) : (
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    {title}
                                </Typography>
                            )}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {!isEditing && (
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => setIsEditing(true)}
                                            sx={{
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                }
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {isEditing && (
                                    <Tooltip title="Save">
                                        <IconButton
                                            onClick={handleSaveNote}
                                            sx={{
                                                color: 'primary.main',
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                }
                                            }}
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <Tooltip title="Delete">
                                    <IconButton
                                        onClick={() => handleDeleteNote(currentNote.id)}
                                        sx={{
                                            color: 'error.main',
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.error.main, 0.1),
                                            }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                        <TextField
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            multiline
                            fullWidth
                            rows={20}
                            variant="outlined"
                            disabled={!isEditing}
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                },
                            }}
                        />
                    </>
                ) : (
                    <Box sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'text.secondary'
                    }}>
                        <Typography variant="h6">
                            Select a note or create a new one
            </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Notes;
