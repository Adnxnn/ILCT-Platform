import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, CircularProgress, Card, CardContent, useTheme, Alert, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState([]);
    const [isHoveringCard, setIsHoveringCard] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        let timeoutIds = [];
        let animationFrameId;
        let formRect = null;
        
        const handleMouseMove = (e) => {
            // Get form card position if not already gotten
            if (!formRect) {
                const formCard = document.querySelector('.form-card');
                if (formCard) {
                    formRect = formCard.getBoundingClientRect();
                }
            }

            // Check if mouse is over or near the form card
            if (formRect) {
                const buffer = 20; // Buffer zone around the card
                if (e.clientX >= formRect.left - buffer &&
                    e.clientX <= formRect.right + buffer &&
                    e.clientY >= formRect.top - buffer &&
                    e.clientY <= formRect.bottom + buffer) {
                    return; // Don't create effects when near the form
                }
            }

            setMousePosition({ x: e.clientX, y: e.clientY });
            
            const newPoint = {
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now(),
                offsetX: (Math.random() - 0.5) * 20,
                offsetY: (Math.random() - 0.5) * 20
            };
            
            setTrail(prevTrail => {
                const newTrail = [...prevTrail, newPoint];
                return newTrail.slice(-25);
            });

            // Create multiple sparks
            for (let i = 0; i < 3; i++) {
                const spark = document.createElement('div');
                spark.className = 'cursor-spark';
                spark.style.left = `${e.clientX}px`;
                spark.style.top = `${e.clientY}px`;
                spark.style.position = 'fixed';
                spark.style.pointerEvents = 'none';
                spark.style.zIndex = '1';
                
                const angle = (Math.random() * Math.PI * 2);
                const distance = Math.random() * 30 + 20;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;
                
                spark.style.setProperty('--dx', `${dx}px`);
                spark.style.setProperty('--dy', `${dy}px`);
                
                const duration = Math.random() * 600 + 400;
                spark.style.animation = `spark ${duration}ms ease-out forwards`;
                
                document.body.appendChild(spark);
                timeoutIds.push(setTimeout(() => document.body.removeChild(spark), duration));
            }
        };

        const style = document.createElement('style');
        style.textContent = `
            @keyframes spark {
                0% {
                    width: 4px;
                    height: 4px;
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                    background: radial-gradient(circle, #64B5F6 0%, #E57FD3 50%, transparent 100%);
                    filter: blur(0px);
                }
                50% {
                    width: 8px;
                    height: 8px;
                    opacity: 0.8;
                    background: radial-gradient(circle, #E57FD3 0%, #64B5F6 50%, transparent 100%);
                    filter: blur(2px);
                }
                100% {
                    width: 2px;
                    height: 2px;
                    opacity: 0;
                    transform: translate(var(--dx), var(--dy)) scale(0.1);
                    background: radial-gradient(circle, #64B5F6 0%, transparent 100%);
                    filter: blur(1px);
                }
            }
            
            .cursor-trail {
                position: fixed;
                pointer-events: none;
                z-index: 1;
                mix-blend-mode: screen;
                filter: blur(1px);
            }
        `;
        document.head.appendChild(style);

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            timeoutIds.forEach(id => clearTimeout(id));
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            document.head.removeChild(style);
        };
    }, []);

    useEffect(() => {
        if (!isHoveringCard && trail.length > 1) {
            const canvas = document.createElement('canvas');
            canvas.className = 'cursor-trail';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '1';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.shadowBlur = 15;
            ctx.shadowColor = '#64B5F6';
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            for (let i = 0; i < trail.length - 1; i++) {
                const point = trail[i];
                const nextPoint = trail[i + 1];
                const age = Date.now() - point.timestamp;
                const opacity = Math.max(0, 1 - age / 800);

                const wave = Math.sin(age / 100) * 5;
                const xOffset = point.offsetX * opacity;
                const yOffset = point.offsetY * opacity;

                ctx.beginPath();
                const gradient = ctx.createLinearGradient(
                    point.x + xOffset, point.y + yOffset + wave,
                    nextPoint.x + nextPoint.offsetX * opacity, 
                    nextPoint.y + nextPoint.offsetY * opacity + wave
                );
                
                gradient.addColorStop(0, `rgba(100, 181, 246, ${opacity * 0.8})`);
                gradient.addColorStop(0.5, `rgba(229, 127, 211, ${opacity * 0.6})`);
                gradient.addColorStop(1, `rgba(100, 181, 246, ${opacity * 0.4})`);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = Math.max(1, 6 * opacity);
                
                ctx.moveTo(point.x + xOffset, point.y + yOffset + wave);
                
                const cp1x = point.x + xOffset + (nextPoint.x - point.x) * 0.5;
                const cp1y = point.y + yOffset + wave;
                const cp2x = nextPoint.x + nextPoint.offsetX * opacity;
                const cp2y = nextPoint.y + nextPoint.offsetY * opacity + wave;
                
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, 
                    nextPoint.x + nextPoint.offsetX * opacity,
                    nextPoint.y + nextPoint.offsetY * opacity + wave
                );
                
                ctx.stroke();
            }

            document.body.appendChild(canvas);

            return () => {
                document.body.removeChild(canvas);
            };
        }
    }, [trail, isHoveringCard]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            length: password.length >= minLength,
            upperCase: hasUpperCase,
            lowerCase: hasLowerCase,
            numbers: hasNumbers,
            specialChar: hasSpecialChar
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setMessage('');

        // Validate email
        if (!validateEmail(formData.email)) {
            setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
            setLoading(false);
            return;
        }

        // Validate password
        const passwordValidation = validatePassword(formData.password);
        if (!Object.values(passwordValidation).every(Boolean)) {
            setErrors(prev => ({
                ...prev,
                password: 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters'
            }));
            setLoading(false);
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL_GLOBAL}/auth/register`, {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('user_email', response.data.user.email);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage(error.response?.data?.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
                position: 'relative',
                overflow: 'hidden',
                pt: 0,
                pb: 0,
            }}
        >
            {/* Animated background elements */}
            {[...Array(20)].map((_, i) => (
                <Box
                    key={i}
                    component={motion.div}
                    sx={{
                        position: 'absolute',
                        width: '2px',
                        height: '2px',
                        background: i % 2 === 0 ? 
                            (theme.palette.mode === 'dark' ? '#64B5F6' : '#1976d2') : 
                            (theme.palette.mode === 'dark' ? '#E57FD3' : '#9c27b0'),
                        borderRadius: '50%',
                    }}
                    animate={{
                        y: ['0vh', '100vh'],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'linear',
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 100}%`,
                    }}
                />
            ))}

            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2, mt: -10 }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <CodeIcon
                                sx={{
                                    fontSize: 45,
                                    color: '#64B5F6',
                                    mb: 1,
                                    filter: 'drop-shadow(0 0 8px rgba(100, 181, 246, 0.5))',
                                }}
                            />
                        </motion.div>
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{
                                mb: 2,
                                background: 'linear-gradient(45deg, #64B5F6 30%, #E57FD3 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 700,
                                textAlign: 'center',
                                fontSize: '1.8rem',
                                filter: 'drop-shadow(0 0 8px rgba(100, 181, 246, 0.3))',
                            }}
                        >
                            Create Account
                        </Typography>
                        <Card
                            className="form-card"
                            component={motion.div}
                            whileHover={{ boxShadow: '0 8px 40px rgba(100, 181, 246, 0.2)' }}
                            onMouseEnter={() => setIsHoveringCard(true)}
                            onMouseLeave={() => setIsHoveringCard(false)}
                            sx={{
                                width: '100%',
                                background: theme.palette.mode === 'dark' 
                                    ? 'rgba(18, 18, 18, 0.8)' 
                                    : 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                border: theme.palette.mode === 'dark'
                                    ? '1px solid rgba(100, 181, 246, 0.1)'
                                    : '1px solid rgba(25, 118, 210, 0.1)',
                                borderRadius: 3,
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                position: 'relative',
                                zIndex: 2,
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <TextField
                                            label="First Name"
                                            name="firstName"
                                            size="small"
                                            fullWidth
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            error={!!errors.firstName}
                                            helperText={errors.firstName}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgba(100, 181, 246, 0.2)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#64B5F6',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#64B5F6',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'rgba(255, 255, 255, 0.9)',
                                                },
                                            }}
                                        />
                                        <TextField
                                            label="Last Name"
                                            name="lastName"
                                            size="small"
                                            fullWidth
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            error={!!errors.lastName}
                                            helperText={errors.lastName}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgba(100, 181, 246, 0.2)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#64B5F6',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#64B5F6',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'rgba(255, 255, 255, 0.9)',
                                                },
                                            }}
                                        />
                                    </Box>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        size="small"
                                        fullWidth
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(100, 181, 246, 0.2)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#64B5F6',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#64B5F6',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(255, 255, 255, 0.7)',
                                            },
                                            '& .MuiInputBase-input': {
                                                color: 'rgba(255, 255, 255, 0.9)',
                                            },
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <TextField
                                            label="Password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            size="small"
                                            fullWidth
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            error={!!errors.password}
                                            helperText={errors.password}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgba(100, 181, 246, 0.2)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#64B5F6',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#64B5F6',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'rgba(255, 255, 255, 0.9)',
                                                },
                                            }}
                                        />
                                        <TextField
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            size="small"
                                            fullWidth
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            error={!!errors.confirmPassword}
                                            helperText={errors.confirmPassword}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        edge="end"
                                                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgba(100, 181, 246, 0.2)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#64B5F6',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#64B5F6',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: 'rgba(255, 255, 255, 0.9)',
                                                },
                                            }}
                                        />
                                    </Box>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                py: 1,
                                                background: 'linear-gradient(45deg, #64B5F6 30%, #E57FD3 90%)',
                                                color: '#000',
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                borderRadius: 1.5,
                                                textTransform: 'none',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #42A5F5 30%, #E040FB 90%)',
                                                },
                                            }}
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={20} /> : "Create Account"}
                                        </Button>
                                    </motion.div>
                                </form>
                                {message && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ mt: 2, textAlign: 'center', fontSize: '0.8rem' }}
                                    >
                                        {message}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Register;
