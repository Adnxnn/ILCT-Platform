import React, { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  alpha,
  Card,
  CardContent,
  Grid,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  Button,
  Divider,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse
} from '@mui/material';
import { 
  Backup as BackupIcon,
  FormatPaint as ThemeIcon,
  Tune as TuneIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
  Analytics as AnalyticsIcon,
  VerifiedUser as VerifiedUserIcon,
  Language as LanguageIcon,
  Speed as SpeedIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const SettingsPanel = ({ title, icon, children }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);

  return (
    <Paper
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
          : '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
        mb: 3
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.6)
            : alpha(theme.palette.background.paper, 0.3),
          borderBottom: expanded ? `1px solid ${theme.palette.divider}` : 'none'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              p: 1, 
              borderRadius: 1, 
              mr: 1.5,
              background: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={() => setExpanded(!expanded)}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Collapse>
    </Paper>
  );
};

const Settings = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSaveSettings = () => {
    // Implement save functionality
    console.log('Saving settings...');
    setSaveSuccess(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaveSuccess(false);
  };

  return (
    <Box sx={{ pb: 3 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 4
        }}
        component={motion.div}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          System Settings
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
          sx={{
            borderRadius: 2,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            '&:hover': {
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #1976D2 30%, #0BACF3 90%)'
                : 'linear-gradient(45deg, #0d47a1 30%, #1976d2 90%)',
            }
          }}
        >
          Save Changes
        </Button>
      </Box>

      <Paper 
        sx={{ 
          borderRadius: 2,
          mb: 3,
          overflow: 'hidden',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
            : '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.6)
              : alpha(theme.palette.background.paper, 0.3),
          }}
          TabIndicatorProps={{
            style: {
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
                : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
              height: 3,
              borderRadius: '3px 3px 0 0'
            }
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            icon={<TuneIcon sx={{ mb: 0.5 }} />}
            label="General" 
            sx={{ 
              fontWeight: tabValue === 0 ? 600 : 400,
              color: tabValue === 0 ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main) : 'inherit'
            }} 
          />
          <Tab 
            icon={<ThemeIcon sx={{ mb: 0.5 }} />}
            label="Appearance" 
            sx={{ 
              fontWeight: tabValue === 1 ? 600 : 400,
              color: tabValue === 1 ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main) : 'inherit'
            }} 
          />
          <Tab 
            icon={<SecurityIcon sx={{ mb: 0.5 }} />}
            label="Security" 
            sx={{ 
              fontWeight: tabValue === 2 ? 600 : 400,
              color: tabValue === 2 ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main) : 'inherit'
            }} 
          />
          <Tab 
            icon={<NotificationsIcon sx={{ mb: 0.5 }} />}
            label="Notifications" 
            sx={{ 
              fontWeight: tabValue === 3 ? 600 : 400,
              color: tabValue === 3 ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main) : 'inherit'
            }} 
          />
          <Tab 
            icon={<BackupIcon sx={{ mb: 0.5 }} />}
            label="Backup & Restore" 
            sx={{ 
              fontWeight: tabValue === 4 ? 600 : 400,
              color: tabValue === 4 ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main) : 'inherit'
            }} 
          />
          <Tab 
            icon={<AnalyticsIcon sx={{ mb: 0.5 }} />}
            label="Analytics" 
            sx={{ 
              fontWeight: tabValue === 5 ? 600 : 400,
              color: tabValue === 5 ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main) : 'inherit'
            }} 
          />
        </Tabs>
      </Paper>

      <Box role="tabpanel" hidden={tabValue !== 0} sx={{ mb: 2 }}>
        {tabValue === 0 && (
          <>
            <SettingsPanel title="General Settings" icon={<TuneIcon />}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Platform Name"
                    defaultValue="ILCT Platform"
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    label="Admin Email"
                    defaultValue="admin@ilct.com"
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Default Language</InputLabel>
                    <Select
                      label="Default Language"
                      defaultValue="en"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      label="Timezone"
                      defaultValue="utc"
                    >
                      <MenuItem value="utc">UTC</MenuItem>
                      <MenuItem value="est">Eastern Time (EST)</MenuItem>
                      <MenuItem value="pst">Pacific Time (PST)</MenuItem>
                      <MenuItem value="gmt">Greenwich Mean Time (GMT)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable User Registration"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Show Welcome Message"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable AI Assistant"
                    sx={{ display: 'block' }}
                  />
                </Grid>
              </Grid>
            </SettingsPanel>
            
            <SettingsPanel title="Performance Settings" icon={<SpeedIcon />}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable Caching"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Compress Assets"
                    sx={{ mb: 2, display: 'block' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Cache Duration</InputLabel>
                    <Select
                      label="Cache Duration"
                      defaultValue="3600"
                    >
                      <MenuItem value="1800">30 Minutes</MenuItem>
                      <MenuItem value="3600">1 Hour</MenuItem>
                      <MenuItem value="86400">24 Hours</MenuItem>
                      <MenuItem value="604800">1 Week</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </SettingsPanel>
          </>
        )}
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 1} sx={{ mb: 2 }}>
        {tabValue === 1 && (
          <SettingsPanel title="Appearance Settings" icon={<ThemeIcon />}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Default Theme</InputLabel>
                  <Select
                    label="Default Theme"
                    defaultValue="system"
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System Default</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Primary Color</InputLabel>
                  <Select
                    label="Primary Color"
                    defaultValue="blue"
                  >
                    <MenuItem value="blue">Blue</MenuItem>
                    <MenuItem value="purple">Purple</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="orange">Orange</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Allow User Theme Selection"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable Animations"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Show Gradients"
                  sx={{ display: 'block' }}
                />
              </Grid>
            </Grid>
          </SettingsPanel>
        )}
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 2} sx={{ mb: 2 }}>
        {tabValue === 2 && (
          <SettingsPanel title="Security Settings" icon={<SecurityIcon />}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Two-Factor Authentication"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="HTTPS Only"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Strong Password Policy"
                  sx={{ mb: 2, display: 'block' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Session Timeout</InputLabel>
                  <Select
                    label="Session Timeout"
                    defaultValue="3600"
                  >
                    <MenuItem value="1800">30 Minutes</MenuItem>
                    <MenuItem value="3600">1 Hour</MenuItem>
                    <MenuItem value="7200">2 Hours</MenuItem>
                    <MenuItem value="86400">24 Hours</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Login Attempts</InputLabel>
                  <Select
                    label="Login Attempts"
                    defaultValue="5"
                  >
                    <MenuItem value="3">3 Attempts</MenuItem>
                    <MenuItem value="5">5 Attempts</MenuItem>
                    <MenuItem value="10">10 Attempts</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                    color: theme.palette.warning.main
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Security Recommendation
                  </Typography>
                  <Typography variant="body2">
                    Enable Two-Factor Authentication for all admin accounts to enhance platform security.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </SettingsPanel>
        )}
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 3} sx={{ mb: 2 }}>
        {tabValue === 3 && (
          <SettingsPanel title="Notification Settings" icon={<NotificationsIcon />}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Email Notifications
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="New User Registration"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Channel Creation"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="System Updates"
                  sx={{ mb: 2, display: 'block' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  In-App Notifications
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="New Messages"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="User Activities"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="System Alerts"
                  sx={{ mb: 2, display: 'block' }}
                />
              </Grid>
            </Grid>
          </SettingsPanel>
        )}
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 4} sx={{ mb: 2 }}>
        {tabValue === 4 && (
          <SettingsPanel title="Backup & Restore" icon={<BackupIcon />}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    mb: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    background: alpha(theme.palette.background.paper, 0.5)
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      Backup Database
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Create a full backup of all system data including users, channels, and content.
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        borderRadius: 2,
                        background: theme.palette.mode === 'dark'
                          ? alpha(theme.palette.primary.main, 0.8)
                          : theme.palette.primary.main
                      }}
                    >
                      Create Backup
                    </Button>
                  </CardContent>
                </Card>
                <FormControl fullWidth>
                  <InputLabel>Backup Schedule</InputLabel>
                  <Select
                    label="Backup Schedule"
                    defaultValue="daily"
                  >
                    <MenuItem value="manual">Manual Only</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    mb: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    background: alpha(theme.palette.background.paper, 0.5)
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      Restore System
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Restore the system from a previous backup file.
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    >
                      Select Backup File
                    </Button>
                  </CardContent>
                </Card>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                  Previous Backups
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Backup 2023-04-15" 
                      secondary="Full system backup (245 MB)" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Backup 2023-03-20" 
                      secondary="Full system backup (232 MB)" 
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </SettingsPanel>
        )}
      </Box>

      <Box role="tabpanel" hidden={tabValue !== 5} sx={{ mb: 2 }}>
        {tabValue === 5 && (
          <SettingsPanel title="Analytics Settings" icon={<AnalyticsIcon />}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable Usage Analytics"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Collect User Demographics"
                  sx={{ mb: 2, display: 'block' }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Track Feature Usage"
                  sx={{ mb: 2, display: 'block' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Data Retention</InputLabel>
                  <Select
                    label="Data Retention"
                    defaultValue="365"
                  >
                    <MenuItem value="30">30 Days</MenuItem>
                    <MenuItem value="90">90 Days</MenuItem>
                    <MenuItem value="180">6 Months</MenuItem>
                    <MenuItem value="365">1 Year</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Anonymize User Data"
                  sx={{ mb: 2, display: 'block' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                    color: theme.palette.info.main
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Analytics Integration
                  </Typography>
                  <Typography variant="body2">
                    Connect to external analytics platforms like Google Analytics or Mixpanel in the Integrations tab.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </SettingsPanel>
        )}
      </Box>

      <Snackbar
        open={saveSuccess}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 