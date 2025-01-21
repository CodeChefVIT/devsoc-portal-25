import { ConvertToAPIError } from "@/lib/error";
import api from ".";
import { me } from "./me";
import { getData } from "@/lib/utils";

export async function getTeam() {
  try {
    const response = await me();
    return response?.team ; 
  } catch (e) {
    throw e;
  }
}


// Join Team
export const joinTeam = async (teamCode: string) => {
  try {
    const response = await api.post('/team/join', { code: teamCode });
    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};

// Create Team
export const createTeam = async (teamName: string) => {
  try {
    const response = await api.post('/team/create', { name: teamName });
    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};

// Leave Team
export const leaveTeam = async (userID: string) => {
  try {
    const response = await api.post('/team/leave', { userID });
    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};

// Kick Member
export const kickMember = async (userID: string) => {
  try {
    const response = await api.post('/team/kick', { userID });
    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};

// Delete Team
export const deleteTeam = async () => {
  try {
    const response = await api.post('/team/delete');
    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};

// Update Team Name
export const updateTeamName = async (name: string) => {
  try {
    const response = await api.put('/team/update', { name });
    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};

// Get All Team Users
export const getAllTeamUsers = async () => {
  try {
    const response = await api.get('/team/users');
    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};
