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
    const response = await api.post(`${route}/create`,  submissionData);
    return response.data;
  } catch (error) {
    ConvertToAPIError(error);
  }
};
export const getSubmission = async (route: string) => {
  try {
    const response = await api.get(`${route}/get`);
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
    const response = await api.post(`${route}/update/${teamId}`, submissionData);
    console.log("Submission updated successfully:", response.data);
    return response.data;
  } catch (error) {
    ConvertToAPIError(error);
  }
};
export const checkSubmissionExists = async (
  route: string,
) => {
  try {
    const response = await api.post(`${route}/update`);
    if(response.status == 404)
    {
      return true
    }
    else
    {
      return false
    }
  } catch (error) {
    ConvertToAPIError(error);
    return false
  }
};
