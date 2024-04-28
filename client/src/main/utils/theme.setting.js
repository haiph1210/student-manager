// theme.js

import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
        },
        secondary: {
            main: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
        },
    },
});
