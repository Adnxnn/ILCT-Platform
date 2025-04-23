import React from 'react';
import { Box, Container, Typography, Grid, useTheme, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import GroupIcon from '@mui/icons-material/Group';
import { ReactTyped } from "react-typed";

const About = () => {
    const theme = useTheme();

    const stats = [
        {
            icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            value: '1000+',
            label: 'Students',
        },
        {
            icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            value: '500+',
            label: 'Projects',
        },
        {
            icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
            value: '50+',
            label: 'Teachers',
        },
    ];

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
                py: 8,
                width: '100%',
                maxWidth: '100vw',
                margin: 0,
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `radial-gradient(circle at center, ${theme.palette.primary.main}10 0%, transparent 70%)`,
                    zIndex: 0,
                }
            }}
        >
            <Container 
                maxWidth={false}
                sx={{
                    px: { xs: 2, sm: 4, md: 6, lg: 8 },
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography 
                        variant="h3" 
                        component="h2" 
                        gutterBottom 
                        align="center"
                        sx={{
                            mb: 6,
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
                                : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 700,
                        }}
                    >
                    About Us
                </Typography>
                </motion.div>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 400,
                                        height: 400,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: theme.palette.mode === 'dark'
                                            ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
                                            : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
                                        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1), inset 0 0 0 1px ${theme.palette.divider}`,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `radial-gradient(circle at center, ${theme.palette.primary.main}10 0%, transparent 70%)`,
                                            zIndex: 0,
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            top: -5,
                                            left: -5,
                                            right: -5,
                                            bottom: -5,
                                            border: `2px solid ${theme.palette.primary.main}30`,
                                            borderRadius: '50%',
                                            zIndex: -1,
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 1,
                                            textAlign: 'center',
                                            p: 3,
                                        }}
                                    >
                                        <CodeIcon 
                                            sx={{ 
                                                fontSize: 80, 
                                                color: 'primary.main',
                                                mb: 2,
                                            }} 
                                        />
                                        <Typography 
                                            variant="h4" 
                                            sx={{ 
                                                fontWeight: 700,
                                                mb: 1,
                                                background: theme.palette.mode === 'dark'
                                                    ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
                                                    : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                            }}
                                        >
                                            ILCT Platform
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                color: 'text.secondary',
                                                maxWidth: '80%',
                                                mb: 2,
                                            }}
                                        >
                                            <ReactTyped
                                                strings={[
                                                    "Interactive Learning",
                                                    "Live Coding",
                                                    "Collaborative Teaching",
                                                ]}
                                                typeSpeed={40}
                                                backSpeed={50}
                                                loop
                                            />
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: 'text.secondary',
                                                maxWidth: '80%',
                                            }}
                                        >
                                            Revolutionizing education through technology
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography 
                                variant="h4" 
                                gutterBottom
                                sx={{ 
                                    fontWeight: 600,
                                    mb: 3,
                                }}
                            >
                                Welcome to our Interactive Live Coding & Teaching Platform!
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    mb: 3,
                                    lineHeight: 1.8,
                                    color: 'text.secondary',
                                }}
                            >
                                Our mission is to revolutionize the way coding is taught and learned by creating an engaging, collaborative, and interactive educational experience.
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    mb: 4,
                                    lineHeight: 1.8,
                                    color: 'text.secondary',
                                }}
                            >
                                In today's fast-paced world, traditional teaching methods can often fall short in keeping students engaged and providing real-time feedback. Our platform, built using Node.js and socket programming, aims to bridge this gap by allowing teachers to demonstrate coding in real-time.
                            </Typography>
                            <Grid container spacing={4}>
                                {stats.map((stat, index) => (
                                    <Grid item xs={4} key={index}>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Box sx={{ mb: 1 }}>
                                                {stat.icon}
                                            </Box>
                                            <Typography 
                                                variant="h4" 
                                                sx={{ 
                                                    fontWeight: 700,
                                                    mb: 1,
                                                }}
                                            >
                                                {stat.value}
                        </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                            >
                                                {stat.label}
                        </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default About;
