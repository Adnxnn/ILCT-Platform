import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CodeIcon from '@mui/icons-material/Code';

const HowItWorks = () => {
    const theme = useTheme();
    const steps = [
        {
            title: 'Step 1',
            description: 'Register to TLCT Platform',
            icon: <PersonAddIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        },
        {
            title: 'Step 2',
            description: 'Create a channel or join one',
            icon: <GroupAddIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        },
        {
            title: 'Step 3',
            description: 'Start writing codes or view a host',
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
                        How It Works
                    </Typography>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Grid container spacing={4}>
                        {steps.map((step, index) => (
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
                                        <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                                            <Box sx={{ mb: 2 }}>
                                                {step.icon}
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
                                                {step.title}
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                color="text.secondary"
                                                sx={{ 
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {step.description}
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

export default HowItWorks;
