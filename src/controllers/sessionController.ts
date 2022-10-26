import bcryptjs from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "..//libs/next-session";
import prisma from "../libs/prisma";
export default class SessionController {
  static async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, password } = req.body;

      if (email === undefined || password === undefined) {
        return res.status(400).send("Missing fields");
      }
      if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).send("Fields must be string");
      }
      const user = await prisma.user.findFirst({
        include: {
          isConfirmed: {
            select: {
              confirmed: true,
            },
          },
        },

        where: {
          email: email,
        },
      });
      if (user === null) {
        return res.status(401).send("Wrong email or password");
      }
      const compare = await bcryptjs.compare(password, user.password);
      if (!compare) {
        return res.status(401).send("Wrong email or password");
      }
      if (!user.isConfirmed[0].confirmed) {
        return res.status(401).send("Account not verified");
      }

      const session = await getSession(req, res);
      session.user = {
        username: user.name,
        time: user.time,
        id: user.id,
      };

      await session.commit().then(() => {
        res.status(200).send("Logged");
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send("internal error");
    }
  }
  static async showSession(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    if (!session.user) {
      return res.status(200).json({ logged: false });
    }

    return res.status(200).json({ logged: true, ...session.user });
  }

  static async logOut(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    if (session.user === null) {
      return res.status(400).json("Must be logged to logout");
    }
    session
      .destroy()
      .then(() => {
        return res.status(200).send("sucess");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  static async updateUserTime(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { time } = req.body;
      console.log(time);
      if (time === undefined) {
        return res.status(400).send("Missing fields");
      }
      console.log("1");

      const session = await getSession(req, res);

      if (!session.user) {
        return res.status(401).send("must be logged");
      }
      console.log("2");

      const { id } = session.user;
      const updatedUser = await prisma.user.update({
        data: {
          time: time,
        },
        where: {
          id,
        },
      });
      console.log("3");

      if (!updatedUser) {
        return res.status(500).send("error");
      }

      session.user = {
        logged: true,
        time: updatedUser.time,
        id: updatedUser.id,
        username: updatedUser.name,
      };
      session.commit().then(() => {
        return res.status(200).send("time updated");
      });
    } catch (e) {
      res.status(500).send("error");
    }
  }
}
interface isConfirmed {
  id: number;
  secret: string;
  confirmed: boolean;
  userId: number;
}
