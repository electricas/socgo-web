import React from "react";

import { Flex } from "@chakra-ui/react";

export default function FlexContainer({ children }: any) {
  return (
    <>
      <Flex as="main" justifyContent="center" flexDirection="column">
        {children}
      </Flex>
    </>
  );
}
