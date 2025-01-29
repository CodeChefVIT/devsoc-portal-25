import { ConvertToAPIError } from "@/lib/error";
import api from ".";
import { getData } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { APIResponse, IIdea, ISubmission } from "@/interfaces";

export const createSubmission = async (
  route: string,
  submissionData: ISubmission
) => {
  try {
    const response = await api.post(`/${route}/create`, submissionData);

    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};
export const getSubmission = async <T extends ISubmission | IIdea>(
  route: "submission" | "idea"
): Promise<T> => {
  try {
    if(route == 'idea')
    {
      const response = await api.get<APIResponse<T>>(`/${route}/`);
      return getData<T>(response.data) as T;

    }
    const response = await api.get<APIResponse<T>>(`/${route}/get`);

    return getData<T>(response.data) as T;
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};
export const updateSubmission = async (
  route: string,
  submissionData: Omit<ISubmission, "team_id">
) => {
  try {
    const response = await api.put(`/${route}/update`, submissionData);
    return getData(response.data);
  } catch (error) {
    throw ConvertToAPIError(error);
  }
};
export const checkSubmissionExists = async (route: string) => {
  try {
    if(route == 'idea')
    {
      await api.get(`/${route}/`);
      return true;
    }
    await api.get(`/${route}/get`);
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err as AxiosError;
      if (error.status == 404) {
        return false;
      }
    }

    throw ConvertToAPIError(err);
  }
};
