import { me } from "./me";

export async function getTeam() {
    try {
      const response = await me();
      return response?.team;
    }
    catch (e) {
      throw e
    }
  }
  