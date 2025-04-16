import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import RegistrationForm from "@/components/common/forms/authentication/registration-form";
import LoginForm from "@/components/common/forms/authentication/login-form";

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom, #00796b 0%, white 100%)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            px: 2,
          }}
        >
          {isRegistering ? (
            <>
              <RegistrationForm />
              <Stack direction="row" justifyContent="center" mt={2}>
                <Button variant="text" sx={{ color: "black" }} onClick={() => setIsRegistering(false)}>
                  Already have an account? Log in
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <LoginForm />
              <Stack direction="row" justifyContent="center" mt={2}>
                <Button variant="text" sx={{ color: "black" }} onClick={() => setIsRegistering(true)}>
                  Don’t have an account? Sign up now
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
