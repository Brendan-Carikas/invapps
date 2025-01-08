import React from 'react';
import { useAuthBackground } from '../../contexts/AuthBackgroundContext';
import Login from './Login';
import ModernLogin from './ModernLogin';

const LoginSelector = () => {
  const { isTwoColumn } = useAuthBackground();
  
  return isTwoColumn ? <ModernLogin /> : <Login />;
};

export default LoginSelector;
