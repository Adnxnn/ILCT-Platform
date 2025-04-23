// src/components/Features.js

import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import DevicesIcon from '@mui/icons-material/Devices';

const Features = () => {
    const theme = useTheme();
    const features = [
        {
            title: 'Easy Control',
            description: 'Easy and known controls for better understanding of the environment.',
            icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        },
        {
            title: 'Free for All',
            description: 'TLCT is free for all and open source, made for computer science students',
            icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        },
        {
            title: 'Device Compatibility',
            description: 'Compatible with almost all browsers in various devices',
            icon: <DevicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <Box
            sx={{
                py: 8,
                backgroundColor: 'background.default',
                width: '100%',
                maxWidth: '100vw',
                margin: 0,
                overflow: 'hidden',
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
                        Features
                    </Typography>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <motion.div variants={itemVariants}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: theme.shadows[8],
                                            },
                                            background: theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.05)'
                                                : 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            border: `1px solid ${theme.palette.divider}`,
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                                            <Box sx={{ mb: 2 }}>
                                                {feature.icon}
                                            </Box>
                                            <Typography 
                                                variant="h5" 
                                                component="h3" 
                                                gutterBottom
                                                sx={{ 
                                                    fontWeight: 600,
                                                    mb: 2,
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                color="text.secondary"
                                                sx={{ 
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Features;
