import React from 'react';
import { Button, useTheme, alpha, Typography, Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const NeonButton = ({
  children,
  onClick,
  loading = false,
  color = 'primary',
  endIcon,
  startIcon,
  isSubmit = false,
  fullWidth = true,
  ...props
}) => {
  const theme = useTheme();
  
  // Define neon glow colors based on theme
  const neonColors = {
    primary: {
      base: theme.palette.primary.main,
      glow: theme.palette.primary.main,
      textShadow: '0 0 5px rgba(0,185,255,0.7), 0 0 10px rgba(0,185,255,0.5)',
      borderColor: alpha(theme.palette.primary.main, 0.5)
    },
    secondary: {
      base: theme.palette.secondary.main,
      glow: theme.palette.secondary.main,
      textShadow: '0 0 5px rgba(190,0,255,0.7), 0 0 10px rgba(190,0,255,0.5)',
      borderColor: alpha(theme.palette.secondary.main, 0.5)
    },
    success: {
      base: theme.palette.success.main,
      glow: theme.palette.success.main,
      textShadow: '0 0 5px rgba(0,200,83,0.7), 0 0 10px rgba(0,200,83,0.5)',
      borderColor: alpha(theme.palette.success.main, 0.5)
    },
    error: {
      base: theme.palette.error.main,
      glow: theme.palette.error.main,
      textShadow: '0 0 5px rgba(255,0,51,0.7), 0 0 10px rgba(255,0,51,0.5)',
      borderColor: alpha(theme.palette.error.main, 0.5)
    },
  };

  const neonColor = neonColors[color] || neonColors.primary;

  return (
    <Box 
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      sx={{
        position: 'relative',
        width: fullWidth ? '100%' : 'auto',
        my: 1.5,
        overflow: 'hidden',
        borderRadius: '12px',
        filter: `drop-shadow(0 0 6px ${alpha(neonColor.glow, 0.3)})`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '12px',
          padding: '2px',
          background: `linear-gradient(45deg, ${neonColor.base}, ${alpha(neonColor.glow, 0.8)})`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        }
      }}
    >
      <Button
        variant="contained"
        onClick={onClick}
        disabled={loading}
        type={isSubmit ? 'submit' : 'button'}
        startIcon={!loading && startIcon}
        endIcon={!loading && endIcon}
        fullWidth={fullWidth}
        disableElevation
        sx={{
          py: 1.5,
          borderRadius: '10px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(45deg, ${alpha(neonColor.base, 0.2)}, ${alpha(neonColor.glow, 0.3)})`
            : `linear-gradient(45deg, ${alpha(neonColor.base, 0.9)}, ${alpha(neonColor.glow, 0.9)})`,
          border: `1px solid ${neonColor.borderColor}`,
          color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 0 12px ${alpha(neonColor.base, 0.3)}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: -100,
            width: '70px',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.2)}, transparent)`,
            transform: 'skewX(-20deg)',
            transition: 'all 0.6s ease',
            zIndex: 1,
          },
          '&:hover': {
            background: theme.palette.mode === 'dark' 
              ? `linear-gradient(45deg, ${alpha(neonColor.base, 0.3)}, ${alpha(neonColor.glow, 0.4)})`
              : `linear-gradient(45deg, ${alpha(neonColor.base, 1)}, ${alpha(neonColor.glow, 1)})`,
            boxShadow: `0 0 20px ${alpha(neonColor.glow, 0.6)}`,
            '&::before': {
              left: '150%',
              transition: 'all 0.6s ease',
            },
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
          '&.Mui-disabled': {
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.2)
              : alpha(theme.palette.background.paper, 0.2),
            color: theme.palette.text.disabled,
            boxShadow: 'none',
            '&::before': {
              display: 'none',
            },
          },
          ...props.sx
        }}
        {...props}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <Typography 
            variant="button" 
            sx={{ 
              fontWeight: 600,
              textShadow: theme.palette.mode === 'dark' ? neonColor.textShadow : 'none',
            }}
          >
            {children}
          </Typography>
        )}
      </Button>
    </Box>
  );
};

export default NeonButton; 