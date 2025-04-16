import React, { useState } from "react";
import { styled, Typography } from "@mui/material";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ConfirmButton from "@/components/common/buttons/rounded-button";
import FormBase from "@/components/common/forms/form-base";
import InputField from "@/components/common/forms/fields/input-field";
import { loginSchema } from "@/types/users/schemas/login-user.schema";

interface LoginFormValues {
  email: string;
  password: string;
}

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setError,
    clearErrors,
    trigger,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema) as Resolver<LoginFormValues>,
  });

  const [fieldBlur, setFieldBlur] = useState<{ [key: string]: boolean }>({
    email: false,
    password: false,
  });

  const handleBlur = async (fieldName: keyof LoginFormValues) => {
    setFieldBlur((prev) => ({ ...prev, [fieldName]: true }));
    await trigger(fieldName);
  };

  const handleFocus = (fieldName: keyof LoginFormValues) => {
    clearErrors(fieldName);
    setFieldBlur((prev) => ({ ...prev, [fieldName]: false }));
  };

  const loginUser = async (data: LoginFormValues) => {
    console.log("Logging in:", data);
    // TODO: send to backend
  };

  return (
    <FormBase>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <FormContainer onSubmit={handleSubmit(loginUser)}>
        <InputField
          type="email"
          name="email"
          register={register}
          placeholder="Email"
          onBlur={() => handleBlur("email")}
          onFocus={() => handleFocus("email")}
          error={errors.email}
          touched={fieldBlur.email}
        />

        <InputField
          type="password"
          name="password"
          register={register}
          placeholder="Password"
          onBlur={() => handleBlur("password")}
          onFocus={() => handleFocus("password")}
          error={errors.password}
          touched={fieldBlur.password}
        />

        <ConfirmButton disabled={!isValid || isSubmitting} type="submit" variantType="outlined">
          Log In
        </ConfirmButton>
      </FormContainer>
    </FormBase>
  );
};

export default LoginForm;
