import { createTheme } from "@mui/material/styles";
import typography from "./Typography-modern";
import shadows from "./Shadows";
import icons from "./Icons-modern";

export const TopbarHeight = 70;
export const SidebarWidth = 265;

export const baseTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: 'light',
    primary: {
      main: "#1B1464",
      light: "#e6f4ff",
    },
    secondary: {
      main: "#1e4db7",
    },
    background: {
      default: "#fff",
      paper: "#ffffff",
    },
    success: {
      main: "#39cb7f",
      contrastText: "#ffffff",
    },
    error: {
      main: "#fc4b6c",
    },
    warning: {
      main: "#fdd43f",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#2a3547",
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
  },
  typography,
  shape: {
    borderRadius: 8,
  },
  shadows,
  components: {
    ...icons,
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
          margin: 0,
          padding: 0,
        },
        "#root": {
          height: "100%",
        },
        "*[dir='rtl'] .buyNowImg": {
          transform: "scaleX(-1)",
        },
        ".buyNowImg": {
          position: "absolute",
          right: "-44px",
          top: "-18px",
          width: "143px",
          height: "175px",
        },
        ".MuiCardHeader-action": {
          alignSelf: "center !important",
        },
        ".scrollbar-container": {
          borderRight: "0 !important",
        },
        "*[dir='rtl'] .welcomebg:before": {
          backgroundPosition: "top -24px left -9px !important",
        },
      },
    },
  },
});
