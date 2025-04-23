import React from 'react';
import { Box, Typography, Divider, useTheme as useMuiTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppleIcon from '@mui/icons-material/Apple';

const SocialAuth = ({ onGoogleLogin, onFacebookLogin, onGithubLogin, onAppleLogin, signUp = false }) => {
  const theme = useMuiTheme();
  
  const socialButtons = [
    {
      name: 'Google',
      icon: <GoogleIcon />,
      onClick: onGoogleLogin,
      color: '#DB4437',
      hoverColor: '#C31E0E',
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      onClick: onFacebookLogin,
      color: '#4267B2',
      hoverColor: '#2F4A80',
    },
    {
      name: 'GitHub',
      icon: <GitHubIcon />,
      onClick: onGithubLogin,
      color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
      hoverColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#24292e',
    },
    {
      name: 'Apple',
      icon: <AppleIcon />,
      onClick: onAppleLogin,
      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
      hoverColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333333',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            px: 1.5,
            fontSize: '0.8rem',
          }}
        >
          or continue with
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
        }}
      >
        {socialButtons.map((button) => (
          <Box
            key={button.name}
            component={motion.div}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 2px 8px ${alpha(button.color, 0.25)}`,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={button.onClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: theme.palette.mode === 'dark' 
                ? alpha(button.color, 0.15) 
                : alpha(button.color, 0.1),
              border: `1px solid ${alpha(button.color, theme.palette.mode === 'dark' ? 0.3 : 0.2)}`,
              color: button.color,
              transition: 'all 0.3s ease',
              '& svg': {
                fontSize: '20px'
              },
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha(button.color, 0.25) 
                  : alpha(button.color, 0.15),
                color: button.hoverColor,
              }
            }}
          >
            {button.icon}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SocialAuth; 