import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import socket from '../../../../../utils/socket';

const TextJamboard = ({ canEdit }) => {
    const [text, setText] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Listen for text updates from other users
        socket.on('jamboard:update', (data) => {
            setText(data.text);
        });

        return () => {
            socket.off('jamboard:update');
        };
    }, []);

    const handleTextChange = (event) => {
        if (!canEdit) return;
        
        const newText = event.target.value;
        setText(newText);
        
        if (!isEditing) {
            setIsEditing(true);
        }

        // Emit text update to other users
        socket.emit('jamboard:update', { text: newText });
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <Box sx={{ height: '100%', p: 2 }}>
            <TextField
                fullWidth
                multiline
                rows={20}
                value={text}
                onChange={handleTextChange}
                onBlur={handleBlur}
                disabled={!canEdit}
                sx={{
                    '& .MuiInputBase-root': {
                        backgroundColor: 'background.paper',
                    },
                }}
            />
        </Box>
    );
};

export default TextJamboard; 