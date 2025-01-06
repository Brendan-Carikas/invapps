import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Stack,
  IconButton,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuthBackground } from "../../contexts/AuthBackgroundContext";
import LoginIcon from '@mui/icons-material/Login';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PaletteIcon from '@mui/icons-material/Palette';

const InvotraAdmin = () => {
  const { currentUser } = useAuth();
  const { currentTheme, setTheme, unsavedChanges, saveTheme } = useTheme();
  const { 
    showBackground, 
    setShowBackground,
    customImage, 
    setCustomImage,
    isModal,
    setIsModal,
    isTwoColumn,
    setIsTwoColumn,
    unsavedChanges: backgroundUnsavedChanges,
    saveChanges: saveBackgroundChanges 
  } = useAuthBackground();

  const themeOptions = [
    { value: 'core', label: 'Core Theme' },
    { value: 'modern', label: 'Modern Theme' },
    { value: 'dark', label: 'Dark Theme' },
  ];

  const [selectedOption, setSelectedOption] = React.useState(() => {
    if (showBackground && !isModal && !isTwoColumn) return 'background';
    if (showBackground && !isModal && isTwoColumn) return 'twocolumn';
    if (showBackground && isModal) return 'alignleft';
    return 'none';
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === 'background') {
      setShowBackground(true);
      setIsModal(false);
      setIsTwoColumn(false);
    } else if (option === 'alignleft') {
      setShowBackground(true);
      setIsModal(true);
      setIsTwoColumn(false);
    } else if (option === 'twocolumn') {
      setShowBackground(true);
      setIsModal(false);
      setIsTwoColumn(true);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h2" gutterBottom sx={{ mb: 2 }}>
        Admin Panel
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LoginIcon color="primary" sx={{ width: 32, height: 32, mr: 2 }} />
                <Typography variant="h5">Login/Signup Settings</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Stack spacing={3}>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showBackground}
                        onChange={(e) => setShowBackground(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Show Image"
                  />
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Toggle to show or hide image on login and signup screens
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Preview
                  </Typography>
                  <Box 
                    sx={{ 
                      border: '2px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 3,
                      textAlign: 'center',
                      bgcolor: 'background.default',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                      }}
                    />
                    {customImage ? (
                      <Box sx={{ maxWidth: '400px', margin: '0 auto' }}>
                        <Box
                          component="img"
                          src={customImage}
                          alt="Custom background"
                          sx={{
                            width: '100%',
                            aspectRatio: '4/3',
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                        <IconButton
                          color="error"
                          onClick={() => setCustomImage(null)}
                          sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box>
                        <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                        <Typography variant="body2" color="textSecondary">
                          Click to upload a custom background image
                        </Typography>
                        <Typography variant="caption" color="textSecondary" display="block">
                          Recommended size: 1920x1080px
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Radio 
                      checked={showBackground && !isModal && !isTwoColumn}
                      onChange={() => {
                        setShowBackground(true);
                        setIsModal(false);
                        setIsTwoColumn(false);
                      }}
                    />
                    Background style
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Radio 
                      checked={isModal}
                      onChange={() => {
                        setShowBackground(false);
                        setIsModal(true);
                        setIsTwoColumn(false);
                      }}
                    />
                    Modal style
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Radio 
                      checked={isTwoColumn}
                      onChange={() => {
                        setShowBackground(true);
                        setIsModal(false);
                        setIsTwoColumn(true);
                      }}
                    />
                    Two column
                  </Typography>
                </Box>

                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={saveBackgroundChanges}
                    disabled={!backgroundUnsavedChanges}
                  >
                    Save Changes
                  </Button>
                  {backgroundUnsavedChanges && (
                    <Typography variant="caption" color="warning.main" sx={{ ml: 2 }}>
                      You have unsaved changes
                    </Typography>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Theme Selection Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <IconButton color="primary" sx={{ width: 32, height: 32, mr: 2 }}>
                  <PaletteIcon />
                </IconButton>
                <Typography variant="h5">Theme Settings</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <RadioGroup
                aria-label="theme"
                name="theme"
                value={currentTheme}
                onChange={handleThemeChange}
              >
                {themeOptions.map((option) => (
                  <FormControlLabel 
                    key={option.value}
                    value={option.value} 
                    control={<Radio />} 
                    label={option.label}
                    sx={{ mb: 2 }}
                  />
                ))}
              </RadioGroup>
              
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={saveTheme}
                  disabled={!unsavedChanges}
                >
                  Save Changes
                </Button>
                {unsavedChanges && (
                  <Typography variant="caption" color="warning.main" sx={{ ml: 2 }}>
                    You have unsaved changes
                  </Typography>
                )}
              </Box>
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Select your preferred theme style. Changes will be saved and persisted.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvotraAdmin;
