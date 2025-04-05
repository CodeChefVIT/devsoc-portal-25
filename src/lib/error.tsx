import axios, { type AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toSentenceCase } from "./utils";

export function ConvertToAPIError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError;
    if (error.response) {
      const response = error.response;
      const data = response?.data;
      if (data) {
        const msg = (data as { message: string })?.message;
        if (msg) {
          return new ApiError(response.status, toSentenceCase(msg));
        }
      }
    } else if (err.request) {
      //Request was made but no response was receieved
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }

  return new ApiError(500, "Something went wrong");
}
