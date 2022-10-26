import { Validate } from "./Validate";

export default function validateLogin(email: string, password: string) {
  var status = true;
  const fieldsArray = [
    {
      txt: email,
      minMax: [4, 255],
    },
    {
      txt: password,
      minMax: [8, 30],
    },
  ];
  if (Validate.notEmail(email)) {
    status = false;
  }
  if (Validate.lentghIsWrong(fieldsArray)) {
    status = false;
  }
  return status;
}
