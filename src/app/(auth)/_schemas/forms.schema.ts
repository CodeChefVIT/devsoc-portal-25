import {z} from "zod";
import {
    NameSchema,
    PhoneNoSchema,
    GenderSchema,
    VITEmailSchema,
    RegNoSchema,
    HostelBlockSchema,
    RoomNumberSchema,
    GithubProfileSchema,
    PasswordSchema,
    EmailSchema, JoinTeamSchema, CreateTeamSchema,
} from "./general.schema"

export const LoginSchema = z.object({
    email: VITEmailSchema,
    password: PasswordSchema
})

export type LoginFormType = z.infer<typeof LoginSchema>;

export const UserDetailsSchema =  z.object({
    firstName: NameSchema,
    lastName: NameSchema,
    phoneNo: PhoneNoSchema,
    gender: GenderSchema,
    vitEmail: VITEmailSchema,
    email: EmailSchema,
    regNo: RegNoSchema,
    hostelBlock: HostelBlockSchema,
    roomNo: RoomNumberSchema,
    githubProfile: GithubProfileSchema,
    joinTeam: JoinTeamSchema.optional(),
    createTeam: CreateTeamSchema.optional(),
}).refine((data) => data.joinTeam || data.createTeam, {
    message: "Either 'joinTeam' or 'createTeam' must be provided.",
    path: ["joinTeam", "createTeam"],
});

export const defaultUserDetails: UserDetailsFormType = {
    firstName: "",
    lastName: "",
    phoneNo: "",
    gender: "",
    vitEmail: "",
    email: "",
    regNo: "",
    hostelBlock: "",
    githubProfile: "",
    roomNo: "",
    joinTeam: "",
    createTeam: ""
}

export type UserDetailsFormType = z.infer<typeof UserDetailsSchema>;

export const SignupSchema = z.object({
    email: VITEmailSchema,
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
}).refine(data=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type SignupFormType = z.infer<typeof SignupSchema>;

export const OTPFormSchema = z.object({
    otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits")
})

export type OTPFormType = z.infer<typeof OTPFormSchema>;