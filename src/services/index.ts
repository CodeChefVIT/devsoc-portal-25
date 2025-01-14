import { APIResponse } from "@/interfaces";
import axios from "axios";
export function getData<T>(response: APIResponse<T>) {
  if (response.status == "pass") {
    if (!response.message) {
      return response.data;
    }
    return response.data;
  }
}
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENTVAR,
});

export default api;
