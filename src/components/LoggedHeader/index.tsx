import { useState } from "react";
import SwitchTheme from "../SwitchTheme";
import * as styled from "./styles";
import { IoMdSettings } from "react-icons/io";
import { useUserData } from "../../contexts/session";
import axios from "axios";
interface props {
  userName: String;
}

export function LoggedHeader({ userName }: props) {
  const { reloadSession, setReloadSession } = useUserData();
  const [openSettings, setOpenSettings] = useState(false);
  const logout = () => {
    axios.delete("http://localhost:3000/api/session").then(() => {
      setReloadSession(!reloadSession);
    });
  };
  return (
    <styled.Container>
      <SwitchTheme />

      <div className="user-info-container">
        <div className="name">{userName}</div>
        <div className="settings">
          <IoMdSettings
            onClick={() => {
              setOpenSettings(!openSettings);
            }}
          />
          {!!openSettings && (
            // @ts-ignore
            <styled.hiddenSettings onClick={logout}>
              Logout
              <styled.triangle></styled.triangle>
            </styled.hiddenSettings>
          )}
        </div>
      </div>
    </styled.Container>
  );
}
