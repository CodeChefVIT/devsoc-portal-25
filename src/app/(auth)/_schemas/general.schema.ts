import { z } from 'zod';
import {genders, hostels} from "@/app/(auth)/_schemas/constants";

export const VITEmailSchema =  z.string().email("Enter a valid email address").regex(
    /^[a-zA-Z]+\.[a-zA-Z]+20(?:19|2[0-5])@vitstudent\.ac\.in$/,
    "Invalid Email Address"
).trim();
// name.surname[2019-2025]@vitstudent.ac.in

export const EmailSchema = z.string().email(
    "Enter a valid email address"
).trim();

export const PasswordSchema = z.string().trim().min(
    8,
    "Password must have atleast 8 characters"
);

export const NameSchema = z.string().trim().min(
    1,
    "Required"
);

export const PhoneNoSchema = z.string().regex(
    /^[6-9]\d{9}$/,
    "Must be a valid phone number. Ex: 6123457890"
);
// Accepting Indian Phone no.

export const RegNoSchema = z.string().regex(
    /^(?:2[0-5]|19)[a-zA-Z]{3}\d{3}[1-9]$/,
    "Invalid Registration no."
);
// 19ABC0001 - 25ABC9999

export const HostelBlockSchema = z.enum(
    hostels as [string, ...string[]]
);

export const GenderSchema = z.enum(
    Object.values(genders) as [string, ...string[]]
);

export const RoomNumberSchema = z.string().regex(
    /^(?:[1-9][0-9]{2}|1[0-3][0-9]{2})$/,
    "Must be between 100-1399"
);

export const GithubProfileSchema = z.string().regex(
        /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/?$/,
        "Enter a valid Github Profile URL"
);
// https://github.com/githut-user

export const JoinTeamSchema = z.string().trim().min(1, "Required");

export const CreateTeamSchema = z.string().trim().min(1, "Required");