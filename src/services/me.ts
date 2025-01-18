// import { IUser } from "@/interfaces";
// import api from "."
import { APIResponse, Me } from "@/interfaces";
import { ConvertToAPIError } from "@/lib/error";
import api from ".";
import { getData } from "@/lib/utils";

//change to take both submission data and user data
export async function me() {
  try {
    const response = await api.get<APIResponse<Me>>(`/info/me`);
    console.log(response.data)
    const data: Me | undefined = getData(response.data);
    return data;
  } catch (e) {
    throw ConvertToAPIError(e);
  }
}
