import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1,{
        message: "Password is required"
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z.object({
    firstname: z.string().min(1,{
        message: "",
    }),
    lastname: z.string().min(1,{
        message: "",
    }),
    username: z.string().min(1,{
        message: "",
    }),
    phonenumber: z.string().max(11, {
        message: "Phone Number is 11 characters at most"
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(8,{
        message: "Password must be at least 8 characters",
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8, {
      message: "Minimum of 8 characters required",
    }),
  });
  
  export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
  });