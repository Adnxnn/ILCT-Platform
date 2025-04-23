import React, { useState } from 'react';
import { Box, Typography, useTheme as useMuiTheme, Link, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useAuth } from '../../context/AuthContext';

// Import custom components
import AuthCard from './components/AuthCard';
import AuthInput from './components/AuthInput';
import NeonButton from './components/NeonButton';
import SocialAuth from './components/SocialAuth';

const LoginPage = () => {
  const theme = useMuiTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        submit: error.message || 'Invalid email or password'
      });
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
            mb: 2,
            background: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.2)
              : alpha(theme.palette.background.paper, 0.7),
            py: 0.75,
            px: 2,
            borderRadius: '16px',
          }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px'
              }}
            >
              Sign In
            </Typography>
          </Box>
        </motion.div>
        
        <AuthCard>
          <form onSubmit={handleSubmit}>
            <AuthInput
              icon={<EmailIcon />}
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              autoFocus
            />
            
            <AuthInput
              icon={<VpnKeyIcon />}
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            
            {errors.submit && (
              <Typography 
                variant="body2" 
                color="error" 
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {errors.submit}
              </Typography>
            )}
            
            <Box sx={{ mt: 1, textAlign: 'right' }}>
              <Link
                component={RouterLink}
                to="/auth/forgot-password"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot password?
              </Link>
            </Box>
            
            <NeonButton 
              type="submit" 
              loading={loading}
              isSubmit={true}
            >
              Sign In
            </NeonButton>
            
            <SocialAuth 
              onGoogleLogin={() => console.log('Google login')}
              onFacebookLogin={() => console.log('Facebook login')}
              onGithubLogin={() => console.log('GitHub login')}
              onAppleLogin={() => console.log('Apple login')}
            />
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/auth/register"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </form>
        </AuthCard>
      </Box>
    </motion.div>
  );
};

export default LoginPage; 