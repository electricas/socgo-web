import React from "react";

import { Flex } from "@chakra-ui/react";

export default function Container({ children }: any) {
  return (
    <>
      <Flex as="main" justifyContent="center" flexDirection="column">
        {children}
      </Flex>
    </>
  );
}
