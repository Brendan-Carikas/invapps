import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const WhatsappCard = ({ sx }) => {
  const whatsappNumber = '+1 234 567 8900';

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappNumber);
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <WhatsAppIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
          <Typography variant="h4">WhatsApp Number</Typography>
        </Box>
        <Typography variant="h3" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          {whatsappNumber}
          <Button
            onClick={handleCopy}
            sx={{ ml: 2, minWidth: 'auto' }}
          >
            <ContentCopyIcon />
          </Button>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Use this number to connect your WhatsApp Business API
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WhatsappCard;
