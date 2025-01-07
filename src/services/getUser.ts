import { IUser } from "@/interfaces";
import api from "."
import {  throwAPIError } from "@/lib/error";

export async function getUserDetails() {
    try {
      const { data } = await api.get<IUser>(`/login/user`);
      return data;
    } catch (e) {
      throw throwAPIError(e);
    }
  }