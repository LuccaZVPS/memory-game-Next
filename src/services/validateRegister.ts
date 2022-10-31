import axios from "axios";
import { env } from "process";
import { Dispatch } from "react";
import ApiRequests from "./apiRequests";
import { Validate } from "./Validate";
export default async function validateRegister(
  email: string,
  username: string,
  password: string,
  password2: string,
  setLoading: Dispatch<boolean>
): Promise<boolean> {
  const fieldsArray = [
    {
      id: "emailR",
      txt: email,
      minMax: [6, 255],
    },
    {
      id: "usernameR",
      txt: username,
      minMax: [3, 12],
    },
    {
      id: "passwordR",
      txt: password,
      minMax: [8, 30],
    },
    {
      id: "password2R",
      txt: password2,
      minMax: [8, 30],
    },
  ];
  Validate.clearErrors(fieldsArray);
  if (
    Validate.hasSpace(fieldsArray) ||
    Validate.lentghIsWrong(fieldsArray) ||
    Validate.notEqual(password, password2, "password2R") ||
    Validate.notEmail(email, "emailR")
  ) {
    setLoading(false);
    return false;
  }

  try {
    const create: boolean | data = await ApiRequests.createUser(
      email,
      username,
      password
    );

    setLoading(false);

    return true;
  } catch (e: unknown) {
    const error = e as data;
    if (typeof e !== "boolean") {
      if (error.field.length === 2) {
        error.field.forEach((field) => {
          Validate.displayError(`${field} alredy taken`, `${field}R`);
          setLoading(false);
        });
      } else {
        Validate.displayError(`${error.field} alredy taken`, `${error.field}R`);
        setLoading(false);
      }
    }
    return false;
  }
}

export interface data {
  field: string[];
  msg: string;
}
