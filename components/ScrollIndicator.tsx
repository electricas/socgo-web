import React from "react";

import { Box, useColorModeValue } from "@chakra-ui/react";

export default function ScrollIndicator() {
  return (
    <Box
      pos="absolute"
      left="50%"
      w="40px"
      h="70px"
      ml="-20px"
      top="90vh"
      mt="-35px"
      boxShadow={"inset 0 0 0 2px " + useColorModeValue("#1A202C", "#fff")}
      borderRadius="25px"
      _before={{
        position: "absolute",
        left: "50%",
        content: '""',
        w: "8px",
        h: "8px",
        bg: useColorModeValue("#1A202C", "#fff"),
        ml: "-4px",
        top: "8px",
        borderRadius: "4px",
      }}
      className="scroll-indicator"
    />
  );
}
