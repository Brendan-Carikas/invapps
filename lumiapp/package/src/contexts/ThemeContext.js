import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { baseTheme } from '../assets/global/Theme-variable';
import modernTheme from '../assets/global/Theme-modern';
import darkTheme from '../assets/global/Theme-dark';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('core');

  const getTheme = (themeName) => {
    switch (themeName) {
      case 'modern':
        return modernTheme;
      case 'dark':
        return darkTheme;
      default:
        return baseTheme;
    }
  };

  const value = {
    currentTheme,
    setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={getTheme(currentTheme)}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
