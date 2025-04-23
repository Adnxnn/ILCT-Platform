import React from 'react';
import { 
    List, 
    ListItemText, 
    Button, 
    ListItemButton, 
    ListItem, 
    Box, 
    ButtonGroup, 
    ListItemIcon,
    Typography,
    useTheme,
    alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const ChannelList = ({ channels, onChannelSelect, onCreateChannelClick, drawerClose, onJoinChannelClick }) => {
    const theme = useTheme();
    
    const handleChannelSelect = (channel) => {
        onChannelSelect(channel);
        drawerClose();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ButtonGroup 
                variant="contained" 
                sx={{ 
                    width: '100%',
                    '& .MuiButton-root': {
                        textTransform: 'none',
                        fontWeight: 500,
                    }
                }}
            >
                <Button 
                    startIcon={<GroupAddIcon />}
                    onClick={onJoinChannelClick}
                    sx={{ 
                        flex: 1,
                        background: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.8)
                            : theme.palette.primary.main,
                        '&:hover': {
                            background: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.primary.main, 0.9)
                                : theme.palette.primary.dark,
                        }
                    }}
                >
                    Join Channel
                </Button>
                <Button 
                    onClick={onCreateChannelClick}
                    sx={{ 
                        background: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.8)
                            : theme.palette.primary.main,
                        '&:hover': {
                            background: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.primary.main, 0.9)
                                : theme.palette.primary.dark,
                        }
                    }}
                >
                    <AddIcon />
                </Button>
            </ButtonGroup>
            
            <Typography 
                variant="subtitle2" 
                sx={{ 
                    color: 'text.secondary',
                    px: 2,
                    mt: 1
                }}
            >
                Your Channels
            </Typography>

            <List sx={{ p: 0 }}>
                <AnimatePresence>
                    {channels.map((channel, index) => (
                        <motion.div
                            key={channel.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleChannelSelect(channel)}
                                    sx={{
                                        borderRadius: 1,
                                        mb: 0.5,
                                        '&:hover': {
                                            background: theme.palette.mode === 'dark'
                                                ? alpha(theme.palette.primary.main, 0.1)
                                                : alpha(theme.palette.primary.main, 0.05),
                                        }
                                    }}
                                >
                                    <ListItemText 
                                        primary={channel.name}
                                        primaryTypographyProps={{
                                            variant: 'body1',
                                            fontWeight: 500,
                                        }}
                                    />
                                    {channel.visibility && (
                                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                                            <VisibilityOffIcon 
                                                sx={{ 
                                                    fontSize: 18,
                                                    color: 'text.secondary'
                                                }} 
                                            />
                                        </ListItemIcon>
                                    )}
                                </ListItemButton>
                            </ListItem>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </List>
        </Box>
    );
};

export default ChannelList;
