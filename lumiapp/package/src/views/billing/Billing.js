import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Box,
  Divider,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const PricingCard = ({ title, price, queryLimit, overageCharges, features, buttonText, isPopular }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transform: isPopular ? 'scale(1.05)' : 'none',
        border: isPopular ? `2px solid ${theme.palette.primary.main}` : '1px solid',
        borderColor: isPopular ? theme.palette.primary.main : 'divider',
        borderRadius: 2,
        boxShadow: 'none',
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            padding: '4px 12px',
            borderRadius: '16px',
          }}
        >
          <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
            Popular
          </Typography>
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" component="div" gutterBottom color="primary.main" sx={{ fontWeight: 600 }}>
          £{price}
          <Typography variant="subtitle1" component="span" color="text.secondary">
            /month
          </Typography>
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List sx={{ flexGrow: 1 }}>
          <ListItem sx={{ px: 0 }}>
            <ListItemText 
              primary={<Typography variant="subtitle1"><strong>{queryLimit.toLocaleString()}</strong> queries per month</Typography>}
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemText 
              primary={
                <Typography variant="subtitle1">
                  {overageCharges === 'Custom' ? 'Custom overage charges' : `£${overageCharges} per 100 queries overage`}
                </Typography>
              }
            />
          </ListItem>
          {features?.map((feature, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <CheckIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
        <Button
          variant={isPopular ? "contained" : "outlined"}
          color="primary"
          fullWidth
          sx={{ 
            mt: 2,
            textTransform: 'none',
            borderRadius: 2,
            py: 1
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

const Billing = () => {
  const plans = [
    {
      title: 'Starter',
      price: '200',
      queryLimit: 1000,
      overageCharges: '25',
      features: [
        'Basic features',
        'Email support',
      ],
      buttonText: 'Choose Starter',
      isPopular: false,
    },
    {
      title: 'Growth',
      price: '400',
      queryLimit: 2000,
      overageCharges: '22',
      features: [
        'All Starter features',
        'Priority support',
        'Advanced analytics',
      ],
      buttonText: 'Choose Growth',
      isPopular: false,
    },
    {
      title: 'Scale',
      price: '800',
      queryLimit: 5000,
      overageCharges: '20',
      features: [
        'All Growth features',
        '24/7 phone support',
        'Custom integrations',
        'Dedicated account manager',
      ],
      buttonText: 'Choose Scale',
      isPopular: true,
    },
    {
      title: 'Enterprise',
      price: 'POA',
      queryLimit: 'Custom',
      overageCharges: 'Custom',
      features: [
        'All Scale features',
        'Custom SLA',
        'Account manager',
        'Custom development',
      ],
      buttonText: 'Contact Sales',
      isPopular: false,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 3, ml: 3 }}>
        Plans
      </Typography>
      <Grid container spacing={3}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={6} lg={3} key={index} sx={{ display: 'flex' }}>
            <PricingCard {...plan} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Billing;
