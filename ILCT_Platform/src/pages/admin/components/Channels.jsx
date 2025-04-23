import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Chip,
  TextField,
  InputAdornment,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  Chat as ChatIcon,
  Group as GroupIcon,
  DataSaverOn as DataIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock data for channels
const createMockChannels = () => {
  const types = ['public', 'private'];
  const statuses = ['active', 'archived'];
  
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Channel ${i + 1}`,
    description: `This is a description for Channel ${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    members: Math.floor(Math.random() * 100) + 1,
    messages: Math.floor(Math.random() * 1000) + 1,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
  }));
};

// Mock data for content
const createMockContent = () => {
  const types = ['jamboard', 'note', 'calendar'];
  const statuses = ['active', 'archived'];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Content ${i + 1}`,
    channelName: `Channel ${Math.floor(Math.random() * 10) + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdBy: `User ${Math.floor(Math.random() * 20) + 1}`,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    lastModified: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
  }));
};

const ChannelStats = () => {
  const theme = useTheme();
  
  const stats = [
    { title: 'Total Channels', value: '186', icon: <ChatIcon />, color: theme.palette.primary.main },
    { title: 'Active Users', value: '1,245', icon: <GroupIcon />, color: theme.palette.success.main },
    { title: 'Total Content', value: '3,892', icon: <DataIcon />, color: theme.palette.info.main }
  ];
  
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            sx={{
              borderRadius: 2,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
                : '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
              height: '100%'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: '12px', 
                    background: alpha(stat.color, 0.1),
                    color: stat.color
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const Channels = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openChannelDialog, setOpenChannelDialog] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channels] = useState(createMockChannels());
  const [content] = useState(createMockContent());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleAddChannel = () => {
    setSelectedChannel(null);
    setOpenChannelDialog(true);
  };

  const handleEditItem = () => {
    if (tabValue === 0) {
      const channel = channels.find(c => c.id === selectedId);
      setSelectedChannel(channel);
      setOpenChannelDialog(true);
    } else {
      // Handle content edit
      console.log('Edit content', selectedId);
    }
    handleMenuClose();
  };

  const handleDeleteItem = () => {
    // Implement delete functionality
    console.log('Delete item', selectedId);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenChannelDialog(false);
  };

  const handleSubmit = () => {
    // Handle create/update logic
    console.log('Save channel', selectedChannel);
    setOpenChannelDialog(false);
  };

  // Filter and sort data
  const filterData = (data) => {
    const filtered = data.filter(item => {
      const matchesSearch = 
        (item.name?.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (item.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.title?.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // Convert timestamps to Date objects for comparison
      if (sortConfig.key.includes('At') || sortConfig.key.includes('Modified') || sortConfig.key.includes('Active')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
  };

  const filteredChannels = filterData(channels);
  const filteredContent = filterData(content);
  
  const currentData = tabValue === 0 ? filteredChannels : filteredContent;
  const paginatedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return theme.palette.success.main;
      case 'archived':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'public':
        return <PublicIcon fontSize="small" />;
      case 'private':
        return <LockIcon fontSize="small" />;
      case 'jamboard':
        return <EditIcon fontSize="small" />;
      case 'note':
        return <DataIcon fontSize="small" />;
      case 'calendar':
        return <ChatIcon fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ pb: 3 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 4
        }}
        component={motion.div}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {tabValue === 0 ? 'Channel Management' : 'Content Management'}
        </Typography>
        
        {tabValue === 0 && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddChannel}
            sx={{
              borderRadius: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #1976D2 30%, #0BACF3 90%)'
                  : 'linear-gradient(45deg, #0d47a1 30%, #1976d2 90%)',
              }
            }}
          >
            Add Channel
          </Button>
        )}
      </Box>

      <ChannelStats />

      <Paper 
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
            : '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
          mb: 3
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.6)
              : alpha(theme.palette.background.paper, 0.3),
          }}
          TabIndicatorProps={{
            style: {
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)'
                : 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
              height: 3,
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Tab 
            label="Channels" 
            sx={{ 
              fontWeight: tabValue === 0 ? 600 : 400,
              color: tabValue === 0 ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main) : 'inherit'
            }} 
          />
          <Tab 
            label="Content" 
            sx={{ 
              fontWeight: tabValue === 1 ? 600 : 400,
              color: tabValue === 1 ? (theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main) : 'inherit'
            }} 
          />
        </Tabs>

        <Box 
          sx={{ 
            display: 'flex', 
            p: 2, 
            justifyContent: 'space-between',
            alignItems: 'center',
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.6)
              : alpha(theme.palette.background.paper, 0.3),
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          <TextField
            variant="outlined"
            placeholder={tabValue === 0 ? "Search channels..." : "Search content..."}
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 1 }}>            
            <Tooltip title="Refresh">
              <IconButton>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="medium">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 600 } }}>
                {tabValue === 0 ? (
                  // Channels table headers
                  <>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('name')}>
                        Channel Name {getSortIcon('name')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('type')}>
                        Type {getSortIcon('type')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('members')}>
                        Members {getSortIcon('members')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('messages')}>
                        Messages {getSortIcon('messages')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('status')}>
                        Status {getSortIcon('status')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('createdAt')}>
                        Created {getSortIcon('createdAt')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('lastActive')}>
                        Last Active {getSortIcon('lastActive')}
                      </Box>
                    </TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </>
                ) : (
                  // Content table headers
                  <>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('title')}>
                        Title {getSortIcon('title')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('channelName')}>
                        Channel {getSortIcon('channelName')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('type')}>
                        Type {getSortIcon('type')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('createdBy')}>
                        Created By {getSortIcon('createdBy')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('status')}>
                        Status {getSortIcon('status')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('createdAt')}>
                        Created {getSortIcon('createdAt')}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort('lastModified')}>
                        Last Modified {getSortIcon('lastModified')}
                      </Box>
                    </TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: alpha(theme.palette.primary.main, 0.05) 
                    } 
                  }}
                >
                  {tabValue === 0 ? (
                    // Channels table rows
                    <>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTypeIcon(item.type)}
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={item.type.charAt(0).toUpperCase() + item.type.slice(1)} 
                          size="small"
                          sx={{ 
                            backgroundColor: item.type === 'public' 
                              ? alpha(theme.palette.info.main, 0.1)
                              : alpha(theme.palette.warning.main, 0.1),
                            color: item.type === 'public' 
                              ? theme.palette.info.main
                              : theme.palette.warning.main,
                            fontWeight: 500,
                            borderRadius: 1
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.members}</TableCell>
                      <TableCell>{item.messages}</TableCell>
                      <TableCell>
                        <Chip 
                          label={item.status.charAt(0).toUpperCase() + item.status.slice(1)} 
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(getStatusColor(item.status), 0.1),
                            color: getStatusColor(item.status),
                            fontWeight: 500,
                            borderRadius: 1
                          }}
                        />
                      </TableCell>
                      <TableCell>{formatDate(item.createdAt)}</TableCell>
                      <TableCell>{formatDate(item.lastActive)}</TableCell>
                    </>
                  ) : (
                    // Content table rows
                    <>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTypeIcon(item.type)}
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.channelName}</TableCell>
                      <TableCell>
                        <Chip 
                          label={item.type.charAt(0).toUpperCase() + item.type.slice(1)} 
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(theme.palette.info.main, 0.1),
                            color: theme.palette.info.main,
                            fontWeight: 500,
                            borderRadius: 1
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.createdBy}</TableCell>
                      <TableCell>
                        <Chip 
                          label={item.status.charAt(0).toUpperCase() + item.status.slice(1)} 
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(getStatusColor(item.status), 0.1),
                            color: getStatusColor(item.status),
                            fontWeight: 500,
                            borderRadius: 1
                          }}
                        />
                      </TableCell>
                      <TableCell>{formatDate(item.createdAt)}</TableCell>
                      <TableCell>{formatDate(item.lastModified)}</TableCell>
                    </>
                  )}
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Tooltip title="View">
                        <IconButton size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMenuOpen(e, item.id)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          component="div"
          count={currentData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 130,
            borderRadius: 2,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
          }
        }}
      >
        <MenuItem onClick={handleEditItem}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteItem} sx={{ color: theme.palette.error.main }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog 
        open={openChannelDialog} 
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.2)',
          }
        }}
      >
        <DialogTitle>
          {selectedChannel ? 'Edit Channel' : 'Add New Channel'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Channel Name"
              fullWidth
              variant="outlined"
              defaultValue={selectedChannel?.name || ''}
              required
            />
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              defaultValue={selectedChannel?.description || ''}
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                defaultValue={selectedChannel?.type || 'public'}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                defaultValue={selectedChannel?.status || 'active'}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleDialogClose} color="inherit">Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }}
          >
            {selectedChannel ? 'Save Changes' : 'Add Channel'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Channels; 