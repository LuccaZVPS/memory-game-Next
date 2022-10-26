import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../libs/prisma";
export default class VerificationController {
  static async email(req: NextApiRequest, res: NextApiResponse) {
    const { token, id } = req.body;
    if (token === undefined || id === undefined) {
      return res.status(400).send("missing fields");
    }
    if (typeof token !== "string" || typeof id !== "string") {
      return res.status(400).send("wrong fields values");
    }
    try {
      const user = await prisma.isConfirmed.findFirst({
        where: {
          userId: id,
          secret: token,
        },
      });
      if (user === null) {
        return res.status(401).send("Wrong id or token");
      }

      if (user.confirmed === true) {
        return res.status(409).send("Email alredy verified");
      }
      await prisma.isConfirmed.update({
        where: {
          id: user.id,
        },
        data: {
          confirmed: true,
        },
      });
      return res.status(200).send("email verified");
    } catch (e) {
      console.log(e);
      res.status(500).send("internal error");
    }
  }
}
