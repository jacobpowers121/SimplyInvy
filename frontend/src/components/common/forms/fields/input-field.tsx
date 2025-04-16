import React from "react";
import { FieldError } from "react-hook-form";
import { styled, TextField } from "@mui/material";

interface InputFieldProps {
  type: string;
  name: string;
  register: any;
  placeholder: string;
  onBlur: () => void;
  onFocus: () => void;
  error: FieldError | undefined;
  touched: boolean;
  value?: string;
  readonly?: boolean;
}

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    width: "100%",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#828282",
    fontSize: "16px",
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    lineHeight: "100%",
  },
  "& .MuiInputBase-input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px white inset",
    WebkitTextFillColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#814DFA",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#814DFA",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#814DFA",
    },
  },
});

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  register,
  placeholder,
  onBlur,
  onFocus,
  error,
  touched,
  readonly,
}) => {
  return (
    <StyledTextField
      type={type}
      {...register(name)}
      placeholder={placeholder}
      onBlur={onBlur}
      onFocus={onFocus}
      InputProps={{ readOnly: readonly }}
      error={Boolean(error && touched)}
      helperText={error && touched ? error.message : ""}
      fullWidth
      variant="outlined"
      style={{ marginBottom: "10px" }}
    />
  );
};

export default InputField;
