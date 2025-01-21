import { me } from "./me";

export async function getTeamLead() {
  try {
    const response = await me();
    return response?.user?.first_name || null; 
  } catch (e) {
    throw e;
  }
}
