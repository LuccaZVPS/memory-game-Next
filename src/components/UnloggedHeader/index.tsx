import { useState } from "react";
import { LoginModal } from "../LoginModal";
import { RegisterModal } from "../RegisterModal";
import SwitchTheme from "../SwitchTheme";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import * as styled from "./styles";

export function UnloggedHeader() {
  const [openMenuBurger, setOpenMenuBurger] = useState(false);
  return (
    //@ts-ignore
    <styled.Container display={openMenuBurger}>
                                 {/* @ts-ignore */}
      <styled.SwitchContainer display={openMenuBurger}>
        <SwitchTheme />
      </styled.SwitchContainer>
                                 {/* @ts-ignore */}
      <styled.btnContainer className="btnContainer" display={openMenuBurger}>
        <LoginModal />
        <RegisterModal />
      </styled.btnContainer>
      <div className="menuBurger">
        {!openMenuBurger && (
          <GiHamburgerMenu
            onClick={() => {
              setOpenMenuBurger(true);
            }}
          />
        )}

        {!!openMenuBurger && (
          <AiOutlineClose
            onClick={() => {
              setOpenMenuBurger(false);
            }}
          />
        )}
      </div>
    </styled.Container>
  );
}
