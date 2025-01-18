import { getData } from "@/lib/utils";
import api from ".";
import { me } from "./me";
import { ConvertToAPIError } from "@/lib/error";
import { APIResponse, IUser } from "@/interfaces";


export async function getUser() {
    try {
      const response = await me();
      return response?.user;
    }
    catch (e) {
      throw e
    }
  }
  
  export async function updateUserDetails(newUser: IUser) {
    try {
      // const data = "success"
      const response = await api.post<APIResponse<IUser>>(`/info/me`, newUser);
      return getData(response.data);
    } catch (e) {
      throw ConvertToAPIError(e);
    }
  }