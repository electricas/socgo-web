import "../styles/globals.css";
import { AppProps } from "next/app";
import { AuthProvider } from "../auth";
import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { AnimatePresence } from "framer-motion";
import { Router } from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.css";

const theme = extendTheme({
  fonts: {
    body: "Inter, 'Noto Sans KR', sans-serif",
    heading: "Inter, 'Noto Sans KR', sans-serif",
  },
  styles: {
    global: (props: Record<string, any>) => ({
      body: {
        bg: mode("#fff", "#16151A")(props),
      },
      button: {
        bg: "rgba(255, 255, 255, 0.025)",
      },
    }),
  },
  colors: {
    brand: {
      100: "#5B1CEE",
      200: "#5B1CEE",
      300: "#5B1CEE",
      400: "#5B1CEE",
      500: "#5B1CEE",
      600: "#5B1CEE",
      700: "#5B1CEE",
      800: "#5B1CEE",
      900: "#5B1CEE",
    },
    gray: {
      700: "#16151A",
    },
    telegram: {
      100: "#242529",
      200: "#E6E6E6",
    },
  },
  shadows: {
    outline: "0 0 0 3px rgba(91, 28, 238, 0.6)",
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
