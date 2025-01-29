import api from "@/services/index";
import {ConvertToAPIError} from "@/lib/error";
import {getData} from "@/lib/utils";
import axios, { AxiosError } from "axios";
// import {IUser} from "@/interfaces";

interface ILoginRequest {
    email: string,
    password: string
}
interface LoginResponse {
  is_profile_complete: boolean | undefined;
  is_verified: boolean | undefined;
  is_starred: boolean | undefined;
}
export const login = async (request: ILoginRequest)=>{
    try {
        const res = await api.post("/auth/login", request);
        return getData(res.data) as  LoginResponse;
    } catch(err){
        if (axios.isAxiosError(err)) {
            const error = err as AxiosError;
            if (error.status == 417) {
              return err.response?.data;
            }
          }
        throw ConvertToAPIError(err);
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
    hostel_block: string;
    room_no: string;
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

export const pingStar = async () => {
    try {
        const res = await api.get("/auth/star");
        return getData(res.data);
    } catch (error) {
        throw ConvertToAPIError(error);
    }
}

export const logout = async () => {
    try {
        const res = await api.post("/auth/logout");
        return getData(res.data);
    } catch (error) {
        throw ConvertToAPIError(error);
    }
}