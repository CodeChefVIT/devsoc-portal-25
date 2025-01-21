import { me } from "./me";

export async function getTeam() {
  try {
    const response = await me();
    return response?.team?.code || null; 
  } catch (e) {
    throw e;
  }
}
