import api from "@/services/index";
import {ConvertToAPIError} from "@/lib/error";

interface ILoginRequest {
    email: string,
    password: string
}

export const login = async (request: ILoginRequest)=>{
    try {
        const res = await api.post("/auth/login", request, {
            headers: {'Content-Type': 'application/json'}
        });
        return res.data;
    } catch(error){
        ConvertToAPIError(error);
    }
}

interface ISignupRequest {
    email: string,
    password: string
}

export const signup = async (request: ISignupRequest) => {
    try {
        const res = await api.post("/auth/signup", request, {
            headers: {'Content-Type': 'application/json'}
        });
        return res.data;
    } catch(error){
        ConvertToAPIError(error);
    }
}

interface IVerifyOTPRequest {
    email: string,
    otp: string
}

export const verifyOTP = async (request: IVerifyOTPRequest) => {
    try {
        const res = await api.post("/auth/verify-otp", request, {
            headers: {'Content-Type': 'application/json'}
        });
        return res.data;
    } catch(error){
        ConvertToAPIError(error);
    }
}