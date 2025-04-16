import React, { useState } from "react";
import { styled, Typography } from "@mui/material";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ConfirmButton from "@/components/common/buttons/rounded-button";
import FormBase from "@/components/common/forms/form-base";
import { signupSchema } from "@/types/users/schemas/create-user.schema";
import InputField from "@/components/common/forms/fields/input-field";

interface FormValues {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setError,
    clearErrors,
    trigger,
  } = useForm<FormValues>({
    resolver: yupResolver(signupSchema) as Resolver<FormValues>,
  });

  const [fieldBlur, setFieldBlur] = useState<{ [key: string]: boolean }>({
    username: false,
    email: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
  });

  const handleBlur = async (fieldName: keyof FormValues) => {
    setFieldBlur((prevFieldBlur) => ({
      ...prevFieldBlur,
      [fieldName]: true,
    }));
    await trigger(fieldName);
  };

  const handleFocus = (fieldName: keyof FormValues) => {
    clearErrors(fieldName);
    setFieldBlur((prevFieldBlur: any) => ({
      ...prevFieldBlur,
      [fieldName]: false,
    }));
  };

  const createUser = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormBase>
      <Typography variant="h5" gutterBottom>
        Create Account
      </Typography>

      <FormContainer onSubmit={handleSubmit(createUser)}>
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
          type="username"
          name="username"
          register={register}
          placeholder="Username"
          onBlur={() => handleBlur("username")}
          onFocus={() => handleFocus("username")}
          error={errors.username}
          touched={fieldBlur.username}
        />

        <InputField
          type="tel"
          name="phoneNumber"
          register={register}
          placeholder="Phone Number"
          onBlur={() => handleBlur("phoneNumber")}
          onFocus={() => handleFocus("phoneNumber")}
          error={errors.phoneNumber}
          touched={fieldBlur.phoneNumber}
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

        <InputField
          type="password"
          name="confirmPassword"
          register={register}
          placeholder="Confirm Password"
          onBlur={() => handleBlur("confirmPassword")}
          onFocus={() => handleFocus("confirmPassword")}
          error={errors.confirmPassword}
          touched={fieldBlur.confirmPassword}
        />
        <ConfirmButton disabled={!isValid || isSubmitting} type="submit" variantType="filled">
          Register
        </ConfirmButton>
      </FormContainer>
    </FormBase>
  );
};

export default RegistrationForm;
