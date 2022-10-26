import { NextApiRequest, NextApiResponse } from "next";
import UserController from "../../../controllers/userControler";
export default async function Time(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    UserController.showUsersTime(req, res);
  } else {
    return res.status(405).send("Only GET method allowed");
  }
}
