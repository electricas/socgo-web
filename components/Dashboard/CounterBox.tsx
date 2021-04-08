import React from "react";

import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";

export default function CounterBox(props: any) {
  return (
    <Box
      maxW="md"
      // w="md"
      maxH="3xs"
      h="3xs"
      borderBottomWidth="40px"
      borderColor="brand.900"
      borderRadius="lg"
      bgColor={useColorModeValue("#f5f5f5", "#222020")}
      style={{
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
      overflow="hidden"
    >
      <Box w="full" h="full">
        <Flex pt="20px">
          <Box
            bg={useColorModeValue(
              "rgba(0, 0, 0, 0.05)",
              "rgba(255, 255, 255, 0.05)"
            )}
            py={1}
            px={5}
            borderTopRightRadius="md"
            borderBottomRightRadius="md"
          >
            {props.description}
          </Box>
          <Spacer />
          <Box py={1} px={5}>
            {props.icon}
          </Box>
        </Flex>
        <Center pb="105px" h="full">
          <Heading size="2xl" as="h1">
            {props.number}
          </Heading>
        </Center>
      </Box>
    </Box>
  );
}
