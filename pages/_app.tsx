import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { PortfoliosProvider } from "@/contexts/portfoliosContext";
import Layout from "@/components/layout/layout";

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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PortfoliosProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
