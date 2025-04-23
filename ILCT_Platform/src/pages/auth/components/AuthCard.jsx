import React from 'react';
import { Card, useTheme as useMuiTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

const AuthCard = ({ children }) => {
  const theme = useMuiTheme();
  
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        width: '100%',
        maxWidth: '360px',
        background: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.4)
          : alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '12px',
        boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.1)}`,
        p: { xs: 1.5, sm: 2 },
        '& .MuiTextField-root': {
          mb: 1.5,
        },
        '& .MuiButton-root': {
          mt: 1,
        },
      }}
    >
      {children}
    </Card>
  );
};

export default AuthCard; 