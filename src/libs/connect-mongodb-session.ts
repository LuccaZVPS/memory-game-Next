import * as session from "express-session";
export const MongoDBStore = require("connect-mongodb-session")(session);
