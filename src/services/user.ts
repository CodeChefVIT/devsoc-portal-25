// import { IUser } from "@/interfaces";
// import api from "."
import { IUser } from "@/interfaces";
import { throwAPIError } from "@/lib/error";

export async function getUserDetails() {
  try {
    const data: IUser = {
      id: "23434",
      name: "XYZ 123",
      reg_no: "23BCE0000",
      team_id: "324",
      email: "dgsgd.bsgs2023@vitstudent.ac.in",
      is_vitian: false,
      password: "123456789",
      phone_no: "4444187333",
      gender: "male",
      role: "testrolee",
      is_leader: false,
      college: "VIT Vellore",
      is_verified: false,
    };
    // const { data } = await api.get<IUser>(`/me`);
    return data;
  } catch (e) {
    throw throwAPIError(e);
  }
}

export async function updateUserDetails() {
  try {
    const data = "success"
    // const { data } = await api.post<IUser>(`/me`);
    return data;
  } catch (e) {
    throw throwAPIError(e);
  }
}
