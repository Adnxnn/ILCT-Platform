import React from 'react';
import { Box, Container, Grid, Typography, Link, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';

const Footer = () => {
    const theme = useTheme();

    const footerLinks = [
        {
            title: 'Quick Links',
            links: [
                { text: 'Home', href: '/' },
                { text: 'About', href: '/about' },
                { text: 'Features', href: '/features' },
                { text: 'Contact', href: '/contact' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { text: 'Documentation', href: '/docs' },
                { text: 'Tutorials', href: '/tutorials' },
                { text: 'Blog', href: '/blog' },
                { text: 'Support', href: '/support' },
            ],
        },
    ];

    const socialLinks = [
        {
            icon: <EmailIcon />,
            href: 'mailto:adnanaslam1702@gmail.com?subject=ILCT+platform',
            label: 'Email',
        },
        {
            icon: <LinkedInIcon />,
            href: 'https://www.linkedin.com/in/mohammed-adnan-a-a69a21342',
            label: 'LinkedIn',
        },
        {
            icon: <GitHubIcon />,
            href: 'https://github.com/Adnxnn',
            label: 'GitHub',
        },
        {
            icon: <LanguageIcon />,
            href: 'https://ilct-platform.kesug.com',
            label: 'Website',
        },
    ];

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
                padding: '4rem 0 2rem',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(90deg, transparent, rgba(144, 202, 249, 0.5), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.5), transparent)',
                }
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <CodeIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontWeight: 700,
                                        background: theme.palette.mode === 'dark'
                                            ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
                                            : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    ILCT Platform
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Interactive Live Coding & Teaching Platform for computer science students and educators.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {socialLinks.map((social, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Link
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: 'text.primary',
                                                '&:hover': {
                                                    color: 'primary.main',
                                                },
                                                transition: 'color 0.3s ease',
                                            }}
                                        >
                                            {social.icon}
                                        </Link>
                                    </motion.div>
                                ))}
                            </Box>
                        </motion.div>
                    </Grid>
                    {footerLinks.map((section, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Typography 
                                    variant="h6" 
                                    gutterBottom
                                    sx={{ 
                                        fontWeight: 600,
                                        mb: 2,
                                    }}
                                >
                                    {section.title}
                                </Typography>
                                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                    {section.links.map((link, linkIndex) => (
                                        <motion.li
                                            key={linkIndex}
                                            whileHover={{ x: 5 }}
                                        >
                                            <Link
                                                href={link.href}
                                                sx={{
                                                    display: 'block',
                                                    color: 'text.secondary',
                                                    textDecoration: 'none',
                                                    mb: 1,
                                                    '&:hover': {
                                                        color: 'primary.main',
                                                    },
                                                    transition: 'color 0.3s ease',
                                                }}
                                            >
                                                {link.text}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
                <Box
                    sx={{
                        mt: 4,
                        pt: 4,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        textAlign: 'center',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            © {new Date().getFullYear()} ILCT Platform. All rights reserved.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Made by the ILCT Team
                        </Typography>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
