import api from "@/services/index";
import {ConvertToAPIError} from "@/lib/error";
import {getData} from "@/lib/utils";
// import {IUser} from "@/interfaces";

interface ILoginRequest {
    email: string,
    password: string
}

export const login = async (request: ILoginRequest)=>{
    try {
        const res = await api.post("/auth/login", request);
        return getData(res.data);
    } catch(error){
        throw ConvertToAPIError(error);
    }
}

interface ISignupRequest {
    email: string,
    password: string
}

export const signup = async (request: ISignupRequest) => {
    try {
        const res = await api.post("/auth/signup", request);
        return getData(res.data);
    } catch(error){
        throw ConvertToAPIError(error);
    }
}

interface IVerifyOTPRequest {
    email: string,
    otp: string
}

export const verifyOTP = async (request: IVerifyOTPRequest) => {
    try {
        const res = await api.post("/auth/verify-otp", request);
        return getData(res.data);
    } catch(error){
        throw ConvertToAPIError(error);
    }
}

interface ICompleteProfileRequest {
    first_name: string;
    last_name: string;
    phone_no: string;
    reg_no: string;
    gender: "M" | "F" | "O";
    github_profile: string;
}

export const completeProfile = async (request: ICompleteProfileRequest)=>{
    try {
        const res = await api.post("/auth/complete-profile", request);
        return getData(res.data);
    } catch(error){
        throw ConvertToAPIError(error);
    }
}

interface ICreateTeamRequest {
    name: string
}

export const createTeam = async (request: ICreateTeamRequest)=>{
    try {
        const res = await api.post("/team/create", request);
        return getData(res.data);
    } catch(error){
        throw ConvertToAPIError(error);
    }
}

interface IJoinTeamRequest {
    code: string
}

export const joinTeam = async (request: IJoinTeamRequest)=>{
    try {
        const res = await api.post("/team/join", request);
        return getData(res.data);
    } catch(error){
        throw ConvertToAPIError(error);
    }
}