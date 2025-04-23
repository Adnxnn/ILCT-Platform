const socketIO = require('socket.io');

const setupSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('join-channel', (channelId) => {
            socket.join(channelId);
            console.log(`User joined channel: ${channelId}`);
        });

        socket.on('drawing', (data) => {
            socket.to(data.channelId).emit('drawing', data);
        });

        socket.on('clear', (data) => {
            socket.to(data.channelId).emit('clear', data);
        });

        socket.on('undo', (data) => {
            socket.to(data.channelId).emit('undo', data);
        });

        socket.on('redo', (data) => {
            socket.to(data.channelId).emit('redo', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};

module.exports = setupSocket; 