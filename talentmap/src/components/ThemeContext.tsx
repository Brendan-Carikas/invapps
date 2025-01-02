// src/contexts/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  headingFont: string;
  setHeadingFont: (font: string) => void;
  bodyFont: string;
  setBodyFont: (font: string) => void;
  headingFontWeights: { [key: string]: number };
  setHeadingFontWeights: (weights: { [key: string]: number }) => void;
  pageTitleFontSize: string;
  setPageTitleFontSize: (size: string) => void;
  saveSettings: () => void;
  resetToDefaults: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'app-theme-settings';

// Default theme settings
const defaultSettings: {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  headingFont: string;
  bodyFont: string;
  headingFontWeights: { [key: string]: number };
  pageTitleFontSize: string;
} = {
  mode: 'light',
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  headingFont: 'Roboto',
  bodyFont: 'Roboto',
  headingFontWeights: {
    pageTitle: 700,
    h1: 700,
    h2: 600,
    h3: 600,
    h4: 500,
    h5: 500,
    h6: 500
  },
  pageTitleFontSize: '2rem'
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Load saved settings from localStorage or use defaults
  const loadSavedSettings = () => {
    const savedSettings = localStorage.getItem(THEME_STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  };

  const [mode, setMode] = useState<'light' | 'dark'>(loadSavedSettings().mode);
  const [primaryColor, setPrimaryColor] = useState(loadSavedSettings().primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(loadSavedSettings().secondaryColor);
  const [headingFont, setHeadingFont] = useState(loadSavedSettings().headingFont);
  const [bodyFont, setBodyFont] = useState(loadSavedSettings().bodyFont);
  const [headingFontWeights, setHeadingFontWeights] = useState(loadSavedSettings().headingFontWeights);
  const [pageTitleFontSize, setPageTitleFontSize] = useState(loadSavedSettings().pageTitleFontSize);

  // Save settings to localStorage
  const saveSettings = () => {
    const settings = {
      mode,
      primaryColor,
      secondaryColor,
      headingFont,
      bodyFont,
      headingFontWeights,
      pageTitleFontSize,
    };
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(settings));
  };

  const resetToDefaults = () => {
    setMode(defaultSettings.mode);
    setPrimaryColor(defaultSettings.primaryColor);
    setSecondaryColor(defaultSettings.secondaryColor);
    setHeadingFont(defaultSettings.headingFont);
    setBodyFont(defaultSettings.bodyFont);
    setHeadingFontWeights(defaultSettings.headingFontWeights);
    setPageTitleFontSize(defaultSettings.pageTitleFontSize);
  };

  // Auto-save settings when they change
  useEffect(() => {
    saveSettings();
  }, [mode, primaryColor, secondaryColor, headingFont, bodyFont, headingFontWeights, pageTitleFontSize]);

  const contextValue = {
    mode,
    setMode,
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    headingFont,
    setHeadingFont,
    bodyFont,
    setBodyFont,
    headingFontWeights,
    setHeadingFontWeights,
    pageTitleFontSize,
    setPageTitleFontSize,
    saveSettings,
    resetToDefaults
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};