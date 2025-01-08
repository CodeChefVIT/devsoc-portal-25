// import { IUser } from "@/interfaces";
// import api from "."
import { throwAPIError } from "@/lib/error";

export async function getUserDetails() {
  try {
    const data = {
      id: "23434",
      name: "XYZ 123",
      reg_no: "23BCE0000",
      team_id: "324",
      email: "dgsgd.bsgs2023@vitstudent.ac.in",
      is_vitian: false,
      password: "213",
      phone_no: "4444187333",
      role: "supreme lender",
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
