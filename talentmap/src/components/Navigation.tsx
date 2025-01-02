import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
  Box,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

const mainMenuItems = [
  { text: 'People', icon: <PeopleIcon />, path: '/users' },
  { text: 'Organization', icon: <AccountTreeIcon />, path: '/org-chart' },
  { text: 'Skills matrix', icon: <AssessmentIcon />, path: '/skills-matrix' },
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
];

const settingsItem = { text: 'Settings', icon: <SettingsIcon />, path: '/settings' };

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { signOut } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Get contrasting text color based on theme mode
  const getContrastText = () => {
    return theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main;
  };

  // Get background color for selected state based on theme mode
  const getSelectedBackground = () => {
    return theme.palette.mode === 'dark' 
      ? alpha(theme.palette.primary.main, 0.2)
      : alpha(theme.palette.primary.main, 0.1);
  };

  // Get hover background color based on theme mode
  const getHoverBackground = () => {
    return theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.3)
      : alpha(theme.palette.primary.main, 0.2);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mt: 8, flex: 1 }}>
        <List>
          {mainMenuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem
                button
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                selected={isSelected}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: getSelectedBackground(),
                    '&:hover': {
                      backgroundColor: getHoverBackground(),
                    },
                  },
                  '&:hover': {
                    backgroundColor: getHoverBackground(),
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isSelected ? getContrastText() : 'inherit',
                    minWidth: 40 
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{ 
                    '& .MuiTypography-root': {
                      color: isSelected ? getContrastText() : 'inherit',
                      fontWeight: isSelected ? 500 : 400
                    }
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <List>
        <ListItem
          button
          key={settingsItem.text}
          onClick={() => handleNavigation(settingsItem.path)}
          selected={location.pathname === settingsItem.path}
          sx={{
            '&.Mui-selected': {
              backgroundColor: getSelectedBackground(),
              '&:hover': {
                backgroundColor: getHoverBackground(),
              },
            },
            '&:hover': {
              backgroundColor: getHoverBackground(),
            },
          }}
        >
          <ListItemIcon 
            sx={{ 
              color: location.pathname === settingsItem.path ? getContrastText() : 'inherit',
              minWidth: 40 
            }}
          >
            {settingsItem.icon}
          </ListItemIcon>
          <ListItemText 
            primary={settingsItem.text}
            sx={{ 
              '& .MuiTypography-root': {
                color: location.pathname === settingsItem.path ? getContrastText() : 'inherit',
                fontWeight: location.pathname === settingsItem.path ? 500 : 400
              }
            }}
          />
        </ListItem>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            '&:hover': {
              backgroundColor: getHoverBackground(),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          borderRadius: 0 
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            TalentMap
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.background.default
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.background.default
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navigation;