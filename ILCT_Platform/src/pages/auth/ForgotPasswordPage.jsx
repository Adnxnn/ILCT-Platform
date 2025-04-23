import React, { useState } from 'react';
import { Box, Typography, useTheme as useMuiTheme, Link, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import EmailIcon from '@mui/icons-material/Email';
import { useAuth } from '../../context/AuthContext';

// Import custom components
import AuthCard from './components/AuthCard';
import AuthInput from './components/AuthInput';
import NeonButton from './components/NeonButton';

const ForgotPasswordPage = () => {
  const theme = useMuiTheme();
  const { requestPasswordReset } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    // Basic validation
    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }
    
    try {
      const result = await requestPasswordReset(email);
      if (result) {
        setSuccess(true);
      } else {
        setError('Failed to send password reset email. Please try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 3,
            background: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.2)
              : alpha(theme.palette.background.paper, 0.7),
            py: 1,
            px: 3,
            borderRadius: '20px',
            boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`
          }}>
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <LockResetIcon 
                sx={{ 
                  fontSize: 36, 
                  color: theme.palette.primary.main,
                  mr: 1.5
                }} 
              />
            </motion.div>
            
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px'
              }}
            >
              Reset Password
            </Typography>
          </Box>
        </motion.div>
        
        <AuthCard>
          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: alpha(theme.palette.success.main, 0.2),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      border: `2px solid ${theme.palette.success.main}`,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: '2rem',
                        color: theme.palette.success.main,
                      }}
                    >
                      ✓
                    </Typography>
                  </Box>
                </motion.div>
                
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Email Sent!
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3 }}>
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your inbox and follow the instructions.
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  If you don't receive an email within a few minutes, please check your spam folder.
                </Typography>
                
                <NeonButton
                  onClick={() => setSuccess(false)}
                  color="primary"
                >
                  Try Again
                </NeonButton>
                
                <Box sx={{ mt: 3 }}>
                  <Link
                    component={RouterLink}
                    to="/auth/login"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Return to Sign In
                  </Link>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Enter your email address and we'll send you a link to reset your password.
              </Typography>
              
              <AuthInput
                icon={<EmailIcon />}
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                error={error}
                required
                autoFocus
              />
              
              <NeonButton 
                type="submit" 
                loading={loading}
                isSubmit={true}
              >
                Send Reset Link
              </NeonButton>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Remember your password?{' '}
                  <Link
                    component={RouterLink}
                    to="/auth/login"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </form>
          )}
        </AuthCard>
      </Box>
    </motion.div>
  );
};

export default ForgotPasswordPage; 