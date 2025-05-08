import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <Box sx={{ py: 11, textAlign: "center" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
