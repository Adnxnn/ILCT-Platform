const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const socketManager = require('./middleware/socketIo');
const authRoutes = require('./routes/authRoutes');
const channelRoutes = require('./routes/channelRoutes');
const messageRoutes = require('./routes/messageRoutes');
const jamboardRoutes = require('./routes/jamboardRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const port = 5000;

const expressServer = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

socketManager.init(expressServer)
const io = socketManager.getIO();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes)
app.use('/channel', channelRoutes)
app.use('/message', messageRoutes)
app.use('/jamboard', jamboardRoutes)
app.use('/files', fileRoutes)

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle receiving a code change from a client
    socket.on('code_change', (data) => {
        const { channel_id, code_update } = data;
        // Broadcast the changes to all other clients in the same channel
        socket.broadcast.emit('code_update', { channel_id, code_update });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});