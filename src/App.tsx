import React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { CssBaseline } from '@mui/material';
import { ProfileSearchView } from './views/ProfileSearch/ProfileSearchView';

const ColourModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colourMode = React.useContext(ColourModeContext);
  return (
    <Box>
      Switch to {theme.palette.mode === 'dark' ? 'light' : 'dark'} mode
      <IconButton sx={{ ml: 1 }} onClick={colourMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <ProfileSearchView />
    </Box>
  );
}

export const App = () => {
  const [isInDarkMode, toggleDarkMode] = React.useState<boolean>(false);
  const colourMode = React.useMemo(() => ({ toggleColorMode: () => toggleDarkMode(!isInDarkMode) }), [isInDarkMode]);

  const theme = React.useMemo(
    () => createTheme({ palette: { mode: isInDarkMode ? 'dark' : 'light' } }),
    [isInDarkMode],
  );

  return (
    <ColourModeContext.Provider value={colourMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyApp />
      </ThemeProvider>
    </ColourModeContext.Provider>
  );
};
