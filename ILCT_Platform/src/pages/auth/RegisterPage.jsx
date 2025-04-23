import React, { useState } from 'react';
import { Box, Typography, useTheme as useMuiTheme, Link, alpha, Checkbox, FormControlLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../context/AuthContext';

// Import custom components
import AuthCard from './components/AuthCard';
import AuthInput from './components/AuthInput';
import NeonButton from './components/NeonButton';
import SocialAuth from './components/SocialAuth';

const RegisterPage = () => {
  const theme = useMuiTheme();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeTerms' ? checked : value
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
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password && formData.password.length < 6) 
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeTerms) 
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        submit: error.message || 'Registration failed. Please try again.'
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
              <PersonAddAltOutlinedIcon 
                sx={{ 
                  fontSize: 36, 
                  color: theme.palette.secondary.main,
                  mr: 1.5
                }} 
              />
            </motion.div>
            
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px'
              }}
            >
              Create Account
            </Typography>
          </Box>
        </motion.div>
        
        <AuthCard>
          <form onSubmit={handleSubmit}>
            <AuthInput
              icon={<PersonIcon />}
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              autoFocus
            />
            
            <AuthInput
              icon={<EmailIcon />}
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
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
              helperText="Password must be at least 6 characters"
            />
            
            <AuthInput
              icon={<VpnKeyIcon />}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  color="primary"
                  sx={{
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link
                    component={RouterLink}
                    to="/terms"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Terms and Conditions
                  </Link>
                </Typography>
              }
              sx={{ mt: 1 }}
            />
            
            {errors.agreeTerms && (
              <Typography 
                variant="caption" 
                color="error" 
                sx={{ 
                  display: 'block', 
                  mt: 0.5,
                  ml: 2
                }}
              >
                {errors.agreeTerms}
              </Typography>
            )}
            
            {errors.submit && (
              <Typography 
                variant="body2" 
                color="error" 
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {errors.submit}
              </Typography>
            )}
            
            <NeonButton 
              type="submit" 
              loading={loading}
              isSubmit={true}
              color="secondary"
            >
              Create Account
            </NeonButton>
            
            <SocialAuth 
              onGoogleLogin={() => console.log('Google login')}
              onFacebookLogin={() => console.log('Facebook login')}
              onGithubLogin={() => console.log('GitHub login')}
              onAppleLogin={() => console.log('Apple login')}
              signUp={true}
            />
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
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
        </AuthCard>
      </Box>
    </motion.div>
  );
};

export default RegisterPage; 