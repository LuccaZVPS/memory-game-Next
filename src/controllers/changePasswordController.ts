import bcryptjs from "bcryptjs";
import { verify } from "crypto";
import prisma from "../libs/prisma";
import { NextApiResponse } from "next";
import generatePassword from "generate-password";
import { NextApiRequest } from "next";
import sendEmail from "../services/sendEmail";
export default class ChangePasswordController {
  static async verifyIfCanChange(req: NextApiRequest, res: NextApiResponse) {
    try {
      var { token, id } = req.query;
      if (token === undefined || id === undefined) {
        return res.status(400).send("Missing fields");
      }
      if (typeof token !== "string" || typeof id !== "string") {
        return res.status(400).send("All fields must be string type");
      }

      const permission = await prisma.passwordChange.findFirst({
        where: {
          secret: token,
          used: false,
        },
      });

      if (permission === null) {
        return res.status(401).send("you don't have permission");
      }
      return res.status(200).send("sucess");
    } catch (e) {
      return res.status(500).send("Internal error");
    }
  }

  static async allowUserToChange(req: NextApiRequest, res: NextApiResponse) {
    try {
      var { email } = req.body;
      if (email === undefined) {
        return res.status(400).send("Missing fields");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user === null) {
        return res.status(401).send("Unregistred email");
      }

      const secret = generatePassword.generate({
        length: 70,
        numbers: true,
        exclude: "/",
      });
      sendEmail(
        email,
        user.name,
        secret,
        user.id.toString(),
        "change-password",
        "Click on the link bellow to change your password",
        "Password change"
      );

      const allowUser = await prisma.passwordChange.create({
        data: {
          userId: user.id,
          used: false,
          secret,
        },
      });

      return res.status(200).send("User allowed to change password");
    } catch (e) {
      return res.status(500).send("error");
    }
  }

  static async changePassword(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { token, id } = req.query;
      const { password } = req.body;
      if (token == undefined || id == undefined || password == undefined) {
        return res.status(400).send("Missing fields");
      }
      if (
        typeof token !== "string" ||
        typeof password !== "string" ||
        typeof id !== "string"
      ) {
        return res.status(400).send("All fields must be string type");
      }
      if (password.length > 30 || password.length < 8) {
        return res.status(400).send("password must have 8/30 characters");
      }
      console.log(token, id, password);
      const permission = await prisma.user.findFirst({
        where: {
          id: id,
        },
        select: {
          PasswordChange: {
            where: {
              secret: token,
            },
          },
        },
      });
      if (permission === null) {
        return res.status(401).send("User not allowed to change password");
      }

      const hash = await bcryptjs.hash(password, 10);
      const newPassword = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: hash,
          PasswordChange: {
            update: {
              where: {
                id: permission.PasswordChange[0].id,
              },
              data: {
                used: true,
              },
            },
          },
        },
      });
      return res.status(200).send("Password changed");
    } catch (e) {
      console.log(e);
      return res.status(500).send("Internal error");
    }
  }
}
