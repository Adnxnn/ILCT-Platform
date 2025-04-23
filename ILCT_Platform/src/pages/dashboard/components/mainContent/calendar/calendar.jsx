import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Tooltip,
    Menu,
    MenuItem,
    useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
    const theme = useTheme();
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openDialog, setOpenDialog] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: new Date(),
        notes: "",
    });
    const [contextMenu, setContextMenu] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleAddEvent = () => {
        if (newEvent.title && newEvent.date) {
            setEvents([...events, { ...newEvent, id: Date.now() }]);
            setNewEvent({ title: "", date: new Date(), notes: "" });
            setOpenDialog(false);
        }
    };

    const handleDeleteEvent = (eventId) => {
        setEvents(events.filter((event) => event.id !== eventId));
        setContextMenu(null);
    };

    const handleContextMenu = (event, eventItem) => {
        event.preventDefault();
        setSelectedEvent(eventItem);
        setContextMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const getEventsForDate = (date) => {
        return events.filter(
            (event) =>
                event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear()
        );
    };

    const upcomingEvents = events
        .filter((event) => event.date >= new Date())
        .sort((a, b) => a.date - b.date)
        .slice(0, 5);

    return (
        <Box
            sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        background: "linear-gradient(45deg, #2196F3, #00BCD4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                    }}
                >
                    Calendar
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{
                        background: "linear-gradient(45deg, #2196F3, #00BCD4)",
                        "&:hover": {
                            background: "linear-gradient(45deg, #1976D2, #0097A7)",
                        },
                    }}
                >
                    Add Event
                </Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    height: "calc(100% - 100px)",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <CalendarTodayIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="h6">Date Picker</Typography>
                    </Box>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        inline
                        className="custom-datepicker"
                    />
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Events for {selectedDate.toLocaleDateString()}
                        </Typography>
                        <List>
                            {getEventsForDate(selectedDate).map((event) => (
                                <ListItem
                                    key={event.id}
                                    onContextMenu={(e) => handleContextMenu(e, event)}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={event.title}
                                        secondary={event.notes}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleDeleteEvent(event.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        width: "300px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <EventIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="h6">Upcoming Events</Typography>
                    </Box>
                    <List>
                        {upcomingEvents.map((event) => (
                            <ListItem
                                key={event.id}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={event.title}
                                    secondary={event.date.toLocaleDateString()}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                        <TextField
                            label="Event Title"
                            value={newEvent.title}
                            onChange={(e) =>
                                setNewEvent({ ...newEvent, title: e.target.value })
                            }
                            fullWidth
                        />
                        <DatePicker
                            selected={newEvent.date}
                            onChange={(date) => setNewEvent({ ...newEvent, date })}
                            dateFormat="MMMM d, yyyy"
                            className="custom-datepicker"
                        />
                        <TextField
                            label="Notes"
                            value={newEvent.notes}
                            onChange={(e) =>
                                setNewEvent({ ...newEvent, notes: e.target.value })
                            }
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddEvent} variant="contained">
                        Add Event
                    </Button>
                </DialogActions>
            </Dialog>

            <Menu
                open={contextMenu !== null}
                onClose={handleCloseContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={() => handleDeleteEvent(selectedEvent?.id)}>
                    <DeleteIcon sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Calendar;
