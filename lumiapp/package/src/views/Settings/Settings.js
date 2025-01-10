import React, { useState, useRef } from 'react';
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
  Drawer,
  InputAdornment,
  Link,
  CardHeader,
  Autocomplete,
  Paper,
  Tooltip,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Settings = () => {
  const [appName, setAppName] = useState('My AI Assistant');
  const [corePurposeInstructions, setCorePurposeInstructions] = useState('');
  const [styleToneInstructions, setStyleToneInstructions] = useState('');
  const [technicalInstructions, setTechnicalInstructions] = useState('');
  const [files, setFiles] = useState([]);
  const [logo, setLogo] = useState(null);
  const [whatsappDialogOpen, setWhatsappDialogOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [connectedNumber, setConnectedNumber] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');
  const [drawerTitle, setDrawerTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [copyTooltip, setCopyTooltip] = useState('Copy');
  const contentRef = useRef(null);

  const technicalContent = (
    <>
      <h3>Core purpose</h3>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '2'  }}>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>You are an AI-powered support assistant for AJC Trailers' EasyCabin.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("You are an AI-powered support assistant for AJC Trailers' EasyCabin.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>Prioritise clear, concise, and simple responses to minimise confusion.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("Prioritise clear, concise, and simple responses to minimise confusion.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>Provide accurate, professional, and clear support to customers 24/7 regarding EasyCabin products, parts, and technical enquiries.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("Provide accurate, professional, and clear support to customers 24/7 regarding EasyCabin products, parts, and technical enquiries.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>You must respond only in UK English and use data strictly from the vector store.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("You must respond only in UK English and use data strictly from the vector store.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>Never use public web content under any circumstances.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("Never use public web content under any circumstances.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </ul>
      <h3>Style and tone</h3>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '2'  }}>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>Use a polite, professional, approachable, and trustworthy tone, aligned with the EasyCabin brand.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("Use a polite, professional, approachable, and trustworthy tone, aligned with the EasyCabin brand.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>Prioritise clear, concise, and simple responses to minimise confusion.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("Prioritise clear, concise, and simple responses to minimise confusion.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>Maintain short sentences and a conversational tone.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("Maintain short sentences and a conversational tone.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>Structure responses using clear sequential steps.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("Structure responses using clear sequential steps.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>Ensure each step addresses a single action or check before moving to the next.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("Ensure each step addresses a single action or check before moving to the next.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box 
          component={Paper} 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.02)', 
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            position: 'relative',
            zIndex: 1200
          }}
        >
          <Typography flex={1}>Comply with WCAG accessibility standards to maintain readability.</Typography>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText("Comply with WCAG accessibility standards to maintain readability.")}
              sx={{ mt: -0.5, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </ul>
      <h3>Technical and troubleshooting</h3>
      <h4>Step by step</h4>
      <Box 
        component={Paper} 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 2, 
          backgroundColor: 'rgba(0, 0, 0, 0.02)', 
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 1,
          position: 'relative',
          zIndex: 1200
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
          <Box>
            <Typography paragraph sx={{ mb: 2 }}>To troubleshoot the issue, follow the steps below in order to identify and resolve the issue.</Typography>
            <ul style={{ listStyleType: 'none', paddingLeft: '0', lineHeight: '2' }}>
              <li><strong>Step 1:</strong> Ensure you are in a safe environment and there are no immediate hazards. If it is safe, proceed with the steps below.</li>
              <li><strong>Step 2:</strong> Check if the hydraulic isolator switch is on. If it is off, switch it on.</li>
              <li><strong>Step 3:</strong> Check if the batteries are low. If they are, turn on the generator and try again.</li>
              <li><strong>Step 4:</strong> Check the hydraulic oil level. If it's low, fill the reservoir with oil.</li>
            </ul>
            <Typography paragraph sx={{ mt: 2, mb: 0 }}>If these steps don't resolve the issue, let me know, and I can provide more detailed troubleshooting guidance.</Typography>
          </Box>
          <Tooltip title={copyTooltip}>
            <IconButton 
              size="small" 
              onClick={() => handleCopyText(`To troubleshoot the issue, follow the steps below in order to identify and resolve the issue.

Step 1: Ensure you are in a safe environment and there are no immediate hazards. If it is safe, proceed with the steps below.
Step 2: Check if the hydraulic isolator switch is on. If it is off, switch it on.
Step 3: Check if the batteries are low. If they are, turn on the generator and try again.
Step 4: Check the hydraulic oil level. If it's low, fill the reservoir with oil.

If these steps don't resolve the issue, let me know, and I can provide more detailed troubleshooting guidance.`)}
              sx={{ mt: 0, zIndex: 1201 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <hr />
      <h4>Does this answer your question?</h4>
      <p>If the customer replies Yes:</p>
      <p><strong>Response:</strong> "Great, glad we could help!"</p>
      <p>If the customer replies No:</p>
      <p><strong>Response:</strong> 😕 "Sorry about that—let's try again. Could you please summarise exactly what you are looking for or clarify your question?"</p>
      <hr />
      <h3>If no relevant information exists:</h3>
      <p>"It seems we don't have the specific details to answer your question. Our helpful team can assist you further. Please email us at info@easycabin.co.uk or call 01582 310894."</p>
      <h3>If a question is unrelated to EasyCabin products or mentions competitors:</h3>
      <p>"We're here to support you with EasyCabin products and parts. Unfortunately, your question seems unrelated to this. If you think this is incorrect, please contact our team at 01582 310894 or info@easycabin.co.uk."</p>
    </>
  );

  const addIdsToHeadings = (content) => {
    if (!content || typeof content === 'string') return content;

    let headingCount = 0;
    const processElement = (element) => {
      if (!element || !element.props) return element;

      // Add id to h3 elements
      if (element.type === 'h3') {
        const id = `section-${headingCount++}`;
        return React.cloneElement(element, { id });
      }

      // Process children
      if (element.props.children) {
        if (Array.isArray(element.props.children)) {
          const newChildren = element.props.children.map(processElement);
          return React.cloneElement(element, {}, ...newChildren);
        } else {
          const newChild = processElement(element.props.children);
          return React.cloneElement(element, {}, newChild);
        }
      }

      return element;
    };

    if (Array.isArray(content)) {
      return content.map(processElement);
    }
    return processElement(content);
  };

  const extractTableOfContents = (content) => {
    if (!content || typeof content === 'string') return [];
    
    const headings = [];
    let headingCount = 0;
    
    const extractFromElement = (element) => {
      if (!element || !element.props) return;

      // Check if it's an h3 element
      if (element.type === 'h3') {
        const id = `section-${headingCount++}`;
        headings.push({
          id,
          title: typeof element.props.children === 'string' 
            ? element.props.children 
            : Array.isArray(element.props.children) 
              ? element.props.children.join('') 
              : element.props.children.toString(),
        });
      }

      // Recursively check children
      if (element.props.children) {
        if (Array.isArray(element.props.children)) {
          element.props.children.forEach(extractFromElement);
        } else {
          extractFromElement(element.props.children);
        }
      }
    };

    if (Array.isArray(content)) {
      content.forEach(extractFromElement);
    } else {
      extractFromElement(content);
    }

    return headings;
  };

  const handleShowExample = (content, title) => {
    const processedContent = addIdsToHeadings(content);
    setDrawerContent(processedContent);
    setDrawerTitle(title);
    setDrawerOpen(true);
    setSearchTerm('');
  };

  const scrollToSection = (id) => {
    setTimeout(() => {
      const contentElement = contentRef.current;
      if (!contentElement) return;

      const targetElement = contentElement.querySelector(`[id="${id}"]`);
      if (!targetElement) return;

      const padding = 180; // Padding from top of scroll container
      contentElement.scrollTo({
        top: targetElement.offsetTop - padding,
        behavior: 'smooth'
      });
    }, 100); // Small delay to ensure content is rendered
  };

  const handleSearch = (event, value) => {
    if (typeof value === 'string') {
      setSearchTerm(value);
    } else if (value && value.title) {
      setSearchTerm(value.title);
      scrollToSection(value.id);
    } else {
      setSearchTerm('');
    }
  };

  const getFilteredContent = () => {
    if (!drawerContent) return null;
    if (!searchTerm) return drawerContent;

    const processElement = (element) => {
      if (!element || !element.props) return element;

      // If it's a text element and matches search, highlight it
      if (typeof element.props.children === 'string' &&
          element.props.children.toLowerCase().includes(searchTerm.toLowerCase())) {
        return element;
      }

      // Process children
      if (element.props.children) {
        if (Array.isArray(element.props.children)) {
          const newChildren = element.props.children
            .map(processElement)
            .filter(child => child !== null);
          if (newChildren.length > 0) {
            return React.cloneElement(element, {}, ...newChildren);
          }
        } else {
          const newChild = processElement(element.props.children);
          if (newChild !== null) {
            return React.cloneElement(element, {}, newChild);
          }
        }
      }

      return null;
    };

    if (Array.isArray(drawerContent)) {
      const filtered = drawerContent
        .map(processElement)
        .filter(element => element !== null);
      return filtered.length > 0 ? filtered : null;
    }
    return processElement(drawerContent);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopyTooltip('Copied!');
    setTimeout(() => setCopyTooltip('Copy'), 2000);
  };

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

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSearchTerm('');  // Reset search when closing drawer
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 3, ml: 1.2 }}>
        Settings
      </Typography>
      
      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 'none', borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <WhatsAppIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
                <Typography variant="h5">Connect</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  
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
            <CardHeader
              title={
                <Box display="flex" alignItems="center">
                  <SmartToyIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
                  <Typography variant="h5">Instructions for AI Assistant</Typography>
                </Box>
              }
              action={
                <Button 
                  variant="text" 
                  onClick={() => handleShowExample(
                    technicalContent,
                    'Instruction library'
                  )}
                >
                  Instruction library
                </Button>
              }
            />
            <CardContent sx={{ p: 3 }}>
              
              

              <Box sx={{ mb: 3 }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">
                    Core purpose
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Core Purpose Instructions"
                      value={corePurposeInstructions}
                      onChange={(e) => setCorePurposeInstructions(e.target.value)}
                      variant="outlined"
                      placeholder="Enter core purpose instructions for the AI assistant..."
                      sx={{ mt: 2 }}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">
                    Style and tone
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Style and Tone Instructions"
                      value={styleToneInstructions}
                      onChange={(e) => setStyleToneInstructions(e.target.value)}
                      variant="outlined"
                      placeholder="Enter style and tone instructions for the AI assistant..."
                      sx={{ mt: 2 }}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">
                    Technical and troubleshooting
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Technical Instructions"
                      value={technicalInstructions}
                      onChange={(e) => setTechnicalInstructions(e.target.value)}
                      variant="outlined"
                      placeholder="Enter technical and troubleshooting instructions for the AI assistant..."
                      sx={{ mt: 2 }}
                    />
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
                <Typography variant="h5">Knowledge Base</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h6">If you upload files under Knowledge base, conversations with your AI assistant will include file contents. 
              </Typography>
              


              <Box sx={{ mt: 4 }}>
                <Button
                  component="label"
                  variant="outlined"
                 
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
              sx={{ textTransform: 'none' }}
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

      {/* Example Content Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '400px',
            padding: '24px',
          },
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3">{drawerTitle}</Typography>
          <Button onClick={handleDrawerClose}>Close</Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            freeSolo
            options={extractTableOfContents(drawerContent)}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              return option.title || '';
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                placeholder="Search content..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            value={searchTerm}
            onChange={handleSearch}
            onInputChange={(event, value) => setSearchTerm(value)}
          />
        </Box>
        {drawerContent && (
          <Box 
            ref={contentRef}
            sx={{ 
              maxHeight: 'calc(100vh - 250px)',
              overflowY: 'auto',
              pr: 1,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
              },
            }}
          >
            {getFilteredContent()}
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default Settings;
