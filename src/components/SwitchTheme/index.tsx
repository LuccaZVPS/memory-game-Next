import { useTheme } from "../../contexts/theme";
import * as styled from "./styles";
import { BsFillSunFill } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";
export default function SwitchTheme() {
  const data = useTheme();

  const changeTheme = () => {
    if (data) {
      localStorage.setItem("theme", `${!data.themeMode}`);
      data.setThemeMode(!data.themeMode);
    }
  };
  return (
    <styled.container onClick={changeTheme}>
      <styled.ball display={data?.themeMode}>
        <styled.sun>
          <BsFillSunFill />
        </styled.sun>
        <styled.moon>
          <BsMoonFill />
        </styled.moon>
      </styled.ball>
    </styled.container>
  );
}
