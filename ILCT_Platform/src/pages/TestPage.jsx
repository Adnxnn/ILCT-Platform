import React from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const TestPage = () => {
    const muiTheme = useTheme();
    const { isDarkMode, toggleTheme } = useAppTheme();

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    borderRadius: 2,
                    bgcolor: muiTheme.palette.background.paper,
                    transition: 'all 0.3s ease'
                }}
            >
                <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                        fontWeight: 600,
                        mb: 3,
                        background: muiTheme.palette.mode === 'dark'
                            ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
                            : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Theme Testing Page
                </Typography>
                
                <Typography variant="body1" paragraph>
                    This is a simple page to test the theme toggling functionality.
                    Current theme mode: <strong>{muiTheme.palette.mode}</strong>
                </Typography>
                
                <Box 
                    sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        flexWrap: 'wrap',
                        mb: 4
                    }}
                >
                    <Button variant="contained" color="primary">
                        Primary Button
                    </Button>
                    <Button variant="contained" color="secondary">
                        Secondary Button
                    </Button>
                    <Button variant="outlined" color="primary">
                        Outlined Button
                    </Button>
                    <Button variant="text" color="primary">
                        Text Button
                    </Button>
                </Box>
                
                <Paper 
                    elevation={1} 
                    sx={{ 
                        p: 3, 
                        mb: 4, 
                        bgcolor: muiTheme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(0, 0, 0, 0.02)' 
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Theme Toggle Demo
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Click the button below to toggle between light and dark mode.
                        Your preference will be saved in local storage.
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        onClick={toggleTheme}
                        sx={{ mt: 1 }}
                    >
                        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
                    </Button>
                </Paper>
                
                <Typography variant="body2" color="text.secondary">
                    The theme is managed using React Context API and stored in localStorage.
                    Try refreshing the page - your theme preference will be remembered.
                </Typography>
            </Paper>
        </Container>
    );
};

export default TestPage; 