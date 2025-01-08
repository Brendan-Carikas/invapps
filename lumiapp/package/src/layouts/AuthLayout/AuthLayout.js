import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import authBg from '../../assets/images/auth-bg.png';
import { useAuthBackground } from '../../contexts/AuthBackgroundContext';

const AuthLayout = () => {
  const { showBackground, customImage } = useAuthBackground();
  const backgroundImage = customImage || authBg;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(showBackground && {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }),
        ...(!showBackground && {
          backgroundColor: '#f5f5f5',
        }),
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '400px', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
