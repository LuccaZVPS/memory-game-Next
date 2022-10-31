import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import ApiRequests from "../services/apiRequests";
import { logged, unlogged, context } from "./types";
const SessionContext = createContext<context>({} as context);

interface props {
  children: ReactElement;
}
export function ProviderSession({ children }: props) {
  const [userData, setUserData] = useState<unlogged | logged>({
    logged: false,
  });
  const [reloadSession, setReloadSession] = useState(true);
  useEffect(() => {
    ApiRequests.getSession().then((response: logged | unlogged) => {
      setUserData(response);
    });
  }, [reloadSession]);
  return (
    <SessionContext.Provider
      value={{ userData, setUserData, setReloadSession, reloadSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}
export const useUserData = () => useContext(SessionContext);
