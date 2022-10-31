import type { SessionStore } from "next-session";
import { MongoDBStore } from "./connect-mongodb-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";

import nextSession from "next-session";
export const getSession = nextSession({
  store: promisifyStore(
    new MongoDBStore({
      uri: "mongodb://localhost:27017/store",

      collection: "mySessions",
    })
  ),

  cookie: {
    secure: true,
  },
});
