import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Link, Box, IconButton, useMediaQuery } from "@mui/material";
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from "react-router-dom";
import BedtimeIcon from '@mui/icons-material/Bedtime';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import DiamondIcon from '@mui/icons-material/Diamond';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const [shrink, setShrink] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const muiTheme = useMuiTheme();
    const { isDarkMode, toggleTheme } = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShrink(true);
            } else {
                setShrink(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navbarStyle = {
        position: 'sticky',
        top: 0,
        backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: shrink ? '8px' : '16px',
        height: shrink ? '50px' : '80px',
        transition: 'all 0.3s ease',
        zIndex: 1000,
    };

    const drawer = (
        <List>
            <ListItem button component={RouterLink} to="/" onClick={handleDrawerToggle}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={RouterLink} to="/login" onClick={handleDrawerToggle}>
                <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={RouterLink} to="/register" onClick={handleDrawerToggle}>
                <ListItemText primary="Register" />
            </ListItem>
            <ListItem button onClick={toggleTheme}>
                <ListItemText primary={isDarkMode ? "Light Mode" : "Dark Mode"} />
            </ListItem>
        </List>
    );

    if (location.pathname !== '/dashboard') {
        return (
            <Box sx={navbarStyle}>
                <Container maxWidth="lg">
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DiamondIcon color="primary" sx={{ fontSize: 32 }} />
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontWeight: 700,
                                        background: isDarkMode 
                                            ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)' 
                                            : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        display: { sm: 'block', xs: 'none' }
                                    }}
                                >
                                    ILCTp
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            {isMobile ? (
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Link 
                                        component={RouterLink} 
                                        to="/" 
                                        sx={{ 
                                            color: 'text.primary',
                                            textDecoration: 'none',
                                            '&:hover': { color: 'primary.main' }
                                        }}
                                    >
                                        Home
                                    </Link>
                                    <Link 
                                        component={RouterLink} 
                                        to="/login" 
                                        sx={{ 
                                            color: 'text.primary',
                                            textDecoration: 'none',
                                            '&:hover': { color: 'primary.main' }
                                        }}
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        component={RouterLink} 
                                        to="/register" 
                                        sx={{ 
                                            color: 'text.primary',
                                            textDecoration: 'none',
                                            '&:hover': { color: 'primary.main' }
                                        }}
                                    >
                                        Register
                                    </Link>
                                    <IconButton 
                                        onClick={toggleTheme}
                                        sx={{
                                            transition: 'transform 0.3s ease',
                                            '&:hover': { transform: 'rotate(180deg)' }
                                        }}
                                    >
                                        {isDarkMode ? <BedtimeIcon /> : <Brightness5Icon />}
                                    </IconButton>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Container>
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 240,
                            backgroundColor: isDarkMode ? '#121212' : '#ffffff',
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        );
    } else {
        return <></>;
    }
}
