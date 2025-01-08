import { z } from 'zod';

const VITEmailSchema =  z.string().email("Enter a valid email address").regex(
    /^[a-zA-Z]+\.[a-zA-Z]+202[0-5]@vitstudent\.ac\.in$/,
    "Invalid Email Address"
);

const PasswordSchema = z.string().min(8, "Password must have atleast 8 characters");

export const LoginSchema = z.object({
    email: VITEmailSchema,
    password: PasswordSchema
})

export type LoginFormType = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
    email: VITEmailSchema,
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
    username: z.string(),
    phoneNo: z.string().regex(/^\d{10}$/, "Invalid Phone no."),
    regNo: z.string().regex(/^(?:2[0-5]|19)[a-zA-Z]{3}\d{4}$/, "Invalid Registration no.")
}).refine(data=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type SignupFormType = z.infer<typeof SignupSchema>;

export const OTPFormSchema = z.object({
    otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits")
})

export type OTPFormType = z.infer<typeof OTPFormSchema>;