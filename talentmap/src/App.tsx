import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useMemo } from 'react';

import Navigation from './components/Navigation';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard';
import OrgChart from './components/OrgChart';
import Settings from './components/Settings';
import SkillsMatrix from './components/SkillsMatrix';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider as CustomThemeProvider, useTheme } from './components/ThemeContext';
import { UserProvider } from './components/UserContext';
import { AuthProvider } from './contexts/AuthContext';

function ThemedApp() {
  const {
    mode,
    primaryColor,
    secondaryColor,
    headingFont,
    bodyFont,
  } = useTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: primaryColor,
          },
          secondary: {
            main: secondaryColor,
          },
          background: {
            default: mode === 'light' ? '#f5f8fa' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: bodyFont,
          h1: { fontFamily: headingFont },
          h2: { fontFamily: headingFont },
          h3: { fontFamily: headingFont },
          h4: { fontFamily: headingFont },
          h5: { fontFamily: headingFont },
          h6: { fontFamily: headingFont },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: primaryColor,
                color: '#ffffff',
                '& .MuiIconButton-root': {
                  color: '#ffffff',
                },
                '& .MuiTypography-root': {
                  color: '#ffffff',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [mode, primaryColor, secondaryColor, headingFont, bodyFont]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Box
                    component="main"
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[100]
                          : theme.palette.grey[900],
                      flexGrow: 1,
                      height: '100vh',
                      overflow: 'auto',
                      pt: 8,
                      px: 2,
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/users" element={<UserList />} />
                      <Route path="/org-chart" element={<OrgChart />} />
                      <Route path="/skills-matrix" element={<SkillsMatrix />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </Box>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <CustomThemeProvider>
        <AuthProvider>
          <UserProvider>
            <ThemedApp />
          </UserProvider>
        </AuthProvider>
      </CustomThemeProvider>
    </Router>
  );
}

export default App;
