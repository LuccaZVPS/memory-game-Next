import { NextApiRequest, NextApiResponse } from "next";
import SessionController from "../../../controllers/sessionController";
export default async function Session(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    SessionController.login(req, res);
  } else if (req.method === "GET") {
    SessionController.showSession(req, res);
  } else if (req.method === "DELETE") {
    SessionController.logOut(req, res);
  } else if (req.method === "PUT") {
    SessionController.updateUserTime(req, res);
  } else {
    res.status(405).send("Only post and get method allowed");
  }
}
