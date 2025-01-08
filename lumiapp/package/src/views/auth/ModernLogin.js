import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  TextField,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ModernLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/app/dashboards/dashboard1");
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || "Failed to log in");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            maxWidth: "450px",
            width: "100%",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="700"
            textAlign="center"
            marginBottom="30px"
          >
            Welcome Back
          </Typography>

          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember me"
                  />
                </FormGroup>
                <Typography
                  component={Link}
                  to="/auth/forgot-password"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Forgot Password?
                </Typography>
              </Stack>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
              >
                Sign In
              </Button>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="textSecondary"
                  variant="body1"
                  fontWeight="500"
                >
                  New to Lumi?
                </Typography>
                <Typography
                  component={Link}
                  to="/signup"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Create an Account
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ModernLogin;
