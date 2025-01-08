import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { baseTheme } from '../assets/global/Theme-variable';
import modernTheme from '../assets/global/Theme-modern';
import darkTheme from '../assets/global/Theme-dark';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const THEME_KEY = 'selected_theme';

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme || 'core';
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const themes = {
    core: baseTheme,
    modern: modernTheme,
    dark: darkTheme
  };

  const handleThemeChange = (newTheme) => {
    if (themes[newTheme]) {
      setCurrentTheme(newTheme);
      setUnsavedChanges(true);
    }
  };

  const saveTheme = () => {
    localStorage.setItem(THEME_KEY, currentTheme);
    setUnsavedChanges(false);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const theme = themes[currentTheme] || themes.core;

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      handleThemeChange,
      unsavedChanges,
      saveTheme
    }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
