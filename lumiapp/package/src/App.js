import React from "react";
import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthBackgroundProvider } from "./contexts/AuthBackgroundContext";
import ThemeRoutes from "./routes/Router";

function App() {
  const routing = useRoutes(ThemeRoutes);
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthBackgroundProvider>
          <CssBaseline />
          {routing}
        </AuthBackgroundProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
