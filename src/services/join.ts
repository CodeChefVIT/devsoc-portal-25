import { ConvertToAPIError } from "@/lib/error";
import api from "@/services/index";
import { getData } from "@/lib/utils";


export async function jointeam(teamId: string) {
  try {
    const response = await api.post(`/api/teams/${teamId}/join`);
    if (!response || !response.data) {
      throw new Error('Invalid response format');
    }

    return getData(response.data); 
  } catch (error) {
    console.error("Error during jointeam API call:", error);
    throw ConvertToAPIError(error);
  }
}
