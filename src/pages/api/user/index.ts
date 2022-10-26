// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import UserController from "../../../controllers/userControler";
export default async function User(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    UserController.CreateAccount(req, res);
  } else {
    res.status(405).send("only post method allowed");
  }
}
