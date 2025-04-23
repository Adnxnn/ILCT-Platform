import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Slider, Typography, Card, CardContent, Tooltip, Divider } from '@mui/material';
import { 
    Brush as BrushIcon,
    Delete as DeleteIcon,
    Undo as UndoIcon,
    Redo as RedoIcon,
    ColorLens as ColorLensIcon,
    Create as PencilIcon
} from '@mui/icons-material';
import socket from '../../../../../utils/socket';

const DrawingJamboard = ({ canEdit }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [tool, setTool] = useState('brush'); // 'brush' or 'pencil'

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        // Set initial canvas size to match the container
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            
            // Redraw the canvas content after resize
            if (history.length > 0) {
                loadCanvasState(history[historyIndex]);
            } else {
                // Set initial canvas state
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);
                saveCanvasState();
            }
        };
        
        // Initial resize
        resizeCanvas();
        
        // Add resize listener
        window.addEventListener('resize', resizeCanvas);
        
        // Listen for drawing updates from other users
        socket.on('jamboard:draw', (data) => {
            if (!canEdit) {
                const { type, points, color, size } = data;
                if (type === 'draw') {
                    drawLine(points, color, size);
                } else if (type === 'clear') {
                    clearCanvas();
                }
            }
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            socket.off('jamboard:draw');
        };
    }, [canEdit]);

    const saveCanvasState = () => {
        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(imageData);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const drawLine = (points, lineColor, lineSize) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
        
        context.strokeStyle = lineColor;
        context.lineWidth = lineSize;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    };

    const startDrawing = (e) => {
        if (!canEdit) return;
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setIsDrawing(true);
        const context = canvas.getContext('2d');
        context.beginPath();
        context.moveTo(x, y);
    };

    const draw = (e) => {
        if (!isDrawing || !canEdit) return;
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const context = canvas.getContext('2d');
        context.lineTo(x, y);
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    };

    const stopDrawing = () => {
        if (!canEdit) return;
        
        setIsDrawing(false);
        saveCanvasState();
        
        // Emit drawing update to other users
        socket.emit('jamboard:draw', {
            type: 'draw',
            points: [{ x: 0, y: 0 }], // Simplified for example
            color,
            size: brushSize
        });
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        saveCanvasState();
        
        if (canEdit) {
            socket.emit('jamboard:draw', { type: 'clear' });
        }
    };

    const undo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            loadCanvasState(history[newIndex]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            loadCanvasState(history[newIndex]);
        }
    };

    const loadCanvasState = (imageData) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const img = new Image();
        img.src = imageData;
        img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
        };
    };

    const toggleTool = (newTool) => {
        setTool(newTool);
    };

    return (
        <Card sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
            <CardContent sx={{ flexGrow: 1, padding: 0, display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
                <Box sx={{ 
                    p: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    borderBottom: '1px solid', 
                    borderColor: 'divider', 
                    bgcolor: '#f5f5f5',
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Brush">
                            <IconButton 
                                onClick={() => toggleTool('brush')}
                                color={tool === 'brush' ? 'primary' : 'default'}
                                size="small"
                                sx={{ 
                                    color: tool === 'brush' ? '#1976d2' : '#333333',
                                    '&:hover': { backgroundColor: '#e3f2fd' }
                                }}
                            >
                                <BrushIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Pencil">
                            <IconButton 
                                onClick={() => toggleTool('pencil')}
                                color={tool === 'pencil' ? 'primary' : 'default'}
                                size="small"
                                sx={{ 
                                    color: tool === 'pencil' ? '#1976d2' : '#333333',
                                    '&:hover': { backgroundColor: '#e3f2fd' }
                                }}
                            >
                                <PencilIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: '#bdbdbd' }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Clear Canvas">
                            <IconButton 
                                onClick={clearCanvas}
                                disabled={!canEdit}
                                size="small"
                                sx={{ 
                                    color: '#d32f2f',
                                    '&:hover': { backgroundColor: '#ffebee' },
                                    '&.Mui-disabled': { color: '#bdbdbd' }
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Undo">
                            <IconButton 
                                onClick={undo}
                                disabled={historyIndex <= 0}
                                size="small"
                                sx={{ 
                                    color: '#2e7d32',
                                    '&:hover': { backgroundColor: '#e8f5e9' },
                                    '&.Mui-disabled': { color: '#bdbdbd' }
                                }}
                            >
                                <UndoIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Redo">
                            <IconButton 
                                onClick={redo}
                                disabled={historyIndex >= history.length - 1}
                                size="small"
                                sx={{ 
                                    color: '#2e7d32',
                                    '&:hover': { backgroundColor: '#e8f5e9' },
                                    '&.Mui-disabled': { color: '#bdbdbd' }
                                }}
                            >
                                <RedoIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: '#bdbdbd' }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Color">
                            <IconButton 
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                size="small"
                                sx={{ 
                                    color: '#9c27b0',
                                    '&:hover': { backgroundColor: '#f3e5f5' }
                                }}
                            >
                                <ColorLensIcon />
                            </IconButton>
                        </Tooltip>
                        {showColorPicker && (
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                style={{ width: 30, height: 30, padding: 0, border: 'none' }}
                            />
                        )}
                        <Typography sx={{ ml: 1, color: '#333333', fontWeight: 'medium' }}>Size:</Typography>
                        <Slider
                            value={brushSize}
                            onChange={(e, newValue) => setBrushSize(newValue)}
                            min={1}
                            max={20}
                            sx={{ 
                                width: 100,
                                color: '#1976d2',
                                '& .MuiSlider-thumb': {
                                    backgroundColor: '#1976d2',
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: '#1976d2',
                                }
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 1, position: 'relative', bgcolor: 'white' }}>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        style={{
                            width: '100%',
                            height: '100%',
                            cursor: canEdit ? 'crosshair' : 'default',
                            backgroundColor: 'white'
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default DrawingJamboard; 