import { NextApiRequest, NextApiResponse } from "next";
const storedTeamCode = {}; 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({ code: storedTeamCode });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
