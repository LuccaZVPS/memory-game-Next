import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Theme as defaultTheme } from "../styles/defaultTheme";
import { Dark } from "../styles/DarkTheme";
import { Dispatch, SetStateAction } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

export type context = {
  setThemeMode: Dispatch<SetStateAction<boolean>>;
  themeMode: boolean;
  Theme: DefaultTheme;
};
export const ThemeContext = createContext<context | null>(null);
interface AProps {
  children: ReactNode;
}

export function ProviderTheme({ children }: AProps) {
  var item: string | null = "";
  var booleanTheme = true;

  if (typeof window !== "undefined") {
    item = localStorage.getItem("theme");

    if (item === "false") {
      booleanTheme = false;
    }
  }
  const [Theme, setTheme] = useState<DefaultTheme>(defaultTheme);

  const [themeMode, setThemeMode] = useState(booleanTheme);
  const ChakaraTheme = extendTheme({ ...Theme });

  useEffect(() => {
    if (booleanTheme) {
      setTheme(defaultTheme);
    } else {
      setTheme(Dark);
    }
  }, [themeMode]);
  return (
    <ThemeContext.Provider value={{ setThemeMode, themeMode, Theme }}>
      <ChakraProvider theme={ChakaraTheme}>
        <ThemeProvider theme={Theme}>{children}</ThemeProvider>
      </ChakraProvider>
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
