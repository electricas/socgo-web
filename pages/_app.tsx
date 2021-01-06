import "../styles/globals.css";
import { AppProps } from "next/app";
import { AuthProvider } from "../auth";

import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Inter",
    heading: "Inter",
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
