import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {baseTheme} from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthBackgroundProvider } from "./contexts/AuthBackgroundContext";

function App() {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AuthBackgroundProvider>
          <CssBaseline />
          {routing}
        </AuthBackgroundProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
