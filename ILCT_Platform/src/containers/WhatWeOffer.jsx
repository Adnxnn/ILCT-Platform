import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import CodeIcon from '@mui/icons-material/Code';

const WhatWeOffer = () => {
    const theme = useTheme();
    const offers = [
        {
            title: 'Real-Time Coding Demonstrations',
            description: 'Teachers can write code live while students watch and learn.',
            icon: <LiveTvIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        },
        {
            title: 'Interactive Learning',
            description: 'Students can request to modify the code, ask questions, and get instant feedback.',
            icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        },
        {
            title: 'Collaborative Environment',
            description: 'Foster a sense of community and teamwork as students and teachers collaborate on coding projects.',
            icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        },
        {
            title: 'Comprehensive Learning Tools',
            description: 'Our platform includes various tools and features to enhance the learning experience, such as syntax highlighting, error detection, and version control.',
            icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
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
                        What We Offer
                    </Typography>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Grid container spacing={4}>
                        {offers.map((offer, index) => (
                            <Grid item xs={12} sm={6} key={index}>
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
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: '4px',
                                                background: theme.palette.mode === 'dark'
                                                    ? 'linear-gradient(90deg, #90caf9, #ce93d8)'
                                                    : 'linear-gradient(90deg, #1976d2, #9c27b0)',
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, p: 4 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Box sx={{ mr: 2 }}>
                                                    {offer.icon}
                                                </Box>
                                                <Typography 
                                                    variant="h5" 
                                                    component="h3" 
                                                    sx={{ 
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {offer.title}
                                                </Typography>
                                            </Box>
                                            <Typography 
                                                variant="body1" 
                                                color="text.secondary"
                                                sx={{ 
                                                    lineHeight: 1.6,
                                                    pl: 7,
                                                }}
                                            >
                                                {offer.description}
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

export default WhatWeOffer;
