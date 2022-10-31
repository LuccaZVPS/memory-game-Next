import { NextApiRequest, NextApiResponse } from "next";
import VerificationController from "../../../controllers/verificationController";

export default async function verification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    VerificationController.email(req, res);
  } else {
    res.status(405).send("Only post requests allowed");
  }
}
