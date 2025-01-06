import React, { useState } from 'react';
import {
  Box,
  useTheme as useMuiTheme,
  useMediaQuery,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthBackground } from '../../contexts/AuthBackgroundContext';
import { useTheme } from '../../contexts/ThemeContext';
import { LoginForm } from './Login';
import authBg from '../../assets/images/auth-bg.png';

const ModernLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { customImage } = useAuthBackground();
  const { currentTheme } = useTheme();
  const backgroundImage = customImage || authBg;
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setError('Failed to log in');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        backgroundColor: 'background.default'
      }}
    >
      <Box
        sx={{
          flex: { xs: '1 1 auto', md: '1 1 60%' },
          minHeight: { md: '100vh' },
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' }
        }}
      />
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', md: '40%' },
          padding: { xs: 2, sm: 3, md: 4 },
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          mb={4}
        >
          <img
            src="/logo.png"
            alt="company logo"
            width="100px"
            height="100px"
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <LoginForm
          onSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          error={error}
        />
      </Box>
    </Box>
  );
};

export default ModernLogin;
