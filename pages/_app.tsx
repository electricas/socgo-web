import "../styles/globals.css";
import { AppProps } from "next/app";
import { AuthProvider } from "../util/auth/auth";
import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { AnimatePresence } from "framer-motion";
import { Router } from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import Header from "../components/Header";

const theme = extendTheme({
  fonts: {
    body: "Inter, 'Noto Sans KR', sans-serif",
    heading: "Poppins, Inter, 'Noto Sans KR', sans-serif",
  },
  styles: {
    global: (props: Record<string, any>) => ({
      body: {
        bg: mode("#fff", "#121212")(props),
      },
      button: {
        bg: "rgba(255, 255, 255, 0.025)",
      },
    }),
  },
  colors: {
    brand: {
      100: "#E0153B",
      200: "#E0153B",
      300: "#E0153B",
      400: "#E0153B",
      500: "#E0153B",
      600: "#E0153B",
      700: "rgba(224, 21, 59, 0.2)",
      800: "#E0153B",
      900: "#ed5959",
    },
    gray: {
      700: "#222020",
    },
    telegram: {
      100: "#242529",
      200: "#E6E6E6",
    },
  },
  shadows: {
    outline: "0 0 0 3px rgba(224, 21, 59, 0.6)",
  },
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </AnimatePresence>
  );
}

export default App;
