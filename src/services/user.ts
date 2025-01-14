// import { IUser } from "@/interfaces";
// import api from "."
import { APIResponse, IUser } from "@/interfaces";
import { ConvertToAPIError } from "@/lib/error";
import api, { getData } from ".";

//change to take both submission data and user data
export async function getUserDetails() {
  const response = await api.get<APIResponse<IUser>>(`/info/me`);
  return getData(response.data);
}

export async function updateUserDetails() {
  try {
    // const data = "success"
    const response = await api.post<APIResponse<IUser>>(`/info/me`);
    return getData(response.data);
  } catch (e) {
    throw ConvertToAPIError(e);
  }
}
