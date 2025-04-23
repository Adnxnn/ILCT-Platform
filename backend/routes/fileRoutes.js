const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verifyToken = require('../middleware/verifyToken');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create channel-specific directory
        const channelDir = path.join(uploadDir, req.body.channelId || 'default');
        if (!fs.existsSync(channelDir)) {
            fs.mkdirSync(channelDir, { recursive: true });
        }
        cb(null, channelDir);
    },
    filename: function (req, file, cb) {
        // Create unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Upload single file
router.post('/upload', verifyToken, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        if (!req.body.channelId) {
            // Delete the uploaded file if no channel ID
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Channel ID is required' });
        }

        res.json({
            message: 'File uploaded successfully',
            file: {
                id: req.file.filename,
                filename: req.file.filename,
                originalname: req.file.originalname,
                size: req.file.size,
                path: `/uploads/${req.body.channelId}/${req.file.filename}`,
                uploadedAt: new Date()
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
});

// Get list of uploaded files for a channel
router.get('/list', verifyToken, (req, res) => {
    try {
        const channelId = req.query.channelId;
        if (!channelId) {
            return res.status(400).json({ error: 'Channel ID is required' });
        }

        const channelDir = path.join(uploadDir, channelId);
        if (!fs.existsSync(channelDir)) {
            return res.json({ files: [] });
        }

        const files = fs.readdirSync(channelDir).map(filename => {
            const filePath = path.join(channelDir, filename);
            const stats = fs.statSync(filePath);
            return {
                id: filename,
                filename: filename,
                originalname: filename.split('-').slice(2).join('-'), // Remove the timestamp prefix
                size: stats.size,
                path: `/uploads/${channelId}/${filename}`,
                uploadedAt: stats.mtime
            };
        });

        res.json({ files });
    } catch (error) {
        console.error('List files error:', error);
        res.status(500).json({ error: 'Error listing files' });
    }
});

// Download a file
router.get('/download/:channelId/:filename', verifyToken, (req, res) => {
    try {
        const { channelId, filename } = req.params;
        const filepath = path.join(uploadDir, channelId, filename);
        
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: 'File not found' });
        }
        
        res.download(filepath);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Error downloading file' });
    }
});

// Delete a file
router.delete('/delete/:channelId/:filename', verifyToken, (req, res) => {
    try {
        const { channelId, filename } = req.params;
        const filepath = path.join(uploadDir, channelId, filename);
        
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: 'File not found' });
        }
        
        fs.unlinkSync(filepath);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Error deleting file' });
    }
});

module.exports = router; 