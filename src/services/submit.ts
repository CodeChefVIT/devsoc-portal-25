import { ConvertToAPIError } from "@/lib/error";
import api from ".";
import { getData } from "@/lib/utils";
interface SubmissionData {
  team_id: string;
  title: string;
  description: string;
  github_link: string;
  figma_link: string;
  other_link?: string;
}

export const createSubmission = async (
  route: string,
  submissionData: SubmissionData
) => {
  try {
    const response = await api.post(`${route}/create`, submissionData);

    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};
export const getSubmission = async (route: string) => {
  try {
    const response = await api.get(`${route}/get`);
    return response.data;
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};
export const updateSubmission = async (
  route: string,
  submissionData: Omit<SubmissionData, "team_id">
) => {
  try {
    const response = await api.post(`${route}/update`, submissionData);
    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};
export const checkSubmissionExists = async (route: string) => {
  try {
    const response = await api.post(`${route}/update`);
    if (response.status == 404) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};
