import { Dispatch } from "react";

export interface unlogged {
  logged: false;
}
export interface logged {
  logged: true;
  username: string;
  time: number | null;
  id: number;
}
export interface context {
  setUserData: Dispatch<logged | unlogged>;
  userData: logged | unlogged;
  setReloadSession: Dispatch<boolean>;
  reloadSession: boolean;
}
