import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";

const SignupForm = ({ onSubmit, formData, handleChange, showPassword, setShowPassword, error }) => (
  <Card sx={{ borderRadius: '12px', maxWidth: '420px', width: '100%' }}>
    <CardContent sx={{ padding: '32px !important' }}>
      <Box display="flex" justifyContent="center" mb={4}>
        <LogoIcon />
      </Box>
      
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Sign Up
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          autoFocus
          sx={{ mb: 3 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          sx={{ mb: 3 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          sx={{ mb: 4 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack spacing={2}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Sign Up
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account? {" "}
              <Link to="/login" style={{ color: 'inherit' }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </CardContent>
  </Card>
);

const SignupNew = () => {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.email, formData.password, formData.name);
    } catch (error) {
      setError("Failed to create an account");
    }
  };

  return (
    <SignupForm
      onSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      error={error}
    />
  );
};

export default SignupNew;
