import React, { createContext, useContext, useState, useEffect } from 'react';

const AUTH_BG_KEY = 'auth_background_visible';
const AUTH_BG_IMAGE_KEY = 'auth_background_image';
const AuthBackgroundContext = createContext();

export function useAuthBackground() {
  const context = useContext(AuthBackgroundContext);
  if (!context) {
    throw new Error('useAuthBackground must be used within an AuthBackgroundProvider');
  }
  return context;
}

export function AuthBackgroundProvider({ children }) {
  const [showBackground, setShowBackground] = useState(() => {
    const saved = localStorage.getItem(AUTH_BG_KEY);
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [customImage, setCustomImage] = useState(() => {
    const saved = localStorage.getItem(AUTH_BG_IMAGE_KEY);
    return saved || null;
  });
  
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  const handleShowBackgroundChange = (newValue) => {
    setShowBackground(newValue);
    setUnsavedChanges(true);
  };

  const handleCustomImageChange = (newValue) => {
    setCustomImage(newValue);
    setUnsavedChanges(true);
  };
  
  const saveChanges = () => {
    localStorage.setItem(AUTH_BG_KEY, JSON.stringify(showBackground));
    if (customImage) {
      localStorage.setItem(AUTH_BG_IMAGE_KEY, customImage);
    } else {
      localStorage.removeItem(AUTH_BG_IMAGE_KEY);
    }
    setUnsavedChanges(false);
  };

  // Load initial values from localStorage
  useEffect(() => {
    const savedVisibility = localStorage.getItem(AUTH_BG_KEY);
    const savedImage = localStorage.getItem(AUTH_BG_IMAGE_KEY);
    
    if (savedVisibility !== null) {
      setShowBackground(JSON.parse(savedVisibility));
    }
    if (savedImage !== null) {
      setCustomImage(savedImage);
    }
  }, []);

  const value = {
    showBackground,
    setShowBackground: handleShowBackgroundChange,
    customImage,
    setCustomImage: handleCustomImageChange,
    unsavedChanges,
    saveChanges,
  };

  return (
    <AuthBackgroundContext.Provider value={value}>
      {children}
    </AuthBackgroundContext.Provider>
  );
}
