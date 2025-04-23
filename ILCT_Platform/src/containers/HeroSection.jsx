import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import { ReactTyped } from "react-typed";

export default function HeroSection() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                background: '#121212',
                width: '100%',
                maxWidth: '100vw',
                margin: 0,
                overflow: 'hidden',
                position: 'relative',
                pl: { xs: 3, md: 6 },
                pr: { xs: 3, md: 6 },
            }}
        >
            <Box sx={{ maxWidth: '800px' }}>
                <Box 
                    sx={{ 
                        color: '#64B5F6',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '1.1rem',
                        fontWeight: 500
                    }}
                >
                    <span>{'<>'}</span>
                    <ReactTyped
                        strings={[
                            "Real-time Collabor|",
                            "Live Teaching|",
                            "Interactive Learning|"
                        ]}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                    />
                </Box>

                <Typography 
                    variant='h1' 
                    sx={{ 
                        mb: 3,
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                        fontWeight: 700,
                        lineHeight: 1.1,
                        background: 'linear-gradient(to right, #64B5F6, #E57FD3)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'left'
                    }}
                >
                    Interactive Live Coding and Teaching Platform
                </Typography>

                <Typography 
                    sx={{ 
                        mb: 4,
                        color: '#9E9E9E',
                        fontSize: '1.2rem',
                        maxWidth: '600px',
                        textAlign: 'left'
                    }}
                >
                    Join our platform to experience real-time coding collaboration, interactive teaching, and seamless learning experiences.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        component={Link} 
                        to="/register" 
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            backgroundColor: '#64B5F6',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#42A5F5'
                            }
                        }}
                    >
                        Get Started
                    </Button>
                    <Button 
                        component={Link} 
                        to="/login" 
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            border: '1px solid #64B5F6',
                            color: '#64B5F6',
                            '&:hover': {
                                border: '1px solid #42A5F5',
                                color: '#42A5F5'
                            }
                        }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>

            {/* Graduation Cap Icon */}
            <Box
                sx={{
                    position: 'absolute',
                    right: '5%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: { xs: 'none', md: 'block' }
                }}
            >
                <SchoolIcon 
                    sx={{ 
                        fontSize: '300px',
                        color: 'rgba(100, 181, 246, 0.1)'
                    }} 
                />
            </Box>
        </Box>
    );
}
