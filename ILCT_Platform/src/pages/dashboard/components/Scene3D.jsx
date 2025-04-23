import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Text, Html, Float, Stars } from '@react-three/drei';
import { Box, Typography, useTheme, alpha, IconButton, Tooltip, Dialog, Paper } from '@mui/material';
import { 
  Code as CodeIcon,
  Build as BuildIcon,
  Analytics as AnalyticsIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Dashboard as DashboardIcon,
  NoteAlt as NoteAltIcon,
  Folder as FolderIcon,
  CalendarMonth as CalendarIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import Jamboard from "./mainContent/jamboard/jamboard";
import Notes from './mainContent/notes/notes';
import Files from './mainContent/files/files';
import Calendar from './mainContent/calendar/calendar';
import Tasks from './mainContent/tasks/tasks';

// Interactive Tool component with enhanced visuals
function InteractiveTool({ position, icon, label, color, onClick, isActive }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
      meshRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group position={position}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={isActive || hovered ? color : '#000000'}
            emissiveIntensity={isActive ? 0.8 : hovered ? 0.5 : 0}
            transparent
            opacity={0.9}
          />
        </mesh>
        <Html position={[0, 0.8, 0]} center>
          <Paper
            elevation={isActive ? 8 : 4}
            sx={{
              p: 1,
              borderRadius: 2,
              background: alpha(color, isActive ? 0.2 : 0.1),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(color, 0.3)}`,
              transform: `scale(${hovered ? 1.1 : 1})`,
              transition: 'all 0.3s ease',
            }}
          >
            <Tooltip title={label} placement="top">
              <IconButton
                sx={{
                  color: 'white',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {icon}
              </IconButton>
            </Tooltip>
          </Paper>
        </Html>
      </group>
    </Float>
  );
}

// AI Bot Robot component with enhanced visuals
function AIBot() {
  const theme = useTheme();
  const robotRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const audioRef = useRef(new Audio('/audio/welcome.mp3'));
  
  useEffect(() => {
    audioRef.current.play().catch(error => {
      console.log("Audio playback failed:", error);
    });
  }, []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (robotRef.current) {
      robotRef.current.position.y = 1 + Math.sin(time) * 0.2;
      robotRef.current.rotation.y = time * 0.5;
    }
    
    if (leftArmRef.current && rightArmRef.current) {
      const armWave = Math.sin(time * 2) * 0.2;
      leftArmRef.current.rotation.x = Math.PI / 4 + armWave;
      rightArmRef.current.rotation.x = -Math.PI / 4 - armWave;
    }
  });
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group position={[0, 1, -3]}>
        <group ref={robotRef}>
          {/* Head with glowing effect */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshPhysicalMaterial
              color={theme.palette.primary.main}
              metalness={0.9}
              roughness={0.1}
              emissive={theme.palette.primary.main}
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Eyes with pulsing effect */}
          <mesh position={[-0.2, 0.8, 0.41]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshPhysicalMaterial
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={2}
            />
          </mesh>
          <mesh position={[0.2, 0.8, 0.41]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshPhysicalMaterial
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={2}
            />
          </mesh>

          {/* Body with metallic effect */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 1.2, 0.6]} />
            <meshPhysicalMaterial
              color={theme.palette.primary.main}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Arms with metallic effect */}
          <group ref={leftArmRef} position={[-0.8, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshPhysicalMaterial
                color={theme.palette.primary.main}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>

          <group ref={rightArmRef} position={[0.8, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshPhysicalMaterial
                color={theme.palette.primary.main}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>

          {/* Legs with metallic effect */}
          <mesh position={[-0.3, -1.1, 0]}>
            <boxGeometry args={[0.3, 1, 0.3]} />
            <meshPhysicalMaterial
              color={theme.palette.primary.main}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[0.3, -1.1, 0]}>
            <boxGeometry args={[0.3, 1, 0.3]} />
            <meshPhysicalMaterial
              color={theme.palette.primary.main}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// Room component with enhanced visuals
function Room() {
  const theme = useTheme();
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);

  const tools = [
    { 
      icon: <DashboardIcon />, 
      label: 'Jamboard', 
      color: '#2196f3', 
      position: [-4, 2, -2],
      component: <Jamboard />
    },
    { 
      icon: <NoteAltIcon />, 
      label: 'Notes', 
      color: '#9c27b0', 
      position: [-2, 2, -2],
      component: <Notes />
    },
    { 
      icon: <FolderIcon />, 
      label: 'Files', 
      color: '#ff9800', 
      position: [0, 2, -2],
      component: <Files />
    },
    { 
      icon: <CalendarIcon />, 
      label: 'Calendar', 
      color: '#4caf50', 
      position: [2, 2, -2],
      component: <Calendar />
    },
    { 
      icon: <AssignmentIcon />, 
      label: 'Tasks', 
      color: '#f44336', 
      position: [4, 2, -2],
      component: <Tasks />
    }
  ];

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setActiveComponent(tool.component);
  };

  return (
    <group>
      {/* Background stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />

      {/* Floor with gradient material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial
          color={theme.palette.mode === 'dark' ? '#1a1a1a' : '#f0f0f0'}
          metalness={0.2}
          roughness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Walls with modern look */}
      <mesh position={[0, 2, -10]}>
        <planeGeometry args={[20, 8]} />
        <meshPhysicalMaterial
          color={theme.palette.mode === 'dark' ? '#2a2a2a' : '#ffffff'}
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 8]} />
        <meshPhysicalMaterial
          color={theme.palette.mode === 'dark' ? '#2a2a2a' : '#ffffff'}
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 8]} />
        <meshPhysicalMaterial
          color={theme.palette.mode === 'dark' ? '#2a2a2a' : '#ffffff'}
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Ceiling with subtle glow */}
      <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial
          color={theme.palette.mode === 'dark' ? '#1a1a1a' : '#f8f8f8'}
          emissive={theme.palette.mode === 'dark' ? '#2a2a2a' : '#ffffff'}
          emissiveIntensity={0.2}
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Interactive Tools */}
      {tools.map((tool, index) => (
        <InteractiveTool
          key={index}
          position={tool.position}
          icon={tool.icon}
          label={tool.label}
          color={tool.color}
          onClick={() => handleToolClick(tool)}
          isActive={selectedTool === tool}
        />
      ))}
      
      {/* Enhanced lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, 10, -5]} intensity={0.8} />
      <spotLight
        position={[0, 8, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={0.8}
        castShadow
      />

      {/* Add AIBot to the room */}
      <AIBot />
    </group>
  );
}

const Scene3D = () => {
  const theme = useTheme();
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100vh', 
      position: 'relative',
      bgcolor: theme.palette.mode === 'dark' ? '#000' : '#fff',
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 10], fov: 70 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={5}
            maxDistance={15}
          />
          <Room />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Active Component Dialog */}
      <Dialog
        open={!!activeComponent}
        onClose={() => setActiveComponent(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh',
            maxHeight: '800px',
            borderRadius: 3,
            background: theme.palette.mode === 'dark' 
              ? 'rgba(18, 18, 18, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          }
        }}
      >
        {activeComponent}
      </Dialog>
    </Box>
  );
};

export default Scene3D; 