import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#2c3e50',
            secondary: '#546e7a',
        },
    },
    typography: {
        fontFamily: '"JetBrains Mono", "Inter", monospace',
        h1: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h2: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '2rem',
        },
        h3: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h4: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h5: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            fontSize: '1.25rem',
        },
        h6: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            fontSize: '1rem',
        },
        body1: {
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '1rem',
            lineHeight: 1.7,
        },
        body2: {
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
        button: {
            fontFamily: '"Inter", sans-serif',
            textTransform: 'none',
            fontWeight: 500,
        },
        code: {
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.875rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

const darkTheme = createTheme({
    ...lightTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
        },
        secondary: {
            main: '#ce93d8',
            light: '#f3e5f5',
            dark: '#ab47bc',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
        },
    },
});

export { lightTheme, darkTheme };
