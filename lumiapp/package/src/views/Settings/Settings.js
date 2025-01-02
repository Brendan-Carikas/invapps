import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  IconButton,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const Settings = () => {
  const [appName, setAppName] = useState('My AI Assistant');
  const [instructions, setInstructions] = useState('');
  const [files, setFiles] = useState([]);
  const [logo, setLogo] = useState(null);
  const [whatsappDialogOpen, setWhatsappDialogOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [connectedNumber, setConnectedNumber] = useState('');

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toLocaleString(),
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved');
  };

  const handleWhatsappConnect = () => {
    setConnectedNumber(whatsappNumber);
    setWhatsappNumber('');
    setWhatsappDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 3, ml: 3 }}>
        Settings
      </Typography>
      
      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 'none', borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <WhatsAppIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
                <Typography variant="h4">General</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<WhatsAppIcon />}
                  sx={{ mb: 2, textTransform: 'none' }}
                  onClick={() => setWhatsappDialogOpen(true)}
                >
                  Connect WhatsApp Business
                </Button>
                {connectedNumber && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1 
                    }}
                  >
                    <WhatsAppIcon fontSize="small" />
                    Connected: {connectedNumber}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="App Name"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  variant="outlined"
                />
              </Box>
             
             
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  App Logo
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                  {logo ? (
                    <Box
                      component="img"
                      src={logo}
                      alt="App Logo"
                      sx={{ width: 100, height: 100, borderRadius: 1, objectFit: 'contain' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 1,
                        border: '1px dashed',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ImageIcon color="action" sx={{ fontSize: 40 }} />
                    </Box>
                  )}
                  <Button
                    component="label"
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                  >
                    Upload Logo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </Button>
                </Box>
              </Box>

              
            </CardContent>
          </Card>
        </Grid>

        {/* Instructions */}
        <Grid item xs={12}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 'none', borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <TextSnippetIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
                <Typography variant="h4">Instructions</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <TextField
                fullWidth
                multiline
                rows={4}
                label="AI Assistant Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                variant="outlined"
                placeholder="Enter instructions for the AI assistant..."
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Knowledge Base */}
        <Grid item xs={12}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 'none', borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <FolderOpenIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
                <Typography variant="h4">Knowledge Base</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Upload Files
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileUpload}
                  />
                </Button>
              </Box>

              <List>
                {files.map((file, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{ 
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 'none' }
                    }}
                  >
                    <ListItemText
                      primary={file.name}
                      secondary={`Uploaded ${file.uploadedAt}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* WhatsApp Connection Dialog */}
      <Dialog 
        open={whatsappDialogOpen} 
        onClose={() => setWhatsappDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Connect WhatsApp Business</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="WhatsApp Business Number"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="Enter your WhatsApp Business number"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setWhatsappDialogOpen(false)} 
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleWhatsappConnect}
            sx={{ textTransform: 'none' }}
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
