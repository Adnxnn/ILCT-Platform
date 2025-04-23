import React, { useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    Button,
    IconButton,
    Tooltip,
    useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileUpload from './FileUpload';
import FileList from './FileList';
import { useChannel } from '../../context/channelContent';

const Files = () => {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();
    const { selectedChannel } = useChannel();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (!selectedChannel) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                    Please select a channel to view files
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper
                sx={{
                    p: 2,
                    mb: 2,
                    background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(0, 188, 212, 0.1))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 3,
                }}
            >
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Files in {selectedChannel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Upload and manage files in this channel
            </Typography>
            </Paper>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    mb: 2,
                    '& .MuiTab-root': {
                        minWidth: 'auto',
                        px: 3,
                        py: 1,
                        color: 'text.secondary',
                        '&.Mui-selected': {
                            color: 'primary.main',
                        },
                    },
                    '& .MuiTabs-indicator': {
                        background: 'linear-gradient(45deg, #2196F3, #00BCD4)',
                    },
                                    }}
                                >
                <Tab label="Files" />
                <Tab label="Upload" />
            </Tabs>

            <Box sx={{ flex: 1, overflow: 'auto' }}>
                {activeTab === 0 ? (
                    <FileList />
                ) : (
                    <FileUpload />
                )}
            </Box>
        </Box>
    );
};

export default Files;
