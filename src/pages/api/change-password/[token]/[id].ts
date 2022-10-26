import { NextApiRequest, NextApiResponse } from "next";
import ChangePasswordController from "../../../../controllers/changePasswordController";

export default async function VerifyUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    ChangePasswordController.verifyIfCanChange(req, res);
  } else if (req.method === "PUT") {
    ChangePasswordController.changePassword(req, res);
  } else {
    res.status(405).send("Only GET and PUT methods allowed");
  }
}
