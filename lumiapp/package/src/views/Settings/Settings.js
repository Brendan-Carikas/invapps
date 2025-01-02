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
  ListItemSecondaryAction,
  IconButton,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen1, setDialogOpen1] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleLogoRemove = () => {
    setLogo(null);
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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen1 = () => {
    setDialogOpen1(true);
  };

  const handleDialogClose1 = () => {
    setDialogOpen1(false);
  };

  const handleDialogOpen2 = () => {
    setDialogOpen2(true);
  };

  const handleDialogClose2 = () => {
    setDialogOpen2(false);
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
                      sx={{ width: 440, height: 80, borderRadius: 1, objectFit: 'contain' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 440,
                        height: 80,
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
                    component={logo ? "button" : "label"}
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                    onClick={logo ? handleLogoRemove : undefined}
                  >
                    {logo ? 'Remove image' : 'Upload image'}
                    {!logo && (
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                    )}
                  </Button>
                  <Typography variant="caption" color="textSecondary">
                    Recommended size: 220px (maximum width) x 40px (minimum height) pixels. PNG or JPG format.
                  </Typography>
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
                <Typography variant="h4">Instructions for AI Assistant</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              
              
              

              <Box sx={{ mb: 3 }}>
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="h5">
                    Core purpose
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Instructions"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      variant="outlined"
                      placeholder="Enter instructions for the AI assistant..."
                      sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                      
                      <Button variant="text" onClick={handleDialogOpen}>Show example</Button>
                    </Box>
                  </AccordionDetails>
                  
                </Accordion>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="h5">
                    Style and tone
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Instructions"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      variant="outlined"
                      placeholder="Enter instructions for the AI assistant..."
                      sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                      
                      <Button variant="text" onClick={handleDialogOpen1}>Show example</Button>
                    </Box>
                  </AccordionDetails>
                  
                </Accordion>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="h5">
                    Technical and troubleshooting
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Instructions"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      variant="outlined"
                      placeholder="Enter instructions for the AI assistant..."
                      sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                      
                      <Button variant="text" onClick={handleDialogOpen2}>Show example</Button>
                    </Box>
                  </AccordionDetails>
                  
                </Accordion>
              </Box>


              

              

             

              
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
              <Typography variant="h6">If you upload files under Knowledge base, conversations with your AI assistant will include file contents. 
              </Typography>
              


              <Box sx={{ mt: 4 }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Upload files
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileUpload}
                  />
                </Button>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                  Accepted file formats include text and pdf.
                </Typography>
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

      {/* Example Instructions Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontSize: '20px' }}>Sample instructions</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textPrimary">
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '2'  }}>
        <li>You are an AI-powered support assistant for AJC Trailers' EasyCabin.</li>
        <li>Prioritise clear, concise, and simple responses to minimise confusion.</li>
        <li>Provide accurate, professional, and clear support to customers 24/7 regarding EasyCabin products, parts, and technical enquiries. </li>
        <li>You must respond only in UK English and use data strictly from the vector store.</li>
        <li>Never use public web content under any circumstances.</li>
      
      </ul>
          
          
          
          
          
          ,  
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Additional Dialog 1 */}
      <Dialog open={dialogOpen1} onClose={handleDialogClose1} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontSize: '20px' }}>Sample instructions</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textPrimary">
      
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>Use a polite, professional, approachable, and trustworthy tone, aligned with the EasyCabin brand.</li>
        <li>Prioritise clear, concise, and simple responses to minimise confusion.</li>
        <li>Maintain short sentences and a conversational tone.</li>
        <li>Structure responses using clear sequential steps.</li>
        <li>Ensure each step addresses a single action or check before moving to the next.</li>
        <li>Comply with WCAG accessibility standards to maintain readability.</li>
      </ul>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose1}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Additional Dialog 2 */}
      <Dialog open={dialogOpen2} onClose={handleDialogClose2} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontSize: '20px' }}>Sample instructions</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textPrimary">
          <h3>Step by step</h3>
          <p>To troubleshoot the issue, follow the steps below in order to identify and resolve the issue.</p>
      <ul style={{ listStyleType: 'none', paddingLeft: '0', lineHeight: '2' }}>
        <li>
          <strong>Step 1:</strong> Ensure you are in a safe environment and there are no immediate hazards. If it is safe, proceed with the steps below.
        </li>
        <li>
          <strong>Step 2:</strong> Check if the hydraulic isolator switch is on. If it is off, switch it on.
        </li>
        <li>
          <strong>Step 3:</strong> Check if the batteries are low. If they are, turn on the generator and try again.
        </li>
        <li>
          <strong>Step 4:</strong> Check the hydraulic oil level. If it’s low, fill the reservoir with oil.
        </li>
      </ul>
      <p>If these steps don’t resolve the issue, let me know, and I can provide more detailed troubleshooting guidance.</p>

      <hr />
      <h3>Does this answer your question?</h3>
   
      <p>If the customer replies Yes:</p>
      <p><strong>Response:</strong> "Great, glad we could help!"</p>
      <p>If the customer replies No:</p>
      <p><strong>Response:</strong> 😕 "Sorry about that—let’s try again. Could you please summarise exactly what you are looking for or clarify your question?"</p>

      <hr />

      
      <h3>If no relevant information exists:</h3>
      <p>"It seems we don’t have the specific details to answer your question. Our helpful team can assist you further. Please email us at info@easycabin.co.uk or call 01582 310894."</p>

      <h3> If a question is unrelated to EasyCabin products or mentions competitors:</h3>
      <p>"We’re here to support you with EasyCabin products and parts. Unfortunately, your question seems unrelated to this. If you think this is incorrect, please contact our team at 01582 310894 or info@easycabin.co.uk."</p>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose2}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
