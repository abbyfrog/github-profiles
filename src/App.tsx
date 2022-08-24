import React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Button, CssBaseline } from '@mui/material';
import { ProfileSearchView } from './views/ProfileSearch/ProfileSearchView';
import { getItemFromLocalStorage, updateLocalStorage } from './utils/localStorage';
import { styles } from './styles';

type ColourMode = 'light' | 'dark';

const COLOUR_MODE_KEY = 'colourMode';
const ColourModeContext = React.createContext({ toggleColourMode: () => {} });

const Views = () => {
  const theme = useTheme();
  const colourMode = React.useContext(ColourModeContext);
  return (
    <Box style={styles.splitRow}>
      <ProfileSearchView />
      <Button
        variant="contained"
        startIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        onClick={colourMode.toggleColourMode}
      >
        {theme.palette.mode === 'dark' ? 'Light' : 'Dark'} mode
      </Button>
    </Box>
  );
};

export const App = () => {
  const [colourMode, setColourMode] = React.useState<ColourMode>(
    (getItemFromLocalStorage(COLOUR_MODE_KEY) as ColourMode) ?? 'light',
  );
  const memoisedColourMode = React.useMemo(
    () => ({
      toggleColourMode: () => {
        setColourMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createTheme({ palette: { mode: colourMode } }), [colourMode]);

  React.useEffect(() => {
    updateLocalStorage({ key: COLOUR_MODE_KEY, value: colourMode });
  }, [colourMode]);

  return (
    <ColourModeContext.Provider value={memoisedColourMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Views />
      </ThemeProvider>
    </ColourModeContext.Provider>
  );
};
