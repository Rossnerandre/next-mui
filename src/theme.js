import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    default: {
      light: '#fff',
      main: '#e5e5e5',
      dark: '#ccc',
    },
    primary: {
      light: '#5381ED',
      main: '#556cd6',
      dark: '#535DED',
    },
    secondary: {
      light: '#2f9188',
      main: '#19857b',
      dark: '#16776e',
    },
    error: {
      light: '#e57373',
      main: red.A400,
      dark: '#d32f2f'
    },
    warning: {
      light: '#ffb74d',
      main: '#ffa726',
      dark: '#f57c00',
    },
    info: {
      light: '#4fc3f7',
      main: '#29b6f6',
      dark: '#0288d1',
    },
    success: {
      light: '#81c784',
      main: '#66bb6a',
      dark: '#388e3c',
    },
    text: {
      white: '#fff',
      black: '#333',
      dark: '#000',
    },
  },
});

export default theme;
