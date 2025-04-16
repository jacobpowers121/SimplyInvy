import * as yup from "yup";

export const emailSchema = yup
  .string()
  .trim()
  .required("Email address is required")
  .email("Invalid email address format");

export const phoneNumberSchema = yup
  .string()
  .trim()
  .required("Phone number is required")
  .matches(/^\d{10}$/, "Phone number must be exactly 10 digits");

export const passwordSchema = yup
  .string()
  .trim()
  .required("Please enter your password")
  .min(8, "Password must be at least 8 characters")
  .max(99, "Password must be less than 99 characters")
  .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least 1 special character");

export const confirmPasswordSchema = yup
  .string()
  .trim()
  .required("Please confirm your password")
  .oneOf([yup.ref("password")], "Passwords must match");

export const usernameSchema = yup
  .string()
  .trim()
  .required("Username is required")
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be less than 30 characters");

export const signupSchema = yup.object().shape({
  username: usernameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});
