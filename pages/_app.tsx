import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { PortfoliosProvider } from "@/contexts/portfoliosContext";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <PortfoliosProvider>
          <Component {...pageProps} />
        </PortfoliosProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
