import React from "react";
import { useTheme } from "@mui/material";
import logoNormal from "../../../assets/images/lumi-site-log.png";
import logoReverse from "../../../assets/images/lumi-site-logo-reverse.png";

const LogoIcon = (props) => {
  const theme = useTheme();
  const logo = theme.palette.mode === 'dark' ? logoReverse : logoNormal;
  
  return <img alt="Lumi" src={logo} height="40px" {...props} />;
};

export default LogoIcon;
