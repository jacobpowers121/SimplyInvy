import React from "react";
import { Box } from "@mui/material";

interface FormBaseProps {
  children: React.ReactNode;
}

const FromBase: React.FC<FormBaseProps> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 6,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          backgroundColor: "#fafafa",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default FromBase;
