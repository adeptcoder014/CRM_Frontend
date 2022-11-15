import "../styles/globals.css";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { CssBaseline } from "@mui/material";

// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import { createEmotionCache } from "../utils/create-emotion-cache";
//=========================================
// const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();
//=========================================
function MyApp({ Component, pageProps }) {
  // const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      {/* <Head>
        <title>CRM</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} /> */}

      <QueryClientProvider client={queryClient}>
        {/* <CacheProvider> */}
          <Head>
            <title>CRM</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {/* <DashboardFilterProvider> */}
              <Component {...pageProps} />
              {/* </DashboardFilterProvider> */}
            </ThemeProvider>
          {/* </LocalizationProvider> */}
        {/* </CacheProvider> */}
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
