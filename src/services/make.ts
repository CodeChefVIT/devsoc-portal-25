import api from "@/services/index";
import {ConvertToAPIError} from "@/lib/error";


export const team_member_name = async (request: ILoginRequest)=>{
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

