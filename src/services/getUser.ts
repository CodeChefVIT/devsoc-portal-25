// import { IUser } from "@/interfaces";
// import api from "."
import {  throwAPIError } from "@/lib/error";

export async function getUserDetails() {
    try {
      const data =  {
        id: "23434",
        name: "Abhinav",
        team_id: "324",
        email: "abhi@cc.com",
        is_vitian: false,
        reg_no: "213",
        password: "213",
        phone_no: "123",
        role: "supreme lender",
        is_leader: false,
        college: "afds",
        is_verified: false,
      }
      // const { data } = await api.get<IUser>(`/me`);
      return data;
    } catch (e) {
      throw throwAPIError(e);
    }
  }