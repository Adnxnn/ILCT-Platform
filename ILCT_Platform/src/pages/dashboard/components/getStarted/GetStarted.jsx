import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const GetStarted = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                p: 3,
                bgcolor: 'background.default',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    maxWidth: 400,
                    textAlign: 'center',
                    bgcolor: 'background.paper'
                }}
            >
                <InfoIcon
                    color="info"
                    sx={{ fontSize: 40, mb: 2 }}
                />
                <Typography variant="h3" sx={{ mb: 2 }}>Welcome to ILCT Platform</Typography>
                <Typography variant="h5" component="h2" sx={{ mb: 1 }} color="info.main">
                    No Channel Selected
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Please select a channel from the sidebar to start chatting or create a new channel.
                </Typography>
            </Paper>
        </Box>
    );
};

export default GetStarted;
