import prisma from "../libs/prisma";
import bcryptjs from "bcryptjs";
import generator from "generate-password";
const saltRounds = 10;
bcryptjs.genSalt(saltRounds);
export default class UserServices {
  static async userOrEmailAlredyUsed(email: string, username: string) {
    try {
      const user = await prisma.user.findMany({
        where: {
          OR: [{ email: email }, { name: username }],
        },
      });
      if (user.length > 1) {
        let fields = ["email", "username"];
        return fields;
      } else if (user.length > 0) {
        if (user[0].email === email && user[0].name === username) {
          let fields = ["email", "username"];
          return fields;
        } else if (user[0].email === email) {
          let fields = ["email"];
          return fields;
        } else {
          let fields = ["username"];
          return fields;
        }
      }
      return true;
    } catch {
      return false;
    }
  }

  static async CreateUser(email: string, name: string, password: string) {
    try {
      const passwordHashed = await bcryptjs.hash(password, saltRounds);
      const secretForConfirmEmail = generator.generate({
        length: 70,
        exclude: "/ ",
        numbers: true,
      });

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: passwordHashed,
          isConfirmed: {
            create: {
              confirmed: false,
              secret: secretForConfirmEmail,
            },
          },
        },
      });
      return { ...user, secretForConfirmEmail };
    } catch {
      return false;
    }
  }
}
