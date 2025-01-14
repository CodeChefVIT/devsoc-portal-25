// import { IUser } from "@/interfaces";
// import api from "."
import { IUser } from "@/interfaces";
import { ConvertToAPIError } from "@/lib/error";
import api from ".";

//change to take both submission data and user data
export async function getUserDetails() {

    const { data } = await api.get<IUser>(`/info/me`);
    return data;

}

export async function updateUserDetails() {
  try {
    const data = "success"
    // const { data } = await api.post<IUser>(`/me`);
    return data;
  } catch (e) {
    throw ConvertToAPIError(e);
  }
}
