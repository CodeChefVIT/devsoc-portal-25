import { ConvertToAPIError } from "@/lib/error";
import api from "@/services/index";
import { getData } from "@/lib/utils";

export async function getTeamLeader(teamId: string) {
  try {
    const response = await api.get(`/api/teams/${teamId}/leader`);
    return getData(response.data); 
  } catch (error) {
    throw ConvertToAPIError(error);
  }
}

export async function kickTeamMember(teamId: string, memberName: string) {
  try {
    const response = await api.post(`/api/teams/${teamId}/kick`, { memberName });
    return getData(response.data); 
  } catch (error) {
    throw ConvertToAPIError(error); 
  }
}
