import "../styles/globals.css";
import { AppProps } from "next/app";
import { AuthProvider } from "../auth";
import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

const theme = extendTheme({
  fonts: {
    body: "Inter",
    heading: "Inter",
  },
});

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
