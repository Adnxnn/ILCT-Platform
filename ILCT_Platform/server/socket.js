const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://ilct-platform.kesug.com"], // Both development and production URLs
        methods: ["GET", "POST"]
    }
});

// Store active jamboard sessions
const activeJamboards = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle joining a jamboard room
    socket.on('join_jamboard', ({ channel_id }) => {
        const room = `jamboard_${channel_id}`;
        socket.join(room);
        console.log(`User ${socket.id} joined jamboard room: ${room}`);

        // Initialize or get existing jamboard content
        if (!activeJamboards.has(room)) {
            activeJamboards.set(room, '');
        }

        // Send current content to the new user
        socket.emit('jamboard_update', {
            channel_id,
            code: activeJamboards.get(room)
        });
    });

    // Handle leaving a jamboard room
    socket.on('leave_jamboard', ({ channel_id }) => {
        const room = `jamboard_${channel_id}`;
        socket.leave(room);
        console.log(`User ${socket.id} left jamboard room: ${room}`);
    });

    // Handle code changes in the jamboard
    socket.on('jamboard_change', (data) => {
        const { channel_id, code } = data;
        const room = `jamboard_${channel_id}`;

        // Update the stored content
        activeJamboards.set(room, code);

        // Broadcast the change to all users in the room except the sender
        socket.to(room).emit('jamboard_update', {
            channel_id,
            code
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Socket server running on port ${PORT}`);
});

module.exports = { io, server }; 