import { NextApiRequest, NextApiResponse } from "next";
import ChangePasswordController from "../../../controllers/changePasswordController";
export default async function ChangePasswordRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    ChangePasswordController.allowUserToChange(req, res);
  } else {
    res.status(405).send("Only POST methods allowed");
  }
}
