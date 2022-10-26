import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ProviderTheme } from "../contexts/theme";
import { ProviderSession } from "../contexts/session";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProviderTheme>
      <GlobalStyle />
      <ProviderSession>
        <Component {...pageProps} />
      </ProviderSession>
    </ProviderTheme>
  );
}

export default MyApp;
