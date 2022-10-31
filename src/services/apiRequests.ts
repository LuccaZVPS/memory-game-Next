import axios, { AxiosError } from "axios";
import { data } from "./validateRegister";
axios.defaults.withCredentials = true;
export default class ApiRequests {
  static async createUser(
    email: string,
    username: string,
    password: string
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/user`,
        { email, username, password }
      );

      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          return false;
        }

        return Promise.reject(err.response.data) as unknown as data;
      }
    }
  }

  static async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/session`,
        { email, password }
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          return false;
        }

        return Promise.reject(err.response.data);
      }
    }
  }

  static async emailVerify(token: string, id: string): Promise<any> {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/verify/email`,
        { id, token }
      );
      if (response.status === 200) {
        return true;
      }
      return Promise.reject(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return Promise.reject(false);
      }
    }
  }
  static async getSession(): Promise<any> {
    interface user {
      logged: boolean;
      time: number;
      id: number;
      name: string;
    }
    try {
      const response = await axios.get<user>(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/session`
      );
      if (response.status === 200) {
        return response.data as user;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return Promise.reject(err);
      }
    }
  }
}
