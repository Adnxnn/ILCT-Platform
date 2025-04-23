import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  useTheme, 
  alpha, 
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  PeopleAlt as UsersIcon,
  ForumOutlined as ChannelsIcon,
  Leaderboard as AnalyticsIcon,
  SmartToy as AIIcon,
  MoreVert as MoreIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value, subtitle, trend, trendValue, color }) => {
  const theme = useTheme();
  
  const trendColor = trend === 'up' ? theme.palette.success.main : theme.palette.error.main;
  const TrendIcon = trend === 'up' ? TrendingUpIcon : TrendingDownIcon;
  
  return (
    <Card
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      sx={{
        borderRadius: 2,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
          : '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: typeof color === 'string' ? color : `linear-gradient(90deg, ${color[0]}, ${color[1]})`,
        },
      }}
    >
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box 
            sx={{ 
              p: 1.5, 
              borderRadius: '12px', 
              background: alpha(typeof color === 'string' ? color : color[0], 0.12),
              color: typeof color === 'string' ? color : color[0],
              mb: 2
            }}
          >
            {icon}
          </Box>
          <Tooltip title="More options">
            <IconButton size="small">
              <MoreIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 700, 
            mb: 0.5,
            background: typeof color !== 'string' ? `linear-gradient(90deg, ${color[0]}, ${color[1]})` : 'none',
            WebkitBackgroundClip: typeof color !== 'string' ? 'text' : 'none',
            WebkitTextFillColor: typeof color !== 'string' ? 'transparent' : 'inherit',
            color: typeof color === 'string' ? color : 'inherit'
          }}
        >
          {value}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" mb={1.5}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: trendColor,
              bgcolor: alpha(trendColor, 0.1),
              px: 1,
              py: 0.5,
              borderRadius: 1,
              mr: 1
            }}
          >
            <TrendIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
              {trendValue}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();

  const statCards = [
    { 
      icon: <UsersIcon />, 
      title: 'Total Users', 
      value: '2,845', 
      subtitle: 'since last month', 
      trend: 'up', 
      trendValue: '12%',
      color: [theme.palette.primary.main, theme.palette.primary.dark]
    },
    { 
      icon: <ChannelsIcon />, 
      title: 'Active Channels', 
      value: '186', 
      subtitle: 'since last week', 
      trend: 'up', 
      trendValue: '8%',
      color: [theme.palette.info.main, theme.palette.info.dark]
    },
    { 
      icon: <AIIcon />, 
      title: 'AI Interactions', 
      value: '8,492', 
      subtitle: 'since yesterday', 
      trend: 'up', 
      trendValue: '23%',
      color: [theme.palette.success.main, theme.palette.success.dark]
    },
    { 
      icon: <AnalyticsIcon />, 
      title: 'Total Messages', 
      value: '34K', 
      subtitle: 'since last week', 
      trend: 'down', 
      trendValue: '2%',
      color: [theme.palette.warning.main, theme.palette.warning.dark]
    }
  ];

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
          Dashboard Overview
        </Typography>
        
        <Tooltip title="Refresh data">
          <IconButton
            sx={{
              background: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Card
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            sx={{
              borderRadius: 2,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
                : '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
              height: '100%',
              p: 3
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              User Activity Overview
            </Typography>
            
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Activity chart will be displayed here
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            sx={{
              borderRadius: 2,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
                : '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
              height: '100%',
              p: 3
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Recent Activities
            </Typography>

            {[1, 2, 3, 4, 5].map((item, index) => (
              <React.Fragment key={index}>
                <Box sx={{ py: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {index === 0 && 'New user registration'}
                      {index === 1 && 'Channel created'}
                      {index === 2 && 'System update completed'}
                      {index === 3 && 'Jamboard session created'}
                      {index === 4 && 'User upgraded to premium'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {index === 0 && '10m ago'}
                      {index === 1 && '2h ago'}
                      {index === 2 && '5h ago'}
                      {index === 3 && '1d ago'}
                      {index === 4 && '2d ago'}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {index === 0 && 'John Doe (john@example.com)'}
                    {index === 1 && 'Marketing Team Channel'}
                    {index === 2 && 'v2.1.3 update deployed'}
                    {index === 3 && 'Project Brainstorming Board'}
                    {index === 4 && 'Sarah Johnson (sarah@example.com)'}
                  </Typography>
                </Box>
                {index < 4 && <Divider />}
              </React.Fragment>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 