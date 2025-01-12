import { ConvertToAPIError } from "@/lib/error";
import api from ".";
interface SubmissionData {
  team_id: string;
  title: string;
  description: string;
  github_link: string;
  figma_link: string;
  other_link?:string;
}

export const createSubmission = async (
  route: string,
  submissionData: SubmissionData
) => {
  try {
    const response = await api.post(`${route}`,  submissionData);
    return response.data;
  } catch (error) {
    ConvertToAPIError(error);
  }
};
export const getSubmission = async (route: string, teamId: string) => {
  try {
    const response = await api.get(`${route}/${teamId}`);
    console.log("Submission retrieved successfully:", response.data);
    return response.data;
  } catch (error) {
    ConvertToAPIError(error);
  }
};
export const updateSubmission = async (
  route: string,
  teamId: string,
  submissionData: Omit<SubmissionData, "team_id">
) => {
  try {
    const response = await api.post(`${route}/${teamId}`, submissionData);
    console.log("Submission updated successfully:", response.data);
    return response.data;
  } catch (error) {
    ConvertToAPIError(error);
  }
};
