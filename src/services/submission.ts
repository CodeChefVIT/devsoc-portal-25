// redundentKeptIncaseSubmissionRouteDiffersFromIdeaRoute
// import { throwAPIError } from "@/lib/error";
// import api from ".";
// interface SubmissionData {
//   github_link: string;
//   figma_link: string;
//   ppt_link: string;
//   other_link: string;
//   team_id: string;
// }

// export const createSubmission = async (submissionData: SubmissionData) => {
//   try {
//     const response = await api.post("/submission", submissionData);
//     return response.data;
//   } catch (error) {
//     throwAPIError(error);
//   }
// };
// export const getSubmission = async (teamId: string) => {
//   try {
//     const response = await api.get(`submission/${teamId}`);
//     console.log("Submission retrieved successfully:", response.data);
//     return response.data;
//   } catch (error) {
//     throwAPIError(error);
//   }
// };
// export const updateSubmission = async (
//   teamId: string,
//   submissionData: Omit<SubmissionData, "team_id">
// ) => {
//   try {
//     const response = await api.post(`submission/${teamId}`, submissionData);
//     console.log("Submission updated successfully:", response.data);
//     return response.data;
//   } catch (error) {
//     throwAPIError(error);
//   }
// };


