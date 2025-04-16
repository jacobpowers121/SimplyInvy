import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ConfirmButtonProps extends ButtonProps {
  variantType?: "filled" | "outlined";
}

const RoundedButton: React.FC<ConfirmButtonProps> = ({ variantType = "filled", children, ...props }) => {

  const styles = {
    filled: {
      backgroundColor: "#00796b",
      color: '#ffffff',
      border: '1px solid #00796b',
      textTransform: 'none',
      padding: '6px 12px',
      borderRadius: '24px',
      fontWeight: 500,
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: '#ffffff',
        color: '#00796b',
        borderColor: '#004d40',
      },
      '&:active': {
        backgroundColor: '#004d40',
        borderColor: '#00251a',
      },
      '&:focus': {
        outline: 'none',
      },
    },
    outlined: {
      color: '#00796b',
      border: '1px solid #00796b',
      padding: '6px 12px',
      borderRadius: '24px',
      textTransform: 'none',
      fontWeight: 500,
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: '#00796b',
        color: '#ffffff',
        borderColor: '#004d40',
      },
      '&:active': {
        backgroundColor: '#004d40',
        borderColor: '#00251a',
      },
      '&:focus': {
        outline: 'none',
      },
    }
  }

  return (
    <Button
      {...props}
      sx={{
        ...styles[variantType],
      }}
    >
      {children}
    </Button>
  );
};

export default RoundedButton;
