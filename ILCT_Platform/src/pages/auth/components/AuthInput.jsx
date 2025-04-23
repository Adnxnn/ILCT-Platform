import React, { useState } from 'react';
import { 
  TextField,
  InputAdornment, 
  IconButton, 
  useTheme as useMuiTheme, 
  alpha,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AuthInput = ({ 
  icon, 
  name, 
  label, 
  value, 
  onChange, 
  type = 'text', 
  error = null, 
  required = false,
  fullWidth = true,
  ...props 
}) => {
  const theme = useMuiTheme();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine if this is a password field
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <TextField
      name={name}
      label={label}
      type={inputType}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth={fullWidth}
      required={required}
      error={!!error}
      helperText={error}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoComplete="off"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '42px',
        }
      }}
      InputProps={{
        startAdornment: icon && (
          <InputAdornment position="start">
            <motion.div 
              animate={{ 
                rotate: focused ? [0, -10, 10, -10, 10, 0] : 0,
                scale: focused ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
              style={{ 
                color: focused 
                  ? theme.palette.primary.main 
                  : theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.7)
                    : alpha(theme.palette.common.black, 0.6)
              }}
            >
              {React.cloneElement(icon, { sx: { fontSize: '20px' } })}
            </motion.div>
          </InputAdornment>
        ),
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <Tooltip title={showPassword ? "Hide password" : "Show password"}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                size="small"
                sx={{ 
                  color: focused ? 'primary.main' : 'text.secondary',
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                {showPassword ? <VisibilityOff sx={{ fontSize: '18px' }} /> : <Visibility sx={{ fontSize: '18px' }} />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        )
      }}
    />
  );
};

export default AuthInput; 