import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  LinearProgress,
  Box,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  '& .MuiCardContent-root': {
    padding: '24px',
  },
}));

const Usage = () => {
  const theme = useTheme();
  
  // Calculate usage percentage
  const totalCredits = 500;
  const usedCredits = 120;
  const remainingCredits = totalCredits - usedCredits;
  const usagePercentage = (usedCredits / totalCredits) * 100;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h2" sx={{ mb: 3, marginLeft:1.2 }}>
        Usage
      </Typography>
      
      <Grid container spacing={3}>
        {/* Billing Overview Card */}
        <Grid item xs={12}>
          <StyledCard sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 'none', borderRadius: 2 }}>
          <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CreditScoreIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
                <Typography variant="h5">Plan status</Typography>
              </Box>
              <Typography variant="body1" fontWeight={700} color="text.primary">
                Next plan refresh is scheduled for January 20, 2025 (in 10 days)
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Credits Usage Card */}

        <Grid item xs={12}>
          <StyledCard sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 'none', borderRadius: 2 }}>
          <CardContent>
              <Box sx={{ mb: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <CreditScoreIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
                  <Typography variant="h5">Credits Usage</Typography>
                </Box>
                <Typography variant="body1" fontWeight={700} color="text.primary">
                  Usage period started December 20, 2024
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">
                    {usedCredits} of {totalCredits} credits used
                  </Typography>
                  <Typography variant="body1" color={remainingCredits < 50 ? 'error.main' : 'secondary.main'}>
                    {remainingCredits} credits remaining
                  </Typography>
                </Box>
                <BorderLinearProgress
                  variant="determinate"
                  value={usagePercentage}
                  sx={{
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: remainingCredits < 50 
                        ? theme.palette.error.main 
                        : theme.palette.secondary.main,
                    },
                  }}
                />
              </Box>

              <Divider sx={{ 
                my: 2,
                borderColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.12)' 
                  : 'rgba(0, 0, 0, 0.12)',
              }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.primary" gutterBottom>
                  Note: Using this model costs one prompt credit per use.
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Once usage limits are reached, you'll need to purchase additional credits to continue using the service.
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  mt: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.light,
                  },
                }}
              >
                Purchase Additional Credits
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>




        

        
      </Grid>
    </Container>
  );
};

export default Usage;
