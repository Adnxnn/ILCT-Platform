import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Avatar, 
  Badge, 
  useTheme, 
  Menu, 
  MenuItem, 
  Tooltip, 
  Divider,
  InputBase,
  alpha
} from '@mui/material';
import { 
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const Header = ({ handleModeToggle, mode }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha(theme.palette.background.paper, 0.9),
        backdropFilter: 'blur(8px)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 1px 10px rgba(0, 0, 0, 0.4)'
          : '0 1px 10px rgba(0, 0, 0, 0.1)',
        color: theme.palette.text.primary
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              position: 'relative',
              borderRadius: '50px',
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              marginRight: 2,
              width: '100%',
              maxWidth: '300px',
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <Box
              sx={{
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.text.secondary
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                width: '100%',
                '& .MuiInputBase-input': {
                  transition: theme.transitions.create('width'),
                  width: '100%',
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton 
              onClick={handleModeToggle} 
              sx={{ 
                mr: 1,
                color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                }
              }}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton 
              onClick={handleNotificationMenu} 
              sx={{ 
                mr: 1,
                color: theme.palette.text.secondary,
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                }
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Menu
            id="notification-menu"
            anchorEl={notificationAnchorEl}
            keepMounted
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
            PaperProps={{
              elevation: 3,
              sx: {
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                width: 320,
                mt: 1.5,
                overflow: 'visible',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: theme.palette.background.paper,
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Notifications</Typography>
              
              {[
                { title: 'New user registered', time: '10 minutes ago' },
                { title: 'New channel created', time: '1 hour ago' },
                { title: 'System update available', time: '2 hours ago' }
              ].map((notification, index) => (
                <React.Fragment key={index}>
                  <Box sx={{ py: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                  {index < 2 && <Divider />}
                </React.Fragment>
              ))}
              
              <Box sx={{ mt: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'primary.main', 
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  View all notifications
                </Typography>
              </Box>
            </Box>
          </Menu>
          
          <Tooltip title="Account">
            <IconButton
              onClick={handleMenu}
              sx={{ 
                p: 0,
                ml: 1,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Avatar 
                src="/admin-avatar.jpg"
                alt="Admin"
                sx={{ 
                  width: 34, 
                  height: 34,
                  background: theme.palette.primary.main
                }}
              />
            </IconButton>
          </Tooltip>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                minWidth: 180,
                mt: 1.5,
                overflow: 'visible',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: theme.palette.background.paper,
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Administrator</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>admin@ilct.com</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
              <ProfileIcon fontSize="small" sx={{ mr: 1.5 }} />
              <Typography variant="body2">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
              <SettingsIcon fontSize="small" sx={{ mr: 1.5 }} />
              <Typography variant="body2">Account Settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 