import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, useTheme, createTheme, alpha } from '@mui/material';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Channels from './components/Channels';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const AdminPanel = () => {
  const baseTheme = useTheme();
  const [mode, setMode] = useState(baseTheme.palette.mode);
  const [activeSection, setActiveSection] = useState('dashboard');

  const theme = React.useMemo(() => createTheme({
    ...baseTheme,
    palette: {
      mode,
      primary: baseTheme.palette.primary,
      secondary: baseTheme.palette.secondary,
      background: {
        ...baseTheme.palette.background,
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: mode === 'dark' ? '#6b6b6b #2b2b2b' : '#c1c1c1 #f1f1f1',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: mode === 'dark' ? '#2b2b2b' : '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: mode === 'dark' ? '#6b6b6b' : '#c1c1c1',
              borderRadius: '4px',
            },
          },
        },
      },
    },
  }), [baseTheme, mode]);

  const handleModeToggle = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'channels':
        return <Channels />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1e1e1e 0%, #121212 100%)' 
          : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      }}>
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Header handleModeToggle={handleModeToggle} mode={mode} />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 3, 
              overflow: 'auto',
              backgroundImage: theme.palette.mode === 'dark'
                ? 'radial-gradient(circle at 50% 14em, #313131 0%, #0e0e0e 60%, #151515 100%)'
                : 'radial-gradient(circle at 50% 14em, #ffffff 0%, #f0f0f0 60%, #fafafa 100%)',
            }}
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel; 