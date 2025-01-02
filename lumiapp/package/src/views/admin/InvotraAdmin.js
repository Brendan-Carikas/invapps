import React, { useState } from "react";
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
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthBackground } from "../../contexts/AuthBackgroundContext";
import LoginIcon from '@mui/icons-material/Login';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

const InvotraAdmin = () => {
  const { currentUser } = useAuth();
  const { 
    showBackground, 
    setShowBackground, 
    customImage, 
    setCustomImage,
    unsavedChanges, 
    saveChanges 
  } = useAuthBackground();

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

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                    label="Show Background Image"
                  />
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Toggle to show or hide the background image on login and signup screens
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Custom Background Image
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
                      <Box>
                        <Box
                          component="img"
                          src={customImage}
                          alt="Custom background"
                          sx={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: 1,
                            mb: 2,
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
                        <Typography variant="body2" color="text.secondary">
                          Click to upload a custom background image
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Recommended size: 1920x1080px
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={saveChanges}
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
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvotraAdmin;
