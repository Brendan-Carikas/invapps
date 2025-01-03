import React from "react";
import { Grid, Box, Typography } from "@mui/material";

import CreditCard from "./dashboard-components/CreditCard";
import PlanCard from "./dashboard-components/PlanCard";
import WhatsappCard from "./dashboard-components/WhatsappCard";
import ConversationsList from "./dashboard-components/ConversationsList";
import SupportQueriesCard from "./dashboard-components/SupportQueriesCard";

const Dashboard1 = () => {
  const cardStyle = {
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
    height: '100%',
    '& .MuiCardContent-root': {
      height: '100%',
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" sx={{ mb: 3, marginLeft:1.2 }}>
        Overview
      </Typography>
      <Grid container spacing={0}>
        {/* Row 1 - Stats Cards */}
        <Grid item xs={12} sm={6} lg={3} sx={{ p: 1 }}>
          <CreditCard sx={cardStyle} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ p: 1, mt: { xs: 1, sm: 0 } }}>
          <PlanCard sx={cardStyle} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ p: 1, mt: { xs: 1, sm: 0 } }}>
          <WhatsappCard sx={cardStyle} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ p: 1, mt: { xs: 1, sm: 0 } }}>
          <SupportQueriesCard sx={cardStyle} />
        </Grid>
        
        {/* Row 2 - Conversations List */}
        <Grid item xs={12} sx={{ p: 1, mt: 8 }}>
          <ConversationsList sx={cardStyle} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
