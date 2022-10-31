export type response = UsersTime[];

export interface UsersTime {
  name: string;
  time: number;
}
export interface score extends UsersTime {
  position: number;
}
