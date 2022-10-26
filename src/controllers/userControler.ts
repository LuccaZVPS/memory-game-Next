import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../libs/prisma";
import sendEmail from "../services/sendEmail";

import UserServices from "../services/UserServices";
import { Validate } from "../services/Validate";
export default class UserController {
  static async CreateAccount(req: NextApiRequest, res: NextApiResponse) {
    const { email, username, password } = req.body;

    if (
      email === undefined ||
      username === undefined ||
      password === undefined
    ) {
      return res.status(400).send("Missing fields");
    }

    var FieldsArray = [
      { txt: username, minMax: [3, 12] },
      { txt: password, minMax: [8, 30] },
    ];
    if (Validate.hasSpace(FieldsArray)) {
      return res.status(400).send("Fields cannot contain space ");
    }
    if (Validate.lentghIsWrong(FieldsArray)) {
      return res
        .status(400)
        .send(
          `username must contain 3/12 characters and password 8/30 characters`
        );
    }
    if (Validate.notEmail(email)) {
      return res.status(400).send(`Invalid Email`);
    }

    const userExist = await UserServices.userOrEmailAlredyUsed(email, username);
    console.log(userExist);
    if (userExist !== true) {
      return res
        .status(409)
        .json({ msg: "Fields already exist", field: userExist });
    }

    const user = await UserServices.CreateUser(email, username, password);

    if (!user) {
      return res.status(500).send("Internal error");
    }
    sendEmail(
      user.email,
      username,
      user.secretForConfirmEmail,
      user.id.toString(),
      "verify-email",
      "to confirm your account click in the link bellow",
      "Account verification"
    );

    return res.status(200).send("Account created");
  }

  static async showUsersTime(req: NextApiRequest, res: NextApiResponse) {
    try {
      const nameAndTime = await prisma.user.findMany({
        where: {
          NOT: {
            time: null,
          },
        },
        select: {
          name: true,
          time: true,
        },
        orderBy: {
          time: "asc",
        },
      });

      res.status(200).json(nameAndTime);
    } catch {
      res.status(500).send("Error to connect with database");
    }
  }
}
