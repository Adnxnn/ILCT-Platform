import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import { useAuth } from '../../context/AuthContext';
import ParticlesBackground from './components/ParticlesBackground';

const AuthPages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  // Extract the current auth page from the location
  const currentPage = location.pathname.split('/').pop();
  
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        overflow: 'hidden'
      }}
    >
      {/* Animated background particles */}
      <ParticlesBackground />
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default AuthPages; 