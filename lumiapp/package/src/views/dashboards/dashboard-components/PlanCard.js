import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Link } from 'react-router-dom';

const PlanCard = ({ sx }) => {
  const currentPlan = {
    name: 'Growth Plan',
    period: 'Monthly',
    nextBilling: '2024-01-20',
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <WorkspacePremiumIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
          <Typography variant="h5">Current Plan</Typography>
        </Box>
        <Typography variant="h3" color="primary" gutterBottom>
          {currentPlan.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {currentPlan.period} Plan
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Next billing: {currentPlan.nextBilling}
        </Typography>
        <Button 
          component={Link}
          to="/app/billing"
          variant="outlined" 
          color="primary"
          sx={{ mt: 2 }}
        >
          Upgrade Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
