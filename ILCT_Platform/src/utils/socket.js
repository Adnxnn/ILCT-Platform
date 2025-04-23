import { io } from 'socket.io-client';

// Create socket connection
const socket = io('http://localhost:5000', {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

// Socket event handlers
socket.on('connect', () => {
    console.log('Connected to socket server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});

// Jamboard specific event handlers
socket.on('jamboard_update', (data) => {
    console.log('Received jamboard update:', data);
});

export default socket; 