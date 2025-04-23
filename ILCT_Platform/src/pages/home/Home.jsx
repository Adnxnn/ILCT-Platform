import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Stack,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

// 3D Character Component
function CodeCharacter() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

// Animated Graduation Cap Component
const AnimatedGraduationCap = () => {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ 
        x: ['-100%', '100%']
      }}
      transition={{
        duration: 8,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        position: 'absolute',
        bottom: '100px',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <SchoolIcon sx={{ 
        fontSize: 80,
        color: '#64B5F6',
        filter: 'drop-shadow(0 0 20px rgba(100, 181, 246, 0.8))'
      }} />
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.1)} 0%, 
            ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 4,
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
          }
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
            }}
          >
            {icon}
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Home = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#121212',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
      }}>
        {/* 3D Background */}
        <Box sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <CodeCharacter />
          </Canvas>
        </Box>

        {/* Content */}
        <Box sx={{ 
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          px: 4
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '3rem', md: '4.5rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #64B5F6 30%, #2196F3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              ILCT Platform
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 4,
                fontFamily: "'Roboto Mono', monospace",
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              A collaborative platform for interactive learning and teaching
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: '#64B5F6',
                '&:hover': {
                  bgcolor: '#2196F3'
                },
                px: 4,
                py: 1.5,
                borderRadius: 2
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Box>

        {/* Animated Graduation Cap */}
        <AnimatedGraduationCap />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ pt: 15, pb: 8 }}>
        <Box sx={{ position: 'relative' }}>
          <Typography
            variant="h6"
            sx={{
              color: '#64B5F6',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <span>{'<>'}</span> Real-time |
          </Typography>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 700,
                background: 'linear-gradient(45deg, #64B5F6 30%, #E57CF5 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                lineHeight: 1.2
              }}
            >
              Interactive Live<br />
              Coding and Teaching<br />
              Platform
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                mb: 4,
                maxWidth: '600px',
                fontFamily: 'monospace'
              }}
            >
              Join our platform to experience real-time coding collaboration, interactive teaching, and seamless learning experiences.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#64B5F6',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    bgcolor: '#1E88E5'
                  }
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  color: '#64B5F6',
                  borderColor: '#64B5F6',
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    borderColor: '#1E88E5',
                    color: '#1E88E5'
                  }
                }}
              >
                Sign In
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 