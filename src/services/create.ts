import { ConvertToAPIError } from "@/lib/error";
import api from "@/services/index";
import { getData } from "@/lib/utils";
import { AxiosError } from "axios";

export async function createteam(teamId: string) {
  try {
    const response = await api.post(`/api/teams/${teamId}/create`);
    if (!response || typeof response !== 'object' || !response.hasOwnProperty('data')) {
      throw new Error('Invalid response format');
    }
    return getData(response.data); 
  } catch (error: unknown) { 
    if (error instanceof AxiosError) {
      console.error("API call error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw ConvertToAPIError(error);
  }
}
