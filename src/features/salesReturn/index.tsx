import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";

const Salesreturn = () => {
  return (
    <Box
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f4f6f8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 6,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: "#fff",
            maxWidth: 500,
          }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            style={{ display: "inline-block" }}
          >
            <AccessTimeIcon
              sx={{ fontSize: 80, color: "#fcb500", mb: 2 }}
            />
          </motion.div>

          <Typography variant="h4" fontWeight={700} gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We're building something awesome. Stay tuned!
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Salesreturn;
