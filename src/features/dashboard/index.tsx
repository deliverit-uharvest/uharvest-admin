import React from "react";
import { Box } from "@mui/material";
import logo from "../../assets/images/users/loginImage1.png"; // ✅ adjust path as needed

const DashboardHome = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width="auto"
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: 220, height: "auto", objectFit: "contain" }}
      />
    </Box>
  );
};

export default DashboardHome;
