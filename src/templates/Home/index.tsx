import { useEffect, useState } from "react";
import { Background } from "../../components/Background";
import { UnloggedHeader } from "../../components/UnloggedHeader";
import { BsPlayFill } from "react-icons/bs";
import { MdLeaderboard } from "react-icons/md";

import * as styled from "./styles";
import { LoggedHeader } from "../../components/LoggedHeader";
import { useUserData } from "../../contexts/session";
import { SelectDificulty } from "../../components/SelectDificulty";
import { Rankings } from "../../components/Rankings";

export function HomePage() {
  const contextUser = useUserData();
  const [openDificulty, setOpenDificulty] = useState(false);
  const [openRankings, setOpenRankings] = useState(false);

  const [userInfo, setUserInfo] = useState(contextUser);

  useEffect(() => {
    setUserInfo(contextUser);
  }, [useUserData()]);
  return (
    <Background>
      <styled.Container>
        {userInfo.userData.logged ? (
          <LoggedHeader userName={userInfo.userData.username} />
        ) : (
          <UnloggedHeader />
        )}

        <div className="btnOptionsContainer">
          <div className="btnContainer">
            <button
              onClick={() => {
                setOpenDificulty(true);
              }}
            >
              <BsPlayFill />
            </button>
            <styled.description>
              Start
              <styled.triangle />
            </styled.description>
          </div>

          <div className="btnContainer">
            <button
              onClick={() => {
                setOpenRankings(true);
              }}
            >
              <MdLeaderboard />
            </button>
            <styled.description>
              Rankings
              <styled.triangle />
            </styled.description>
          </div>
        </div>
      </styled.Container>
      {openDificulty && <SelectDificulty display={setOpenDificulty} />}
      {openRankings && <Rankings display={setOpenRankings} />}
    </Background>
  );
}
