import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Forum as ForumIcon,
  Settings as SettingsIcon,
  TableChart as TableChartIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  NotificationsActive as NotificationsIcon
} from '@mui/icons-material';

const drawerWidth = 260;

const Sidebar = ({ activeSection, setActiveSection }) => {
  const theme = useTheme();

  const menuItems = [
    { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'users', text: 'User Management', icon: <PeopleIcon /> },
    { id: 'channels', text: 'Channels & Content', icon: <ForumIcon /> },
    { id: 'analytics', text: 'Analytics', icon: <TableChartIcon /> },
    { id: 'settings', text: 'System Settings', icon: <SettingsIcon /> }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.9)
            : alpha(theme.palette.background.paper, 0.95),
          backgroundImage: theme.palette.mode === 'dark'
            ? 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
            : 'linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02))',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 0 10px rgba(0, 0, 0, 0.5)'
            : '0 0 10px rgba(0, 0, 0, 0.1)',
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AdminPanelSettingsIcon fontSize="large" sx={{ 
          color: theme.palette.primary.main,
          filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))'
        }} />
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          ILCT Admin
        </Typography>
      </Box>
      
      <Divider />
      
      <Box 
        component={motion.div}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        sx={{ 
          mt: 1, 
          mb: 1, 
          px: 2 
        }}
      >
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            background: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.primary.main, 0.15)
              : alpha(theme.palette.primary.main, 0.08),
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <NotificationsIcon sx={{ color: theme.palette.primary.main }} />
          <Box>
            <Typography variant="caption" color="text.secondary">
              System Status
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium', color: theme.palette.primary.main }}>
              All systems operational
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 1 }} />
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 4px 8px rgba(0, 0, 0, 0.4)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.25),
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  }
                },
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.08),
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40,
                color: activeSection === item.id 
                  ? theme.palette.primary.main 
                  : theme.palette.text.secondary
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: activeSection === item.id ? 600 : 400
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 