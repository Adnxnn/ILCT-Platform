const express = require('express');
const http = require('http');
const cors = require('cors');
const setupSocket = require('./socket');

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = setupSocket(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes'));

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 